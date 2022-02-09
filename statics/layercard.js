function layerCardgenerator(layername, deafultcheck, thumnailurl, layertitle, description1) {
    var layercard = `
    <div class="card-body layer-card">
    <div class="row">
    <div class="col-4 thumbnails">
    <img src="${thumnailurl}" alt="${layertitle}" class="img-fluid">
</div>
<div class="col-8">
    <div style="display: flex; justify-content: space-between;">
        <span class="d-block layer-title mt-2">${layertitle}</span>
        <div class="custom-control custom-switch">
            <input type="checkbox" class="custom-control-input layer-card-cb" ${deafultcheck} id="${layername}" name ="${layertitle}"/>
            <label class="custom-control-label" for="${layername}"></label>
        </div>

    </div>
    <div class="description">
        ${description1}
    </div>
</div>
<div style="display: flex;">
    <label for="opacity">
        <b class="ml-4 mt-2">Opacity:</b>
    </label>
    <input 
    type="range" name="" id="" 
    class="form-control-range opacity ml-2"
    value="100"
    min="5"
    max="100"
    code="${layername}"
    data-toggle="tooltip"
    title="Opacity">
</div>
</div>
</div>
    `;
    return layercard
}