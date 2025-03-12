namespace CelsiusBackNet.Configuration
{
    public class RabbitMQSettings
    {
        public string BrokerAddress { get; set; }
        public int BrokerPort { get; set; }
        public string Username { get; set; }
        public string Password { get; set; }
        public string Topic { get; set; }
    }
}
