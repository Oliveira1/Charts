using System;

namespace charting101.Services
{
    public class OperationsService
    {

        public static PercentageChange PercentageIncrease(TransactionEntry begin, TransactionEntry end)
        {
            var beginDate = Convert.ToDateTime(begin.Date);
            var endDate = Convert.ToDateTime(end.Date);
            if (beginDate > endDate)
            {
                var t = begin;
                begin = end;
                end = t;
                endDate = Convert.ToDateTime(end.Date);
                beginDate = Convert.ToDateTime(begin.Date);
            }
            var increase=end.Saldo - begin.Saldo;
            var percentage = increase / begin.Saldo* 100;
            return new PercentageChange()
            {
                AbsoluteIncrease = increase,
                PercentageIncrease = percentage,
                Period = endDate - beginDate
            };

        }

        public static double CompoundGrowthRate(TransactionEntry begin, TransactionEntry end,char periodType = 'm')
        {
            var beginDate = Convert.ToDateTime(begin.Date);
            var endDate = Convert.ToDateTime(end.Date);
            if (beginDate > endDate)
            {
                var t = begin;
                begin = end;
                end = t;
                endDate = Convert.ToDateTime(end.Date);
                beginDate = Convert.ToDateTime(begin.Date);
            }

            var period = endDate.Month - beginDate.Month;
            if (period == 0) period = 1;
            if(periodType.Equals('w')) period *= 4; //TODO add enum with numbers and add this directly to formula.
            if (periodType.Equals('y')) period /= 12;
            return (Math.Pow((end.Saldo / begin.Saldo),(double) 1 / period) - 1)*100;
        }
    }

    public class PercentageChange
    {
        public double AbsoluteIncrease { get; set; }
        public double PercentageIncrease { get; set; }
        public TimeSpan Period { get; set; }
    }
}