using System;
using charting101.Services;
using Microsoft.VisualStudio.TestTools.UnitTesting;

namespace charting101Tests
{
    [TestClass]
    public class OperationServiceTest
    {
        [TestMethod]
        public void PercentageChangeIncreaseTest()
        {
            var bTransactionEntry = new TransactionEntry()
            {
                Saldo = 50,
                Date = new DateTime(2018, 01, 01).ToString("o")
            };
            var eTransactionEntry = new TransactionEntry()
            {
                Saldo = 100,
                Date = new DateTime(2018, 01, 02).ToString("o")
            };

            var change=OperationsService.PercentageIncrease(bTransactionEntry, eTransactionEntry);
            Assert.IsTrue(Math.Abs(change.AbsoluteIncrease - 50) < 0);
            Assert.IsTrue(Math.Abs(change.PercentageIncrease - 100) < 0);
        }
        
        [TestMethod]
        public void CummulativeGrowthTest()
        {
            var bTransactionEntry = new TransactionEntry()
            {
                Saldo = 248,
                Date = new DateTime(2018, 06, 01).ToString("o")
            };
            var eTransactionEntry = new TransactionEntry()
            {
                Saldo = 100,
                Date = new DateTime(2018, 01, 01).ToString("o")
            };

            var change=OperationsService.CompoundGrowthRate(bTransactionEntry, eTransactionEntry);
            Assert.IsTrue(Math.Abs(change - 20) < 1);
        }
    }
}