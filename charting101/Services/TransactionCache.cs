using Microsoft.Extensions.Caching.Memory;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace charting101.Services
{
    public class TransactionCache
    {
        private readonly IMemoryCache _cache;
        private IMemoryCache cache;

        public TransactionCache(IMemoryCache cache)
        {
            this.cache = cache;
        }

    }
}
