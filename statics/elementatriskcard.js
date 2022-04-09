function elementgenerator(layername, deafultcheck, thumnailurl, layertitle, description1) {
    var layercard = `
    
    <div class="card-body layer-cards">
    <div class="row">
    <div class="col-4 thumbnails">
    <img src="${thumnailurl}" alt="${layertitle}" class="img-fluid">
</div>
<div class="col-8">
    <div style="display: flex; justify-content: space-between;">
        <span class="d-block layer-title mt-2">${layertitle}</span>
        <div class="custom-control custom-switch">
            <input type="checkbox" class="custom-control-input elementcard" ${deafultcheck} id="${layername}" name ="${layertitle}"/>
            <label class="custom-control-label" for="${layername}"></label>
        </div>

    </div>
    <div class="description">
        ${description1}
    </div>
</div>
</div>
</div>
    `;
    return layercard
}
// flood
function elementgeneratorflood(layername, deafultcheck, thumnailurl, layertitle, description1) {
    var layercard = `
    
    <div class="card-body layer-cards">
    <div class="row">
    <div class="col-4 thumbnails">
    <img src="${thumnailurl}" alt="${layertitle}" class="img-fluid">
</div>
<div class="col-8">
    <div style="display: flex; justify-content: space-between;">
        <span class="d-block layer-title mt-2">${layertitle}</span>
        <div class="custom-control custom-switch">
            <input type="checkbox" class="custom-control-input elementcard" ${deafultcheck} id="${layername}" name ="${layertitle}"/>
            <label class="custom-control-label" for="${layername}"></label>
        </div>

    </div>
    <div class="description">
        ${description1}
    </div>
</div>
</div>
</div>
    `;
    return layercard
}
// earthquake
function elementgeneratorearthquake(layername, deafultcheck, thumnailurl, layertitle, description1) {
    var layercard = `
    
    <div class="card-body layer-cards">
    <div class="row">
    <div class="col-4 thumbnails">
    <img src="${thumnailurl}" alt="${layertitle}" class="img-fluid">
</div>
<div class="col-8">
    <div style="display: flex; justify-content: space-between;">
        <span class="d-block layer-title mt-2">${layertitle}</span>
        <div class="custom-control custom-switch">
            <input type="checkbox" class="custom-control-input elementcard" ${deafultcheck} id="${layername}" name ="${layertitle}"/>
            <label class="custom-control-label" for="${layername}"></label>
        </div>

    </div>
    <div class="description">
        ${description1}
    </div>
</div>
</div>
</div>
    `;
    return layercard
}
// landslide
function elementgeneratorlandslide(layername, deafultcheck, thumnailurl, layertitle, description1) {
    var layercard = `
    
    <div class="card-body layer-cards">
    <div class="row">
    <div class="col-4 thumbnails">
    <img src="${thumnailurl}" alt="${layertitle}" class="img-fluid">
</div>
<div class="col-8">
    <div style="display: flex; justify-content: space-between;">
        <span class="d-block layer-title mt-2">${layertitle}</span>
        <div class="custom-control custom-switch">
            <input type="checkbox" class="custom-control-input elementcard" ${deafultcheck} id="${layername}" name ="${layertitle}"/>
            <label class="custom-control-label" for="${layername}"></label>
        </div>

    </div>
    <div class="description">
        ${description1}
    </div>
</div>
</div>
</div>
    `;
    return layercard
}