using Microsoft.VisualStudio.TestTools.UnitTesting;
using System;
using System.Collections.Generic;
using TransactionParser;

namespace TransactionParserTests
{
    [TestClass]
    public class UnitTest1
    {
        [TestMethod]
        public void TestMethod1()
        {
            var x = Parser.GetEntries();
            var l=x as List<TransactionEntry>;
            Console.WriteLine("size:"+ l.Count);
            Assert.IsTrue(l.Count > 0);
        }
    }
}
