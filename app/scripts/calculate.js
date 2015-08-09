(function() {
  'use strict';
  $(function() {
    Chart.defaults.global.tooltipTemplate = "<%= addCommas(value) %>";
    Chart.defaults.global.scaleLabel = "<%= addCommas(value) %>";
    return $.ajax('/data/currency.json').done(function(data) {
      var ctx, date, dates, i, latest, month, myNewChart, peskovMonthSalary, sliced, value, watchPrice, watchPriceBlock, watchPrices;
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
      $('.peskov-month-to-work').text(peskovMonthSalary);
      $('.avg-pension').text(Math.ceil(watchPrice / AVG_PENSION));
      $('.min-pension').text(Math.ceil(watchPrice / MIN_PENSION));
      $('.avg-salary').text(Math.ceil(watchPrice / AVG_SALARY));
      $('.min-salary').text(Math.ceil(watchPrice / MIN_SALARY));
      $('.child-allowance').text(Math.ceil(watchPrice / CHILD_ALLOWANCE));
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
