using Microsoft.Extensions.Caching.Memory;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TransactionParser;

namespace charting101.Services
{
    public class TransactionEntryService : ITransactionEntryService
    {
        private readonly IEnumerable<TransactionParser.TransactionEntry> entries;
        private TransactionCache transactionCache;
        private IMemoryCache cache;
        public TransactionEntryService(IMemoryCache cache)
        {
            this.cache = cache;
            //transactionCache = new TransactionCache(cache);
            entries = Parser.GetEntries();
        }

        /// <summary>
        /// Orders a Transaction Entry by Date and converts it to a Simple Transaction Entry model already having a string
        /// </summary>
        /// <returns></returns>
        public IEnumerable<TransactionEntry> GetEntriesByDate()
        {
            //var transactions = entries?.OrderBy(e => { return e.Date; }).ToLookup( => t.Date.Year).ToLookup(t => t.ToLookup(e => e.Date.Month));
            var tran = entries?.OrderBy(e => { return e.Date; }).ToLookup(t => new DateTime(t.Date.Year, t.Date.Month, 1));

            foreach (var k in tran)
            {
                cache.GetOrCreate(k.Key, cacheEntry =>
                {
                    return k.ToList().ConvertAll(
                    (e) =>
                        {
                            return new TransactionEntry
                            {
                                Amount = e.Amount,
                                ID = e.ID,
                                Date = e.Date.ToShortDateString(),
                                OpDate = e.OpDate.ToShortDateString(),
                                Description = e.Description,
                                Currency = e.Currency,
                                Saldo = e.Saldo,
                                Cur = e.Cur
                        
                            };
                     }) ?? new List<TransactionEntry>();
                });
            }
            return entries?.OrderBy(e => { return e.Date; }).ToList()
                     .ConvertAll(
                     (e) =>
                     {
                         return new TransactionEntry
                         {
                             Amount = e.Amount,
                             ID = e.ID,
                             Date = e.Date.ToShortDateString(),
                             OpDate = e.OpDate.ToShortDateString(),
                             Description = e.Description,
                             Currency = e.Currency,
                             Saldo = e.Saldo,
                             Cur = e.Cur

                         };
                     }) ?? new List<TransactionEntry>();

        }
    }
}
