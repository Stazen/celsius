using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Driver;
using Newtonsoft.Json;

namespace dotnet.Models;

public record HeatSensorClass
{
    [BsonId]
    [BsonRepresentation(BsonType.ObjectId)]
    public string Id {get; set;}

    [BsonElement("sensorId")]
    [JsonProperty("sensorId")]
    public int SensorID {get; set;}

    [BsonElement("temperature")]
    [JsonProperty("Temp")]
    public float Temperature {get; set;}

    [BsonElement("date")]
    [JsonProperty("date")]
    public DateTime Date {get; set;}

}
