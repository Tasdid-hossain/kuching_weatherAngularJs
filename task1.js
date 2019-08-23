/*global angular */

var app = angular.module('myApp', []);



app.controller("myCtrl", function ($scope, $http, $filter) {
    "use strict";
    $scope.weatherPerPage = 5;
    

    $http.get('http://dataservice.accuweather.com/currentconditions/v1/230204?apikey=tOA29UYLBnCXYS3oveLuWH9KApSmlQYs')
        .then(
            function (response) {
                $scope.weatherLocation = response.data;

                $scope.temparature = $scope.weatherLocation[0].Temperature.Metric.Value;
                $scope.WeatherText = $scope.weatherLocation[0].WeatherText;
                $scope.localTime = $scope.weatherLocation[0].LocalObservationDateTime;
                $scope.today = $filter('date')($scope.localTime, "fullDate");
                $scope.WeatherIcon = $scope.weatherLocation[0].WeatherIcon;
            },
            function (response) {
                // error handling routine
            });

    $http.get('http://dataservice.accuweather.com/locations/v1/230204?apikey=tOA29UYLBnCXYS3oveLuWH9KApSmlQYs')
        .then(
            function (response) {
                $scope.locate = response.data;
                $scope.location = $scope.locate.EnglishName;
            },
            function (response) {
                // error handling routine
            });

    $http.get('http://dataservice.accuweather.com/forecasts/v1/hourly/12hour/230204?apikey=tOA29UYLBnCXYS3oveLuWH9KApSmlQYs')
        .then(
            function (response) {
                $scope.forecast = response.data;
                var series = [],
                    len = $scope.forecast.length,
                    k = 0;
                var data = [];
                for (k; k < len; k++) {
                    series.push({
                        name: $filter('date')($scope.forecast[k].DateTime, "HH:mm"),
                        data: [$scope.forecast[k].Temperature.Value]
                    });
                }


                Highcharts.chart('myfirstchart', {
                    chart: {
                        backgroundColor: {
                            linearGradient: [0, 0, 500, 500],
                            stops: [
                [0, 'rgb(255, 255, 255)'],
                [1, 'rgb(200, 200, 255)']
            ]
                        },
                        type: 'column'
                    },
                    title: {
                        text: '12 Hours of Hourly Forecasts'
                    },
                    subtitle: {
                        text: 'Time Vs Temperature (F)'
                    },
                    xAxis: {
                        categories: ['Time'],
                        crosshair: true
                    },
                    series: series
                });

                $scope.hourMin = $filter('date')($scope.forecast[0].DateTime, "shortTime");
            },
            function (response) {
                // error handling routine
            });


    $http.get('http://dataservice.accuweather.com/forecasts/v1/daily/5day/230204?apikey=tOA29UYLBnCXYS3oveLuWH9KApSmlQYs')
        .then(
            function (response) {
                $scope.fiveDay = response.data;
                $scope.daily = $scope.fiveDay.DailyForecasts;
                console.log($scope.daily);
            },
            function (response) {
                // error handling routine
            });


    $http.get('http://dataservice.accuweather.com/currentconditions/v1/230204/historical/24?apikey=tOA29UYLBnCXYS3oveLuWH9KApSmlQYs')
        .then(
            function (response) {
                $scope.historic = response.data;
                console.log($scope.historic);
                var time = [];
                console.log(time);
                var series = [],
                    len = $scope.historic.length,
                    k = 0;
                console.log($scope.historic[1].Temperature.Metric.Value);
                for (k; k < len; k++) {
                    series[k] = $scope.historic[k].Temperature.Metric.Value;
                    time[k] = $filter('date')($scope.historic[k].LocalObservationDateTime, "shortTime");
                }


                Highcharts.chart('xxx', {
                    chart: {
                        type: 'spline'
                    },
                    title: {
                        text: '24-Hour Historical Current Conditions'
                    },
                    subtitle: {
                        text: 'Source: Accuweather.com'
                    },
                    xAxis: {
                        categories: time
                    },
                    yAxis: {
                        title: {
                            text: 'Temperature'
                        },
                        labels: {
                            formatter: function () {
                                return this.value + '°';
                            }
                        }
                    },
                    tooltip: {
                        crosshairs: true,
                        shared: true
                    },
                    plotOptions: {
                        spline: {
                            marker: {
                                radius: 4,
                                lineColor: '#666666',
                                lineWidth: 1
                            }
                        }
                    },
                    series: [{
                        name: 'Kuching',
                        marker: {
                            symbol: 'square'
                        },
                        data: series
              }]
                });

            },
            function (response) {
                // error handling routine
            });

    $http.get('http://dataservice.accuweather.com/currentconditions/v1/topcities/50?apikey=tOA29UYLBnCXYS3oveLuWH9KApSmlQYs')
        .then(
            function (response) {
                $scope.cities = response.data;

            },
            function (response) {
                // error handling routine
            });




});
