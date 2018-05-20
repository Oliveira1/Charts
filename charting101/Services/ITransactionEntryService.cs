using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace charting101.Services
{
    interface ITransactionEntryService
    {
        IEnumerable<TransactionEntry> GetEntriesByDate(DateTime month);
    }


}
