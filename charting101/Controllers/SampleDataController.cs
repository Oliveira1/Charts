using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using charting101.Services;
using Microsoft.Extensions.Caching.Memory;

namespace charting101.Controllers
{
    [Route("api/[controller]")]
    public class SampleDataController : Controller
    {
        private static string[] Summaries = new[]
        {
            "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
        };
        private static TransactionEntryService TransactionEntryService;
        public SampleDataController(IMemoryCache cache)
        {
            TransactionEntryService= new TransactionEntryService(cache);

        }
        //need to add a Service locator
        

        [HttpGet("[action]")]
        public IEnumerable<WeatherForecast> WeatherForecasts(int startDateIndex)
        {
            var rng = new Random();
            return Enumerable.Range(1, 5).Select(index => new WeatherForecast
            {
                DateFormatted = DateTime.Now.AddDays(index + startDateIndex).ToString("d"),
                TemperatureC = rng.Next(-20, 55),
                Summary = Summaries[rng.Next(Summaries.Length)]
            });
        }

        public class WeatherForecast
        {
            public string DateFormatted { get; set; }
            public int TemperatureC { get; set; }
            public string Summary { get; set; }

            public int TemperatureF
            {
                get
                {
                    return 32 + (int)(TemperatureC / 0.5556);
                }
            }
        }



        [HttpGet("[action]")]
        public IEnumerable<TransactionEntry> TransactionEntries(DateTime startDateIndex) => TransactionEntryService.GetEntriesByDate(startDateIndex);

        [HttpGet("[action]")]
        public IEnumerable<TransactionEntry> GetTransactionsMonth(DateTime startDateIndex) => TransactionEntryService.GetEntriesByDate(startDateIndex);

        [HttpGet("[action]")]
        public IEnumerable<DateTime> GetKeys() => TransactionEntryService.GetKeys();

    }
}
