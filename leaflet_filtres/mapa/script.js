/*
FASE 3.1
	1) Relleno el data_markers con una petición a la api
	2) Añado de forma dinámica en el select los posibles tipos de restaurantes
	3) Llamo a la función para --> render_to_map(data_markers, 'all'); <-- para mostrar restaurantes en el mapa

FASE 3.2
	1) Limpio todos los marcadores
	2) Realizo un bucle para decidir que marcadores cumplen el filtro, y los agregamos al mapa
*/



var map = L.map('mapid').on('load', onMapLoad).setView([41.400, 2.206], 9);
map.locate({ setView: true, maxZoom: 17 });
// setView: Si true, establece automáticamente la vista del mapa en la ubicación del usuario con respecto a la precisión de detección, o en la vista del mundo si falla la geolocalización.


var tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {}).addTo(map);

//en el clusters almaceno todos los markers
var markers = L.markerClusterGroup();
var data_markers = [];
var totalCategories = new Array("Tots"); //Creem un array on emmagatzemar les categories

function onMapLoad() {

	console.log("Mapa cargado");

	$(document).ready(function () {
		$.ajax({
			type: "GET",
			url: "http://localhost:8080/mapa/api/apiRestaurants.php",
			dataType: "json",
			success: function (response) {
				data_markers = response;
				console.log(data_markers);

				data_markers.forEach((element, index) => {
					var categoria = element.kind_food.split(","); //Fem que, en cada registre, converteixi el camp kind-food 											en un array amb tants elements com hi hagi separats per 											coma.
					console.log(categoria);
					for (var i = 0; i < categoria.length; i++) {//Entrem a l'array obtingut i anomenat categoria	
						var value = false;
						for (var j = 0; j < totalCategories.length; j++) {
							if (categoria[i] == totalCategories[j]) { //Mirem si ja tenim la categoria a l'array
								value = true; //Si tenim la categoria value canvia a true
							}
						}
						console.log(value);
						if (totalCategories.length == 0 || value == false) {//l'array categories buit o value no ha canviat
							totalCategories.push(categoria[i]);
							console.log(totalCategories);
						}
					}
				});

				for (var k = 0; k < totalCategories.length; k++) {
					$("#kind_food_selector").append("<option>" + totalCategories[k] + "</option>");
				}
				render_to_map(data_markers, "Tots"); //Cridem la funció per filtrar per "Tots"

				$('#kind_food_selector').on('change', function () {
					console.log(this.value); //Mirem l'opció seleccionada a select
					markers.clearLayers();//Borrem les capes de marcadors ( la funció map.removeLayer(markers); ara no serveix pq tenim un cluster de marcadors i no només un.)
					render_to_map(data_markers, this.value);//Cridem la funció per filtrar per la categoria seleccionada.
				});
			}
		});
		function render_to_map(data_markers, filter) { //Funció per filtrar els marcadors segons categoria
			for (i = 0; i < data_markers.length; i++) {
				console.log(typeof filter, filter); //Typeof = string
				console.log(typeof data_markers[i].kind_food, data_markers[i].kind_food) //Typeof = string
				if (data_markers[i].kind_food.indexOf(filter) > -1 || filter == "Tots") { //Si dóna -1 vol dir que no coincideixen en cap cas els 2 strings
					var m = L.marker([data_markers[i].lat, data_markers[i].lng]); //Coordenades de cada registre
					var popup = L.popup(); //Popup de cada marker
					var lat = data_markers[i].lat;
					var lng = data_markers[i].lng;
					popup.setContent(data_markers[i].name + "<br>" + data_markers[i].address + "<br>" + data_markers[i].kind_food + "<br>" + "Lat: " + lat + " Lng: " + lng); //Contingut popup
					m.bindPopup(popup); //Afegim el popup al marcador
					markers.addLayer(m); //Afegim les coordenades als marcadors
				}
			}
			map.addLayer(markers);
		}
	});

}




