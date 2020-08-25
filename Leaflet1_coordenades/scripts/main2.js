"use strict";

var map = L.map('map2', {
    center: [41.387525, 2.169717],
    zoom: 5
});

L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://cloudmade.com">CloudMade</a>',
maxZoom: 16
}).addTo(map);//Afegim el layer del mapa

L.control.scale().addTo(map); //Mostra l'escala que estem veient

var popup = L.popup();
var marker = L.marker([0, 0]);  


function onMapClick(e) {    
    map.removeLayer(marker); //Esborrem el marcador si n'hi ha algun.
    marker = L.marker(e.latlng).addTo(map);//Posem el marcador on fem clic
    var lat = e.latlng.lat;
    var lng = e.latlng.lng;

    popup
        .setLatLng(e.latlng)
        .setContent("Les meves coordenades són " + "<br>" + "Lat: " + lat + " Lng: " + lng)
        .openOn(map);

    marker.bindPopup(popup); //Afegim el popup al marcador, si no fem aquest pas, el popup trepitja el marcador
    map.setZoomAround(e.latlng, 16, true);
}

map.on('click', onMapClick);
