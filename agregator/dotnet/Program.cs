using CelsiusBackNet.Handler;
using CelsiusBackNet.Handler.Interfaces;
using CelsiusBackNet.Repository;
using CelsiusBackNet.Repository.Interfaces;
using CelsiusBackNet.Services;
using CelsiusBackNet.Services.Interfaces;
using dotnet.Configuration;
using dotnet.Models;
using dotnet.Utils;
using Microsoft.Extensions.Options;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
//builder.Services.Configure<CelsiusDatabaseSettings>(builder.Configuration.GetSection("CelsiusDatabaseSettings"));
//builder.Services.AddSingleton<RawDataServices>();

builder.Services.AddSingleton<IConfiguration>(builder.Configuration);
builder.Services.AddSingleton<IRabbitMQService, RabbitMQService>();
builder.Services.AddSingleton<IMessageHandler, MessageHandler>();
builder.Services.AddSingleton<IMessageRepository, MessageRepository>();


builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();

/*DataCollectorUtils dataCollector = new DataCollectorUtils();
dataCollector.DoWork();*/


var app = builder.Build();

var serviceProvider = app.Services;
var mqttService = serviceProvider.GetRequiredService<IRabbitMQService>();

await mqttService.ConnectAsync();
await mqttService.SubscribeAsync();

app.UseHttpsRedirection();

app.UseAuthorization();


app.MapControllers();

app.Run();

