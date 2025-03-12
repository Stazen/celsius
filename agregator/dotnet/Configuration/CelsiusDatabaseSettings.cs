using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace dotnet.Configuration
{
    public class CelsiusDatabaseSettings
    {
        public string ConnectionString {set; get;} = null!;
        public string DatabaseName {set; get;} = null!;
        public string CollectionNameRawData { set; get; } = null!;
        public string CollectionNameHeatSensors { set; get;} = null!;

    }
}