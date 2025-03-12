using CelsiusBackNet.Configuration;
using CelsiusBackNet.Repository.Interfaces;
using dotnet.Configuration;
using dotnet.Models;
using Microsoft.Extensions.Configuration;
using MongoDB.Driver;
using MQTTnet;

namespace CelsiusBackNet.Repository
{
    public class MessageRepository : IMessageRepository
    {
        private readonly CelsiusDatabaseSettings _celsiusDBSettings;
        private readonly IMongoCollection<RawData> _rawDataCollection;
        private readonly IMongoCollection<HeatSensorClass> _heatSensorCollection;
        private readonly IConfiguration _configuration;


        public MessageRepository(IConfiguration configuration)
        {
            _celsiusDBSettings = configuration.GetSection("CelsiusDatabaseSettings").Get<CelsiusDatabaseSettings>();

            MongoClient mongoClient = new MongoClient(_celsiusDBSettings.ConnectionString);
            IMongoDatabase mongoDB = mongoClient.GetDatabase(_celsiusDBSettings.DatabaseName);
            _rawDataCollection = mongoDB.GetCollection<RawData>(_celsiusDBSettings.CollectionNameRawData);
            _heatSensorCollection = mongoDB.GetCollection<HeatSensorClass>(_celsiusDBSettings.CollectionNameHeatSensors);
        }

        public async Task<List<RawData>> GetAsync()
        {
            return await _rawDataCollection.Find(x => true).ToListAsync();
        }

        public async Task<RawData> GetAsync(int id)
        {           
            return await _rawDataCollection.Find(x => x.SensorID == id).FirstOrDefaultAsync();
        }

        public async Task<RawData> GetLatestValueByIdAsync(int id)
        {
            Console.WriteLine(id);
            var filter = Builders<RawData>.Filter.Eq(x => x.SensorID, id);
            var sort = Builders<RawData>.Sort.Descending(x => x.Date);
            return await _rawDataCollection.Find(filter)
                                                  .Sort(sort)
                                                  .Limit(1)
                                                  .FirstOrDefaultAsync();
        }

        public async Task<List<RawData>> GetValueByIdAsync(int id, int limitSize = 1)
        {
            Console.WriteLine(id);
            var filter = Builders<RawData>.Filter.Eq(x => x.SensorID, id);
            var sort = Builders<RawData>.Sort.Descending(x => x.Date);
            return await _rawDataCollection.Find(filter)
                                                  .Sort(sort)
                                                  .Limit(limitSize)
                                                  .ToListAsync();
        }

        public async Task<HeatSensorClass> GetLatestValueHeatSensorByIdAsync(int id)
        {
            Console.WriteLine(id);
            var filter = Builders<HeatSensorClass>.Filter.Eq(x => x.SensorID, id);
            var sort = Builders<HeatSensorClass>.Sort.Descending(x => x.Date);
            return await _heatSensorCollection.Find(filter)
                                                  .Sort(sort)
                                                  .Limit(1)
                                                  .FirstOrDefaultAsync();
        }

        public async Task InsertDataAsync(RawData data)
        {
            try
            {
                await _rawDataCollection.InsertOneAsync(data);                

            } catch (Exception e)
            {
                string ex = e.Message;
            }
        }

        public async Task InsertDataAsync(HeatSensorClass data)
        {
            try
            {
                await _heatSensorCollection.InsertOneAsync(data);
            }
            catch (Exception e)
            {
                string ex = e.Message;
            }
        }
    }
}
