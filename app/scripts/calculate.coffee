'use strict'
$ ->
    Chart.defaults.global.tooltipTemplate = "<%= addCommas(value) %>"
    Chart.defaults.global.scaleLabel = "<%= addCommas(value) %>"
    $.ajax('/data/currency.json').done  (data)->

        latest = Math.ceil(data.latest);


        month = data.month;
        if $(window).width() < 800
          sliced = {};
          i = 0;
          for date, value of month
            sliced[date] = value
            i++
            if i == 10
              break
          month = sliced
          $('.days-count').text(10)

        watchPrice = WATCH_PRICE * latest;
        watchPriceBlock  = $('.currentPrice');
        watchPriceBlock.text(watchPrice).autoNumeric('init', {
         pSign: ' ₽'
        })

        peskovMonthSalary = Math.ceil(watchPrice / (PESKOV_SALARY_YEAR / 12));
        $('.peskov-month-to-work').text(peskovMonthSalary);

        $('.avg-pension').text(Math.ceil(watchPrice/AVG_PENSION));
        $('.min-pension').text(Math.ceil(watchPrice/MIN_PENSION));


        $('.avg-salary').text(Math.ceil(watchPrice/AVG_SALARY));
        $('.min-salary').text(Math.ceil(watchPrice/MIN_SALARY));

        $('.child-allowance').text(Math.ceil(watchPrice/CHILD_ALLOWANCE));


        dates = []
        watchPrices = []
        $.each month, (date, currency) ->
          dates.unshift(date)
          watchPrices.unshift(Math.ceil(currency * WATCH_PRICE))

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
        addCommas (value) ->


        ctx = $("#peskovChart").get(0).getContext("2d");
        myNewChart = new Chart(ctx).Line(data, {});


