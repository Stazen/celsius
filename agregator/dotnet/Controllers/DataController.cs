using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using dotnet.Models;
using Microsoft.AspNetCore.Mvc;

namespace dotnet.Controllers
{
    [ApiController]
    [Route("api/data")]
    public class DataController : ControllerBase
    {

        [HttpGet("{id}")]
        public async Task<IActionResult> Get(string id) 
        {
            RawData newData = new RawData{SensorID = 1, CO2 = 1, Temperature = 1};
            return Ok(newData);
        } 

        [HttpPost]
        public async Task<IActionResult> Post(RawData data) 
        {
            RawData newData = new RawData{SensorID = 1, CO2 = 1, Temperature = 1};
            return Ok(newData);
        } 
    }
}