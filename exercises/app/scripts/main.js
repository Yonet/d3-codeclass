d3.json('data/world.geojson', createMap);

function createMap(countries) {
	console.log('this is running', countries);

	// Each projection has .transform() and .scale() but differs in implementation
	var aProjection = d3.geo.mercator();

	// d3.geo.path() defaults to alverUSA
	var geoPath = d3.geo.path().projection(aProjection);
	d3.select('svg').selectAll('path').data(countries.features)
		.enter()
		.append('path')
		.attr('d', geoPath)
		.attr('class',  'countries');
}
