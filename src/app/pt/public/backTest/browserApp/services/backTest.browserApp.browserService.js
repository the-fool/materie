  (function(){
     'use strict'

      angular
      .module('pt.backTest')
      .service('browserService', function(){




            this.configureTotal = function(data, indexes){

              var total = {}
              var dataShown = [];
              for(var trade in data){
                  if ( indexes.indexOf(Number(trade.replace('trade', ""))) > -1 ){
                      dataShown.push(data[trade]);
                  }
              };
              var util = {}
              util.dates = {}
               util.dates.timeEnter = [];
               util.dates.timeExit = []
               util.symbols = [];
               util["P/L"] = 0
               util['dailyP/L'] = [];
               util.buyingPower = 0;
               util.totalPriceEnter = 0
               util.totalPriceExit = 0
               util.position = {}


              dataShown.map(function(trade, i){
                util.position["leg"+ (i+1)] =  trade.position
                util.buyingPower += trade.buyingPower
                util["P/L"] += trade['P/L'];
                util.dates.timeEnter.push({date: trade.timeEnter, symbol: trade.symbol});
                util.dates.timeExit.push({date: trade.timeExit, symbol: trade.symbol});
                if(util.symbols.indexOf(trade.symbol) == -1) util.symbols.push(trade.symbol);
                util.totalPriceEnter += trade.totalPriceEnter
                util.totalPriceExit += trade.totalPriceExit

                trade.chartData.total.map(function(dateObject, i){
                    if( !util['dailyP/L'][dateObject.date] ){
                      util['dailyP/L'][dateObject.date] = {netValue: dateObject.netValue, price : dateObject.price, date: dateObject.date, delta: dateObject.delta, 'openPL': dateObject.openPL}

                    }
                    else{
                      util['dailyP/L'][dateObject.date].netValue += dateObject.netValue
                      util['dailyP/L'][dateObject.date].price += dateObject.price;
                      util['dailyP/L'][dateObject.date].openPL += dateObject.openPL
                      util['dailyP/L'][dateObject.date].delta +=dateObject.delta
                    }

                })



              })





             util.dates.timeEnter = util.dates.timeEnter.sort(function(a, b){
               return Date.parse(a.date) > Date.parse(b.date)
             })

             util.dates.timeExit = util.dates.timeExit.sort(function(a, b){
               return Date.parse(a.date) > Date.parse(b.date)
             })



            total.timeEnter = util.dates.timeEnter[0].date;
            total.timeExit = util.dates.timeExit[util.dates.timeExit.length-1].date;
            total.symbol = util.symbols;
            total['P/L'] = util['P/L'];
            total.dailyPL = util['dailyP/L']
            var daily = []
            for( var day in total.dailyPL) {
              daily.push(total.dailyPL[day])
            }

            delete total.dailyPL

            var newMap = [];
            daily.map(function(day, i, array){
              if (i == 0 ){
                day.changePL = day.openPL
                newMap.push(day)
              }
              else{
                var index = i-1;
                day.changePL = day.openPL - array[index].openPL
                newMap.push(day)
              }
            })

            total.chartData = {};
            dataShown.map(function(trade, i){
              total.chartData['leg' + (i+1)] = trade.chartData.total
            })


            total.position = util.position;
            total.chartData.total = newMap;
            total.buyingPower = util.buyingPower;
            total.roc = total['P/L']/total.buyingPower;
            total.totalPriceEnter = util.totalPriceEnter;
            total.totalPriceExit = util.totalPriceEnter + total['P/L']
            return total

            }



            this.queries = {
              coveredCall:  { A: {
                                  '1': '1/4/16 - nextFullExpiration("1/4/16")',
                                  '2': 'stockArray(["NFLX","AAPL", "FB", "LNKD", "FXE"])',
                                  '3': 'enterAtOpen("1/4/16")'
                                },
                              B: { '1': 'closeAtClose(nextFullExpiration("1/4/16"))'},
                              C: { '1': 'leg1(coveredCall($stock, "3OTM", 1))' },
                              D: { '1': 'symbol',
                                  '2': 'P/L',
                                  '3': 'roc',
                                  '4': 'daysHeld'
                                  }
                            },
             justStock: { A: {
                                 '1': '1/4/16 - nextFullExpiration("1/4/16")',
                                 '2': 'stockArray(["NFLX","AAPL", "FB", "LNKD", "FXE"])',
                                 '3': 'enterAtOpen("1/4/16")'
                               },
                             B: { '1': 'closeAtClose(nextFullExpiration("1/4/16"))'},
                             C: { '1': 'leg1(stock($stock, 100))' },
                             D: { '1': 'symbol',
                                 '2': 'P/L',
                                 '3': 'roc',
                                 '4': 'daysHeld'
                               }
                        }
              }
      })
})()
