var mymap = L.map('mapid', {
    center: [28.2096, 83.9856],
    zoom:7,
    zoomControl: false
});

L.control.zoom({
    position: 'topright'
}).addTo(mymap);

var osm = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
	maxZoom: 19,
	attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(mymap);
var topo = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
	maxZoom: 17,
	attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
});
var Watercolor = L.tileLayer('https://stamen-tiles-{s}.a.ssl.fastly.net/watercolor/{z}/{x}/{y}.{ext}', {
	attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
	subdomains: 'abcd',
	minZoom: 1,
	maxZoom: 16,
	ext: 'jpg'
});
var googleStreets = L.tileLayer('http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}',{
    maxZoom: 20,
    subdomains:['mt0','mt1','mt2','mt3']
});
var googleHybrid = L.tileLayer('http://{s}.google.com/vt/lyrs=s,h&x={x}&y={y}&z={z}',{
    maxZoom: 20,
    subdomains:['mt0','mt1','mt2','mt3']
});
// basemap
var baseMaps = {
    'osm' :osm,
    'topomap' : topo,
    'Watercolormap' : Watercolor,
    'googleStreets' : googleStreets,
    'googleHybrid':  googleHybrid

}
// adding contorls 
L.control.layers(baseMaps,null,{'position':'topright','collapse':true}).addTo(mymap);

// adding geojson data 
var data = L.geoJSON(data2,{
    style:{
        color: 'red',                   
        fillColor:'black'
    },
    onEachFeature:function (feature, layer) {
        layer.bindPopup(feature.properties.name)
    }
}).addTo(mymap)
//layer on and off
$( ".layer-card-cb" ).on( "change", function() {
    if($(this).is( ":checked")){
        console.log('checked')
        data.addTo(mymap)
    }
    else{
        mymap.removeLayer(data)
        console.log('unchecked')
    }
  });

//   opacity option
$( ".opacity" ).on( "change", function() {
    var value = $(this).val()/100
    console.log(value)
    data.setStyle({fillopacity:value,opacity:value})
  });