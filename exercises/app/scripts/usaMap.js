var width = 500,
	height = 500,
	color = d3.scale.category10();
			
//Projection	
var usaProjection = d3.geo.albersUsa()
	.scale(500)
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

//Get the data
d3.json('data/states.topo.json', function(error, world){
	if(error) { 
		console.log('error'); 
	} else {
		console.log('got it', world);
		svg.selectAll('path')
			.data(topojson.feature(world, world.objects.states).features)
			.enter().append('path')
			.attr('d', path)
			.style('fill', function(d){ console.log('d',d);return color(d.id)})
	}
});

