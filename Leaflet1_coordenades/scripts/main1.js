"use strict";

// var map = L.map("map").setView([41.387525, 2.169717], 16);
var map = L.map('map', {
    center: [41.387525, 2.169717],
    zoom: 16
});

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png?{foo}', { foo: 'bar', attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>' }).addTo(map); //Afegim el layer del mapa

var marker = L.marker([41.386995, 2.166055]).addTo(map); //Posem un marcador en un punt concret

marker.bindPopup("<b>Restaurant Centfocs</b><br><br>Restaurante mediterráneo<br>Carrer de Balmes 16, 08007 Barcelona"); 
//Afegim el popup al marcador
//Si al final posem .openPopup() es carrega la pàg amb el popup a la vista



