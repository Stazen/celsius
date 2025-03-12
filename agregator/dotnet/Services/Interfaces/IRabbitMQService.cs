namespace CelsiusBackNet.Services.Interfaces
{
    public interface IRabbitMQService
    {
        Task ConnectAsync();
        Task SubscribeAsync();
    }
}
