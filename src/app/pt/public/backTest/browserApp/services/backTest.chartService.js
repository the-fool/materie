(function(){
  angular
      .module('pt.backTest')
      .service('chartService', function(d3Service){
        this.renderMainChart = function(data){
            let formatDate = d3.time.format('%m/%d/%y');
                bisectDate = d3.bisector(function(d){ return d.date}).left
            let isDisplaying = "openPL";


            let  margin = {top:20, right: $('browser-app').innerWidth()/10, bottom: $('browser-app').innerWidth()/10, left: $('browser-app').innerWidth()/7};
            let  width  = $('browser-app').innerWidth() - margin.left - margin.right;
            let  height   = $('browser-app').innerHeight()*1/3 -margin.top;

            let  x = d3.time.scale().range([0,width])
            let  y = d3.scale.linear().range([height,0])

            let  xAxis = d3.svg.axis()
                          .scale(x)
                          .orient('bottom')
                          .ticks(10)
            let  yAxis = d3.svg.axis()
                          .scale(y)
                          .orient('left')

                          .ticks(10)

            let  line = d3.svg.line()
                   .x(function(d){
                          return x(formatDate.parse(d.date));
                   })
                   .y(function(d)
                   {
                          return y(d[isDisplaying])
                   })


            let svg =  d3.select('#main-content-holder')
                                    .append('svg')
                                    .attr('class', 'mainChart')
                                    .attr('height', height + margin.top + margin.bottom)
                                    .attr('width', width + margin.left + margin.right)
                                .append('g')
                                    .attr('transform', 'translate('+ margin.left +','+ margin.top + ')')

            let lineSvg = svg.append('g')
            let focus   = svg.append('g')
                             .style('display', 'none')


            x.domain( d3.extent(data.chartData.total, function(d){return formatDate.parse(d.date)} ))
            y.domain ( d3.extent(data.chartData.total, function(d){return d[isDisplaying]} ))


            lineSvg.append("path")
                  .datum(data.chartData.total)
                  .attr("class", "line")
                  .attr("d", line);

            svg.append("g")
                  .attr("class", "x axis")
                  .attr("transform", "translate(0," + height + ")")
                  .call(xAxis);

            svg.append("g")
                  .attr("class", "y axis")
                  .call(yAxis)
              .append("text")
                  .style("text-anchor", "middle")
                  .attr("transform", "rotate(-90)")
                  .attr('transform', 'translate('+ -(margin.left+10) + ',' + height/2 + ')')
                  .attr("y", 6)
                  .attr("dy", ".71em")
                  .attr('fill', 'white')

                // .text(isDisplaying+"($)");



                // append the x line
                 focus.append("line")
                     .attr("class", "x")
                     .style("stroke", "white")
                     .style("stroke-dasharray", "3,3")
                     .style("opacity", 0.5)
                     .attr("y1", 0)
                     .attr("y2", height);

                 // append the y line
                 focus.append("line")
                     .attr("class", "y")
                     .style("stroke", "#ccc")
                     .style("stroke-dasharray", "3,3")
                     .style("opacity", 0.5)
                     .attr("x1", 0)
                     .attr("x2", width);

                 // append the circle at the intersection
                 focus.append("circle")
                     .attr("class", "y")
                     .style("fill", "none")
                     .style("stroke", "#fff")
                     .style('stroke-width', '2px')
                     .attr("r", 5);

                 // place the value at the intersection
                 focus.append("text")
                     .attr("class", "y1")
                     .style("stroke", "white")
                     .style("stroke-width", "2px")
                     .style("opacity", 1)
                     .attr("dx", 8)
                     .attr("dy", "-.3em");
                 focus.append("text")
                     .attr("class", "y2")
                     .attr("dx", 8)
                     .attr("dy", "-.3em");

                 // place the date at the intersection
                 focus.append("text")
                     .attr("class", "y3")
                     .style("stroke", "white")
                     .style("stroke-width", "2px")
                     .style("opacity", 1)
                     .attr("dx", 8)
                     .attr("dy", "1em");
                 focus.append("text")
                     .attr("class", "y4")
                     .attr("dx", 8)
                     .attr("dy", "1em");

            svg.append('rect')
               .attr('width', width)
               .attr('height', height)
               .style('fill', 'none')
               .style('pointer-events', 'all')
               .on('mouseover', function(){focus.style('display', null)})
               .on('mouseout', function(){focus.style('display', 'none')})
               .on('mousemove', mouseLocate)

            let dates = []
            data.chartData.total.map(function(date){
              dates.push(date.date)
            })

            function mouseLocate(){
                  let x0 = x.invert(d3.mouse(this)[0]);
                      x0 = formatDate(x0).split('/')
                      x0[0] =  x0[0].replace('0','')
                      x0 =   x0.join('/')
                  let i = bisectDate( data.chartData.total, x0, 1)
                    let  d0 = data.chartData.total[i];
                    // console.log("d0: ", d0);
                    let  d1 = data.chartData.total[i+1];
                    // console.log('d1', d1);
                    let  d = x0 - d0.date > d1.date - x0 ? d1 : d0
                    // console.log("d: ", d);
                    let graphValue = d[isDisplaying]
                  focus.select('circle.y')
                       .attr('transform',
                             'translate(' + x(formatDate.parse(d.date)) + "," + y(graphValue) + ")"  )


                 focus.select("circle.y")
                               .attr("transform",
                                      "translate(" + x(formatDate.parse(d.date)) + "," +  y(graphValue) + ")")
                               .style('z-index', '10000');

                focus.select("text.y1")
                               .attr("transform",
                                     "translate(" + x(formatDate.parse(d.date)) + "," +
                                     y(graphValue) + ")")
                               .text(graphValue > 0 ? "$" + graphValue : "-$" + Math.abs(graphValue))
                               .style('z-index', '9000');


                focus.select("text.y2")
                               .attr("transform",
                                     "translate(" + x(formatDate.parse(d.date)) + "," +
                                    y(graphValue) + ")")
                               .text(graphValue > 0 ? "$" + graphValue : "-$" + Math.abs(graphValue))
                               .style('z-index', '10000');


                focus.select("text.y3")
                               .attr("transform",
                                   "translate(" + x(formatDate.parse(d.date)) + "," +
                                    y(graphValue) + ")")
                              .text(d.date)
                              .style('z-index', '9000');

                focus.select("text.y4")
                               .attr("transform",
                                     "translate(" + x(formatDate.parse(d.date)) + "," +
                                        y(graphValue) + ")")
                               .text(d.date)
                               .style('z-index', '10000');


                focus.select(".x")
                               .attr("transform",
                                     "translate(" + x(formatDate.parse(d.date)) + "," +
                                    y(graphValue) + ")")
                               .attr("y2", height - y(graphValue));


                focus.select(".y")
                               .attr("transform",
                                     "translate(" + width * -1 + "," +
                                                    y(graphValue) + ")")
                               .attr("x2", width + width);


            //
            // if($('.changePLBackground').innerHTML == "+$" + (Math.round(d.changePL*100)/100)   || $('.changePLBackground').innerHTML == "-$" + (Math.round(d.changePL*100)/100).toString().replace('-', '') ){console.log('hi');}
            // else{
            //   $('.changePLBackground').remove()
            //   lineSvg.append('text')
            //   .attr('class','changePLBackground')
            //   .text(d.changePL > 0 ? "+$" + (Math.round(d.changePL*100)/100) : "-$" + (Math.round(d.changePL*100)/100).toString().replace('-', '') )
            //   .attr('x', function(){
            //     return (width/2) - $('.changePLBackground')[0].innerHTML.length*35/2
            //   } )
            //   .attr('y', height/2 )
            //   .attr('fill', 'white')
            //   .attr('font-size','4em')
            //   .attr('opacity', '.5')
            //
            //
            //   $('.changePLBackground').fadeOut(500)
            // }
          }
        }


        this.updateMainChart  = function(data){


              if(data){
                console.log(data);
                let formatDate = d3.time.format('%m/%d/%y');
                let isDisplaying = "openPL"

                let  margin = {top: $('browser-app').innerHeight()/20, right: $('browser-app').innerWidth()/10, bottom: $('browser-app').innerWidth()/10, left: $('browser-app').innerWidth()/10};
                let  width  = $('browser-app').innerWidth() - margin.left - margin.right;
                let  height   = $('browser-app').innerHeight()*1/3 -margin.top;

                let  x = d3.time.scale().range([0,width])
                let  y = d3.scale.linear().range([height,0])

                let  xAxis = d3.svg.axis()
                .scale(x)
                .orient('bottom')
                .ticks(10)
                let  yAxis = d3.svg.axis()
                .scale(y)
                .orient('left')
                .tickSize(-width)
                .ticks(10)

                let  line = d3.svg.line()
                .x(function(d){
                  console.log(formatDate.parse(d.date))
                  return x(formatDate.parse(d.date));
                })
                .y(function(d)
                {
                  console.log(d['price']);
                  return y(d[isDisplaying])
                })

                d3.select('svg').remove()

                let svg =  d3.select('#main-content-holder')
                .append('svg')
                .attr('class', 'mainChart')
                .attr('height', height + margin.top + margin.bottom)
                .attr('width', width + margin.left + margin.right)
                .style('border', '2px solid #333')
                .append('g')
                .attr('transform', 'translate('+ margin.left +','+ margin.top + ')')


                x.domain( d3.extent(data.chartData.total, function(d){return formatDate.parse(d.date)}))
                y.domain (d3.extent(data.chartData.total, function(d){return d[isDisplaying]}))


                svg.append("path")
                .datum(data.chartData.total)
                .attr("class", "line")
                .attr("d", line);

                svg.append("g")
                .attr("class", "x axis")
                .attr("transform", "translate(0," + height + ")")
                .call(xAxis);

                svg.append("g")
                .attr("class", "y axis")
                .call(yAxis)
                .append("text")
                .style("text-anchor", "middle")
                .attr("transform", "rotate(-90)")

                .attr('transform', 'translate('+ -(margin.left+10) + ',' + height/2 + ')')
                .attr("y", 6)
                .attr("dy", ".71em")
                .attr('fill', 'white')

              }
          }

          this.renderLegChart = function(data, parentID, isDisplaying){
            let formatDate = d3.time.format('%m/%d/%y');
             parentID = "#"+ parentID
             isDisplaying = "changePL"
            let  margin = {top: $(parentID).innerHeight()/20, right: $(parentID).innerWidth()/10, bottom: 0, left: $(parentID).innerWidth()/10};
            let  width  = $(parentID).innerWidth();
            let  height   = $(parentID).innerHeight();
            let  x = d3.time.scale().range([0,width])
            let  y = d3.scale.linear().range([height - margin.top - margin.bottom -  15,0])

            let  xAxis = d3.svg.axis()
                  .scale(x)
                  .orient('bottom')
                  .ticks(10)
            let  yAxis = d3.svg.axis()
                  .scale(y)
                  .orient('left')
                  .tickSize(-width)
                  .ticks(6)


            d3.select(parentID).selectAll('svg').remove()

            let svg =  d3.select(parentID)
                  .append('svg')
                  .attr('class', 'mainChart')
                  .attr('height', height)
                  .attr('width', width - margin.right/2)
                  .style('border', '2px solid #333')
                  .append('g')
                  .attr('transform', 'translate('+ margin.left +','+ margin.top + ')')

            x.domain( d3.extent(data, function(d){return formatDate.parse(d.date)}))
            y.domain (d3.extent(data, function(d){return d['openPL']}))

            var heightDomain = d3.extent(data, function(d){return d['openPL']})
            var heightDiff = Math.abs(heightDomain[1] - heightDomain[0])
            var heightScale = d3.scale.linear().range([height, 0]).domain([0, heightDiff])
            var rectWidth =  (width / data.length)

            svg.selectAll('.rect')
                .data(data)
                .enter()
                .append('rect')
                .attr('x' , function(d, i){return (i * rectWidth)*5.8/7})
                .attr('y', function(d,i){
                   if(d.changePL >= 0) {
                     return y(d.openPL)
                   }
                   else{
                     return y(d.openPL-d.changePL)
                   }

                 })
                .attr('fill', function(d, i){
                  if(d.changePL >= 0){
                    return '#0f0'
                  } else{return '#f00'}
                })
                .attr('stroke' ,'black')
                .attr('height',function(d, i , arry){
                  return (Math.abs(d.changePL/heightDiff)*height)
                })
                .attr('width', rectWidth*5.8/7)
                .attr('')

            svg.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + height + ")")
            .call(xAxis);

            svg.append("g")
            .attr("class", "y axis")
            .call(yAxis)
            .append("text")
            .style("text-anchor", "middle")
            .attr("transform", "rotate(-90)")

            .attr('transform', 'translate('+ -(margin.left+10) + ',' + height/2 + ')')
            .attr("y", 30)
            .attr("dy", ".71em")
            .attr('fill', 'white')
            // .text(isDisplaying+"($)");
            svg.append('text')
                .attr('x', width/3 )
                .attr('y', height/2 )
                .text( data[0].symbol)
                .attr('fill', 'white')
                .attr('font-size','2em')
                .attr('opacity', '.5')
          }


          this.updateLegChart = function(){

          }



      })
})()
