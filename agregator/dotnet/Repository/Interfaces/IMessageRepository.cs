using dotnet.Models;
using MQTTnet;

namespace CelsiusBackNet.Repository.Interfaces
{
    public interface IMessageRepository
    {
        Task<List<RawData>> GetAsync();
        Task<RawData> GetAsync(int id);
        Task InsertDataAsync(RawData data);
        Task InsertDataAsync(HeatSensorClass data);
        Task<RawData> GetLatestValueByIdAsync(int id);
        Task<HeatSensorClass> GetLatestValueHeatSensorByIdAsync(int id);
        Task<List<RawData>> GetValueByIdAsync(int id, int limitSize = 1);
    }
}
