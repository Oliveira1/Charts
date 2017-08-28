using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace charting101.Services
{
    public class TransactionEntry
    {
        public int ID { get; set; }
        public string Date { get; set; }
        public string OpDate { get; set; }
        public string Description { get; set; }
        public double Amount { get; set; }
        public string Currency { get; set; }
        public double Saldo { get; set; }
        public string Cur { get; set; }

    }
}
