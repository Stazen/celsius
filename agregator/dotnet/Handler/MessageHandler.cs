using CelsiusBackNet.Handler.Interfaces;
using CelsiusBackNet.Repository.Interfaces;
using dotnet.Controllers;
using dotnet.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc.ViewFeatures;
using MongoDB.Driver;
using MQTTnet;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System.Globalization;

namespace CelsiusBackNet.Handler
{
    public class MessageHandler : IMessageHandler
    {
        private readonly IMessageRepository _messageRepository;

        public MessageHandler(IMessageRepository repository)
        {
            _messageRepository = repository;
        }

        public async Task HandleMessageAsync(string message)
        {
            try
            {
                RawData rawData = JsonConvert.DeserializeObject<RawData>(message);

                // Si nombre impaire on insert normal si ça fait plus de 3 minutes depuis dernier enregistrement

                if (rawData != null)
                {
                    if (IsEven(rawData.SensorID))
                    {
                        // Envoyer dans new table si paire
                        HeatSensorClass heatSens = new HeatSensorClass()
                        {

                            SensorID = rawData.SensorID,
                            Date = rawData.Date,
                            Temperature = rawData.Temperature,
                        };
                        Console.WriteLine(heatSens);
                        await _messageRepository.InsertDataAsync(heatSens);
                        return;
                    }
                }
                Console.WriteLine(rawData);

                rawData.Presence = await this.PresenceCheck(rawData);
                rawData.Heating = await this.HeatingCheck(rawData);

                if ((rawData.Heating == true) && (rawData.Presence == false))
                {

                    rawData.Incident = true;
                    SendNotification(rawData);
                }

                await _messageRepository.InsertDataAsync(rawData);
            }
            catch (Exception ex)
            {
                string ss = ex.Message;
            }
        }

        private async void SendNotification(RawData rawdata)
        {
            // Récupérer 2 derniers points et si incident aussi appeler route IHM Back
            List<RawData> rawDataDB = await _messageRepository.GetValueByIdAsync(rawdata.SensorID, 2);

            if (rawDataDB != null && rawDataDB.Count > 0)
            {
                if (rawDataDB.Count == 2)
                {
                    TimeSpan diff = rawdata.Date.Subtract(rawDataDB[1].Date);

                    if (diff.TotalMinutes < 45)
                    {

                        if (rawDataDB.Where(x => x.Incident).Count() == 2)
                        {
                            // Call route :
                            using (HttpClient client = new HttpClient())
                            {
                                try
                                {
                                    HttpResponseMessage response = await client.PostAsync(
                                        "http://celsius.ovh:8000/v1/email",
                                        new StringContent(JsonConvert.SerializeObject(rawdata),
                                        System.Text.Encoding.UTF8, "application/json")
                                        );

                                    if (response.IsSuccessStatusCode)
                                    {
                                        Console.WriteLine("Send Notification OK");
                                    }
                                    else
                                    {
                                        Console.WriteLine($"Send Notification Err : {response.StatusCode}");
                                    }
                                }
                                catch (Exception ex)
                                {
                                    Console.WriteLine("Error Send Notification : " + ex.Message);
                                }
                            }
                        }
                    }
                }
            }
        }

        /// <summary>
        /// Retourne le nombre de personne présente
        /// </summary>
        /// <returns></returns>
        private async Task<bool> PresenceCheck(RawData rawData)
        {
            RawData oldData = await _messageRepository.GetLatestValueByIdAsync(rawData.SensorID);

            if (oldData != null)
            {
                TimeSpan diff = rawData.Date.Subtract(oldData.Date);

                // 2000 is the maximum our sensor can detect
                if (rawData.CO2 >= 1000) {
                    return true;
                }

                if (diff.TotalMinutes < 15)
                {
                    if (oldData == null)
                    {
                        return false;
                    }
                    // Check if the level of CO2 is significantly raising
                    // Calculate % of var, if over 2% then true, else false.
                    float variationFlat = rawData.CO2 - oldData.CO2;
                    decimal variationRelative = Decimal.Divide((decimal)variationFlat, (decimal)rawData.CO2);

                    return (variationRelative >= 0.02m) ? true : false;
                }
            }

            return false;
        }

        private async Task<bool> HeatingCheck(RawData data)
        {
            // On récupère le dernier heatSensor lié au rawdata
            HeatSensorClass heatSensor = await _messageRepository.GetLatestValueHeatSensorByIdAsync(data.SensorID + 1);

            if (heatSensor != null)
            {
                // Vérifier moins 3 minutes            
                TimeSpan diff = data.Date.Subtract(heatSensor.Date);

                if (diff.TotalMinutes < 15)
                {
                    if ((heatSensor.Temperature - data.Temperature) > 3)
                    {
                        return true;
                    }


                    // Si notre température < inférieur au capteur GET DB de plus de 3 degrés alors true sinon false;
                    return false;
                }
            }

            return false;
        }

        /// <summary>
        /// Check si ID Paire
        /// </summary>
        private bool IsEven(int id)
        {
            return id % 2 == 0;
        }
    }
}
