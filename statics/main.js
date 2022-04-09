// let titleforprint ="ho";
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
        $(".legend").append(wmsLegendcontrol(layer.layername,layer.layertitle));
        // console.log(layer.layername)
    }
})


// layer on off switch
$(".layer-card-cb").on("change",function(){
    // console.log("Hi")
    var layername = $(this).attr('id')
    var layertitle = $(this).attr('name')
    // console.log(layername,layertitle)
    if($(this).is(':checked')){
        // titleforprint += layername
        window[layername]= handelLayer(layername).addTo(mymap)
        $(".legend").append(wmsLegendcontrol(layername,layertitle));
        
        // fire element at risk
        if (layername == 'finalyearProject:Fire_hazard_map'){
            elementfromgeoserver.map(layer => {
                $('.left-sidebar-fire').append(elementgenerator(layer.layername,layer.deafultcheck,layer.thumnailurl,layer.layertitle,layer.description1))
            })
        };
        // flood
        if (layername == 'finalyearProject:flood_hazard_map'){
            elementfromgeoserverflood.map(layer => {
                $('.left-sidebar-flood').append(elementgeneratorflood(layer.layername,layer.deafultcheck,layer.thumnailurl,layer.layertitle,layer.description1))
            })
        };
        // flood
        // landslide
        if (layername == 'finalyearProject:landslide_hazard_map'){
            elementfromgeoserverlandslide.map(layer => {
                $('.left-sidebar-landslide').append(elementgeneratorlandslide(layer.layername,layer.deafultcheck,layer.thumnailurl,layer.layertitle,layer.description1))
            })
        };
        // landslide
        // earthquake
        if (layername == 'finalyearProject:earthquake_hazard_map'){
            elementfromgeoserverearthquake.map(layer => {
                $('.left-sidebar-earthquake').append(elementgeneratorearthquake(layer.layername,layer.deafultcheck,layer.thumnailurl,layer.layertitle,layer.description1))
            })
        };
        // earthquake
    }
    else{
        // console.log(layername)
        var className = layername.split(":")[1]
        // console.log(className)
        mymap.eachLayer(function(layer){
            if(layer.options.layers === layername){
                mymap.removeLayer(layer)
            }  
        });
        $(`.legend .${className}`).remove()
        // remove content
        if (layername == 'finalyearProject:Fire_hazard_map'){
            // try

            elementfromgeoserver.map(layer => {
                mymap.eachLayer(function(layer){
                    if(layer.options.layers){
                        mymap.removeLayer(layer)
                    }  
                });
            })
            // endtry
            $('.left-sidebar-fire').empty()
            // flood remove content
            
        };
        // flood
        if (layername == 'finalyearProject:flood_hazard_map'){
            // try

            elementfromgeoserver.map(layer => {
                mymap.eachLayer(function(layer){
                    if(layer.options.layers){
                        mymap.removeLayer(layer)
                    }  
                });
            })
            // endtry
            $('.left-sidebar-flood').empty()
        };
        // landslide
        if (layername == 'finalyearProject:landslide_hazard_map'){
            // try

            elementfromgeoserver.map(layer => {
                mymap.eachLayer(function(layer){
                    if(layer.options.layers){
                        mymap.removeLayer(layer)
                    }  
                });
            })
            // endtry
            $('.left-sidebar-landslide').empty()
            // flood remove content
            
        };
        // earthquake
        if (layername == 'finalyearProject:earthquake_hazard_map'){
            // try

            elementfromgeoserver.map(layer => {
                mymap.eachLayer(function(layer){
                    if(layer.options.layers){
                        mymap.removeLayer(layer)
                    }  
                });
            })
            // endtry
            $('.left-sidebar-earthquake').empty()
            // flood remove content
            
        };
    }
})

// opacity change
$('.opacity').on('change',function(){
    var layername = $(this).attr('code')
    var opacity = $(this).val()/100
    // console.log(layername,opacity)
    mymap.eachLayer(function(layer){
        if(layer.options.layers === layername){
            layer.setOpacity(opacity)
        }
    })
})

let title1 = []
// legend function 
function wmsLegendcontrol(layerName, layerTitle){
    var className = layerName.split(":")[1]
    // title1.append(className)
    // console.log(className)
    var url = `http://localhost:8080/geoserver/wms?REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&LAYER=${layerName}`
    var legend = `<p class=${className} style='margin-top:10px; font-weight:Bold'>${layerTitle}</p>`
    legend+=`<p><img class=${className} src=${url} > <br class=${className}/></p>
    `
    // console.log(legend)
    return legend;
    
}
// console.log(title1)
// scale 
L.control.scale({
    position: 'bottomleft'
}).addTo(mymap)
// print
L.control.browserPrint({position: 'bottomleft', title: 'Print ...',
documentTitle:`Hazard Map`}).addTo(mymap);

// mouse coordinate
mymap.on('mousemove',function(e){
    $('.map-coordinate').html(`lat:${e.latlng.lat}, Lng:${e.latlng.lng}`)
})

// map in full browser



// element at risk show
// adding layer from geoserver
function elementlayer(layername){
    // console.log(layername)
    var layer = L.tileLayer.wms("http://localhost:8080/geoserver/wms?",{
        layers: layername,
        transparent:true,
        format:'image/png',
        zIndex:10000
    })
    return layer;
}
// default layer visualization
elementfromgeoserver.map(layer =>{
    // console.log(layer)
    if(layer.deafultcheck === 'checked'){
        console.log("Hi")
        elementlayer(layer.layername).addTo(mymap)
        $(".legend").append(wmsLegendcontrol(layer.layername,layer.layertitle));
        // console.log(layer.layername)
    }
})
// layer on and off 
// layer on off switch
$(document).on('change','.elementcard',function(){
    // console.log('HI')
    var layername = $(this).attr('id')
    var layertitle = $(this).attr('name')
    // console.log(layername,layertitle)
    if($(this).is(':checked')){
        window[layername]= elementlayer(layername).addTo(mymap)
        // $(".legend").append(wmsLegendcontrol(layername,layertitle));
    }
    else{
        // console.log(layername)
        var className = layername.split(":")[1]
        
        mymap.eachLayer(function(layer){
            if(layer.options.layers === layername){
                mymap.removeLayer(layer)
            }  
        });
        // $(`.legend .${className}`).remove()
        // remove content
        
    }
})