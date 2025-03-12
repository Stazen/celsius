using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Threading.Tasks;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Driver;
using Newtonsoft.Json;

namespace dotnet.Models;

public record RawData
{
    [BsonId]
    [BsonRepresentation(BsonType.ObjectId)]
    public string Id { get; set; }

    [BsonElement("sensorId")]
    [JsonProperty("sensorId")]
    public int SensorID { get; set; }

    [BsonElement("co2")]
    [JsonProperty("CO2")]
    public int CO2 { get; set; }

    [BsonElement("temperature")]
    [JsonProperty("Temp")]
    public float Temperature { get; set; }

    
    [JsonProperty("date")]
    [BsonIgnore]
    public long UnixDate { get; set; }

    [BsonElement("date")]
    public DateTime Date { get { return DateTimeOffset.FromUnixTimeSeconds(UnixDate).UtcDateTime; } set { UnixDate = ((DateTimeOffset)value).ToUnixTimeSeconds(); } }

    [BsonElement("presence")]
    public bool Presence { get; set; }

    [BsonElement("heating")]
    public bool Heating { get; set; }

    [BsonElement("incident")]
    public bool Incident { get; set; }

    [BsonElement("humidity")]
    [JsonProperty("humidity")]
    public float Humidity { get; set; }

}
