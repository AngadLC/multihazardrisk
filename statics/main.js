var mymap = L.map('mapid', {
    center: [28.365203177025812,84.05586759137705],
    zoom: 10,
    zoomControl: false
});

L.control.zoom({
    position: 'topright'
}).addTo(mymap);

var osm = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(mymap);


var googleStreets = L.tileLayer('http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}', {
    maxZoom: 20,
    subdomains: ['mt0', 'mt1', 'mt2', 'mt3']
});
var googleHybrid = L.tileLayer('http://{s}.google.com/vt/lyrs=s,h&x={x}&y={y}&z={z}', {
    maxZoom: 20,
    subdomains: ['mt0', 'mt1', 'mt2', 'mt3']
});
// basemap
var baseMaps = {
    'osm': osm,
    'googleStreets': googleStreets,
    'googleHybrid': googleHybrid

}
// adding contorls 
L.control.layers(baseMaps, null, { 'position': 'topright', 'collapse': true }).addTo(mymap);

// adding layer from geoserver
function handelLayer(layername){
    var layer = L.tileLayer.wms("http://localhost:8080/geoserver/wms?",{
        layers: layername,
        transparent:true,
        format:'image/png',
        zIndex:100
    })
    return layer
}
// card geneator in left side
layerfromgeoserver.map(layer => {
    $('.left-sidebar').append(layerCardgenerator(layer.layername,layer.deafultcheck,layer.thumnailurl,layer.layertitle,layer.description1))
})
// default layer visualization
layerfromgeoserver.map(layer =>{
    // console.log(layer)
    if(layer.deafultcheck === 'checked'){
        handelLayer(layer.layername).addTo(mymap)
        $(".legend").append(wmsLegendcontrol(layer.layername,layer.layertitle))
    }
})


// layer on off switch
$(".layer-card-cb").on("change",function(){
    var layername = $(this).attr('id')
    var layertitle = $(this).attr('name')
    // console.log(layername,layertitle)
    if($(this).is(':checked')){
        window[layername]= handelLayer(layername).addTo(mymap)
        $(".legend").append(wmsLegendcontrol(layername,layertitle))
    }
    else{
        var className = layername.split(":")[1]
        // console.log(className)
        mymap.eachLayer(function(layer){
            if(layer.options.layers === layername){
                mymap.removeLayer(layer)
            }  
        });
        $(`.legend .${className}`).remove()
    }
})

// opacity change
$('.opacity').on('change',function(){
    var layername = $(this).attr('code')
    var opacity = $(this).val()/100
    console.log(layername,opacity)
    mymap.eachLayer(function(layer){
        if(layer.options.layers === layername){
            layer.setOpacity(opacity)
        }
    })
})


// legend function 
function wmsLegendcontrol(layerName, layerTitle){
    var className = layerName.split(":")[1]
    // console.log(className)
    var url = `http://localhost:8080/geoserver/wms?REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&LAYER=${layerName}`
    var legend = `<p class=${className} style='margin-top:10px; font-weight:Bold'>${layerTitle}</p>`
    legend+=`<p><img class=${className} src=${url} > <br class=${className}/></p>
    `
    // console.log(legend)
    return legend;
    
}
