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

            //string filename = @"C:\Users\Me\Downloads\mycsv.csv";
            //string[] filenames = new []{ @"C:\Users\Me\Downloads\ExtractosDO_218100009859_20170101_20180401.CSV" };
             string[] filenames = new[] { @"C:\Users\Me\Downloads\ExtractosDO_218100009859_20181001_20181031.CSV" };
            //  string filename = @"C:\Users\bruno.paixao\Downloads\ExtractosDO_218100009859_20170101_20180401.CSV";
            // var filename = @"C:\Users\bruno.paixao\Downloads\mycsv.csv";
            //string[] filenames = Directory.GetFiles(@"C:\Users\Me\Downloads\", @"ExtractosDO_*.CSV");
            StringBuilder builder = new StringBuilder();
            List<TransactionEntry> entries = new List<TransactionEntry>();

            foreach (string filename in filenames)
            {
                Console.WriteLine(filename);
                using (StreamReader reader = File.OpenText(filename))
                {

                    CsvReader parser = new CsvReader(reader);
                    parser.Configuration.RegisterClassMap<EntriesMap>();
                    parser.Configuration.Delimiter = ";";
                    parser.Configuration.Encoding = Encoding.UTF8;
                    int id = 0;
                    while (parser.Read())
                    {
                        TransactionEntry entry = parser.GetRecord<TransactionEntry>();
                        entry.ID = id;
                        entries.Add(entry);
                        id++;
                        Console.WriteLine(entry.Date);
                    }
                    
                    TransactionEntry tEntry = new TransactionEntry()
                    {
                        Amount = 0,
                        Cur = "e",
                        Currency = "e",
                        Date = DateTime.MinValue,
                        Description = "e",
                        ID = -1,
                        OpDate = DateTime.MinValue,
                        Saldo = 0
                    };
                    entries.Add(tEntry);
                }
            }
            return entries;
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
                string amount = row.GetField(index);
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
