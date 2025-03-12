using CelsiusBackNet.Configuration;
using CelsiusBackNet.Handler.Interfaces;
using CelsiusBackNet.Services.Interfaces;
using MQTTnet;
using MQTTnet.Client;
using System.Text;

namespace CelsiusBackNet.Services
{
    public class RabbitMQService : IRabbitMQService
    {
        private readonly IMqttClient _mqttClient;
        private readonly IMessageHandler _messageHandler;
        private readonly RabbitMQSettings _rabbitMQSettings;
        private readonly MqttClientOptions _mqttClientOptions;

        public RabbitMQService(IMessageHandler messageHandler, IConfiguration configuration)
        {
            _messageHandler = messageHandler;
            _mqttClient = new MqttFactory().CreateMqttClient();
            _rabbitMQSettings = configuration.GetSection("CelsiusDatabaseSettings:RabbitMQSettings").Get<RabbitMQSettings>();

            _mqttClientOptions = new MqttClientOptionsBuilder()
                .WithTcpServer(_rabbitMQSettings.BrokerAddress, _rabbitMQSettings.BrokerPort)
                .WithClientId($"Client-{Guid.NewGuid()}")
                .WithCredentials(_rabbitMQSettings.Username, _rabbitMQSettings.Password)
                .Build();
        }

        public async Task ConnectAsync()
        {
            
            await _mqttClient.ConnectAsync(_mqttClientOptions);
            
            
        }

        public async Task SubscribeAsync()
        {
            try
            {
                await _mqttClient.SubscribeAsync(new MqttTopicFilterBuilder().WithTopic(_rabbitMQSettings.Topic).Build());
                _mqttClient.ApplicationMessageReceivedAsync += async e =>
                {
                    await _messageHandler.HandleMessageAsync(Encoding.UTF8.GetString(e.ApplicationMessage.Payload));
                };
            } catch (Exception ex)
            {
                throw new ArgumentException("Error : " + ex.Message);
            }
        }
    }
}
