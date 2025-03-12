using dotnet.Controllers;
using dotnet.Models;
using Microsoft.AspNetCore.Connections;
using RabbitMQ.Client;
using RabbitMQ.Client.Events;

namespace dotnet.Utils
{
    public class DataCollectorUtils
    {
        // // private Timer _timer;
        // private readonly string _rabbitMQConnectionString = "rabbitmq:1883";

        // public DataCollectorUtils()
        // {
        //     _timer = new Timer(DoWork);
        // }

        public void DoWork()
        {
            // Se connecter à RabbitMQ
            var factory = new ConnectionFactory() { HostName = "celsius.ovh" };
            using var connection = factory.CreateConnection();
            using var channel = connection.CreateModel();

            // Déclarer la file ou consoommer les données
            string queueName = "sensordata";
            channel.QueueDeclare(queue: queueName, durable: false, exclusive: false, autoDelete: false, arguments: null);

            // on suce la donnée
            var consumer = new EventingBasicConsumer(channel);
            consumer.Received += (model, ea) =>
            {
                var body = ea.Body.ToArray();
                Console.Out.Write(body);

                // DataController.SaveSensorData(newData);
                // Traiter les données maybe call script python ???? ou créer un autre utils comme ProcessUtils.cs ???

                // Ensuite insérer donnée en base une fois traité
            };

            channel.BasicConsume(queue: queueName, autoAck: true, consumer: consumer);
            
        }
    }
}
