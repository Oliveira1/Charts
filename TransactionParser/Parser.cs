using CsvHelper;
using CsvHelper.Configuration;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.IO;
using System.Text;

namespace TransactionParser
{
    public static class Parser
    {

        public static IEnumerable<TransactionEntry> GetEntries()
        {

            string filename = @"C:\Users\Me\Downloads\mycsv.csv";

            StringBuilder builder = new StringBuilder();

            using (StreamReader reader = File.OpenText(filename))
            {
                var entries = new List<TransactionEntry>();
                var parser = new CsvReader(reader);
                parser.Configuration.RegisterClassMap<EntriesMap>();
                parser.Configuration.Delimiter = ";";
                parser.Configuration.Encoding = Encoding.UTF8;
                int id = 0;
                while (parser.Read())
                {
                    var entry = parser.GetRecord<TransactionEntry>();
                    entry.ID = id;
                    entries.Add(entry);
                    id++;
                }
                return entries;
            }

        }


    }



    public sealed class EntriesMap : CsvClassMap<TransactionEntry>
    {
        public EntriesMap()
        {
            Map(m => m.Date).Index(0).TypeConverterOption(DateTimeStyles.AdjustToUniversal);
            Map(m => m.OpDate).Index(1);
            Map(m => m.Description).Index(2);
            Map(m => m.Amount).ConvertUsing(RemovePeriod(3));
            Map(m => m.Currency).Index(4);
            Map(m => m.Saldo).ConvertUsing(RemovePeriod(5));
            Map(m => m.Cur).Index(6);
        }

        static Func<ICsvReaderRow, double> RemovePeriod(int index)
        {
            return row =>
            {
                var amount = row.GetField(index);
                if (amount.Contains(".") && amount.Contains(","))
                {
                    amount = amount.Replace(".", "");
                }
                return Convert.ToDouble(amount);
            };
        }
    }

    public class TransactionEntry
    {
        public int ID { get; set; }
        public DateTime Date { get; set; }
        public DateTime OpDate { get; set; }
        public string Description { get; set; }
        public double Amount { get; set; }
        public string Currency { get; set; }
        public double Saldo { get; set; }
        public string Cur { get; set; }

    }
}
