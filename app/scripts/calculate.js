(function() {
  'use strict';
  $(function() {
    Chart.defaults.global.tooltipTemplate = "<%= addCommas(value) %>";
    Chart.defaults.global.scaleLabel = "<%= addCommas(value) %>";
    return $.ajax('/data/currency.json').done(function(data) {
      var avgPension, avgSalary, childAllowance, ctx, date, dates, i, latest, minPension, minSalary, month, myNewChart, peskovMonthSalary, sliced, value, watchPrice, watchPriceBlock, watchPrices;
      latest = Math.ceil(data.latest);
      month = data.month;
      if ($(window).width() < 800) {
        sliced = {};
        i = 0;
        for (date in month) {
          value = month[date];
          sliced[date] = value;
          i++;
          if (i === 10) {
            break;
          }
        }
        month = sliced;
        $('.days-count').text(10);
      }
      watchPrice = WATCH_PRICE * latest;
      watchPriceBlock = $('.currentPrice');
      watchPriceBlock.text(watchPrice).autoNumeric('init', {
        pSign: ' ₽'
      });
      peskovMonthSalary = Math.ceil(watchPrice / (PESKOV_SALARY_YEAR / 12));
      avgPension = Math.ceil(watchPrice / AVG_PENSION);
      minPension = Math.ceil(watchPrice / MIN_PENSION);
      avgSalary = Math.ceil(watchPrice / AVG_SALARY);
      minSalary = Math.ceil(watchPrice / MIN_SALARY);
      childAllowance = Math.ceil(watchPrice / CHILD_ALLOWANCE);
      $('.peskov-month-to-work').text(peskovMonthSalary);
      $('.avg-pension').text(avgPension);
      $('.min-pension').text(minPension);
      $('.avg-salary').text(avgSalary);
      $('.min-salary').text(minSalary);
      $('.child-allowance').text(childAllowance);
      $('.peskov-month-to-work-text').text(pluralText(peskovMonthSalary, ['месячная зарплата', 'месячные зарплаты', 'месячных зарплат']));
      $('.avg-pension-text').text(pluralText(avgPension, ['средняя', 'средние', 'средних']));
      $('.min-pension-text').text(pluralText(minPension, ['минимальная пенсия', 'минимальные пенсии', 'минимальных пенсий']));
      $('.avg-salary-text').text(pluralText(avgSalary, ['средняя', 'средние', 'средних']));
      $('.min-salary-text').text(pluralText(minSalary, ['минимальная зарплата', 'минимальные зарплаты', 'минимальных зарплат']));
      $('.child-allowance-text').text(pluralText(childAllowance, ['пособие', 'пособия', 'пособий']));
      dates = [];
      watchPrices = [];
      $.each(month, function(date, currency) {
        dates.unshift(date);
        return watchPrices.unshift(Math.ceil(currency * WATCH_PRICE));
      });
      data = {
        labels: dates,
        datasets: [
          {
            label: 'Индекс Пескова',
            fillColor: "rgba(151,187,205,0.2)",
            strokeColor: "rgba(151,187,205,1)",
            pointColor: "rgba(151,187,205,1)",
            pointStrokeColor: "#fff",
            pointHighlightFill: "#fff",
            pointHighlightStroke: "rgba(151,187,205,1)",
            data: watchPrices,
            tooltipTemplate: "<%= addCommas(value) %>"
          }
        ]
      };
      addCommas(function(value) {});
      ctx = $("#peskovChart").get(0).getContext("2d");
      return myNewChart = new Chart(ctx).Line(data, {});
    });
  });

}).call(this);
