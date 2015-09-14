var width = 960,
	height = 500,
	color = d3.scale.category10();
			
//Projection	
var usaProjection = d3.geo.albersUsa()
	.scale(1000)
	.translate([width / 2, height / 2]);

//Path
var path = d3.geo.path()
	.projection(usaProjection);

//Append the svg
var svg = d3.select(".container").append('svg')
	.attr({
		width: width,
		height: height
	});

// Get the data
// d3.json('data/states.topo.json', function(error, states){
// 	if(error) { 
// 		console.log('error'); 
// 	} else {
// 		console.log('got it', states);
// 		svg.selectAll('path')
// 			.data(topojson.feature(states, states.objects.states).features)
// 			.enter().append('path')
// 			.attr('d', path)
// 			.style('fill', function(d){ console.log('d',d);return color(d.id)})
// 	}
// });

queue()
	.defer(d3.json, 'data/states.topo.json')
	.defer(d3.json, 'data/cities.json')
	.await(makeMyMap);


function makeMyMap (error, states, cities) {
	console.log('city ',cities);
	svg.selectAll('path')
		.data(topojson.feature(states, states.objects.states).features)
		.enter().append('path')
		.attr('d', path)
		.style('fill', function(d){ return color(d.id)})

	//Marks
	// svg.selectAll('.cities')
	// 	.data(cities.features)
	// 	.enter()
	// 	.append('path')
	// 	.attr('d', path.pointRadius(5))
	// 	.attr('class', 'cities');
	// 	
	svg.selectAll('circle').data(cities.features)
		.enter().append('circle')
		.style('fill', 'black')
		.attr('class', 'cities')
		.attr('r', 5)
		.attr('cx', function(d){console.log('d', d.geometry.coordinates);return usaProjection([d.geometry.coordinates[0], d.geometry.coordinates[1]])[0]})
		.attr('cy', function(d){return usaProjection([d.geometry.coordinates[0], d.geometry.coordinates[1]])[1]})
}
