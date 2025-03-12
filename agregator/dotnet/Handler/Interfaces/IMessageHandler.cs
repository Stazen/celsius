using MQTTnet;

namespace CelsiusBackNet.Handler.Interfaces
{
    public interface IMessageHandler
    {
        Task HandleMessageAsync(string message);
    }
}
