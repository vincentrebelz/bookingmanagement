import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';

@Component({
  selector: 'app-map-leaflet',
  templateUrl: './map-leaflet.component.html',
  styleUrls: ['./map-leaflet.component.scss']
})
export class MapLeafletComponent implements OnInit {

  constructor() {}

  ngOnInit() {
    var myIcon = L.icon({
      iconUrl: 'assets/images/marker-icon.png',
      iconSize: [25, 41],
      iconAnchor: [13, 41],
      popupAnchor: [-0, -32],
      shadowUrl: 'assets/images/marker-shadow.png',
      shadowSize: [41, 41],
      shadowAnchor: [15, 41]
    });

    var cities = new L.LayerGroup();

    L.marker([39.61, -105.02], {
        icon: myIcon
      }).bindPopup('This is Littleton, CO.').addTo(cities),
      L.marker([39.74, -104.99], {
        icon: myIcon
      }).bindPopup('This is Denver, CO.').addTo(cities),
      L.marker([39.73, -104.8], {
        icon: myIcon
      }).bindPopup('This is Aurora, CO.').addTo(cities),
      L.marker([39.77, -105.23], {
        icon: myIcon
      }).bindPopup('This is Golden, CO.').addTo(cities);

    var mbAttr = 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' + '<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' + 'Imagery © <a href="http://mapbox.com">Mapbox</a>',
      mbUrl = 'https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=YOURACCESSTOKEN';

    var grayscale = L.tileLayer(mbUrl, {
        id: 'mapbox.light',
        attribution: mbAttr
      }),
      streets = L.tileLayer(mbUrl, {
        id: 'mapbox.streets',
        attribution: mbAttr
      });

    var map = L.map('map', {
      center: [39.73, -104.99],
      zoom: 10,
      layers: [grayscale, cities]
    });

    var baseLayers = {
      "Grayscale": grayscale,
      "Streets": streets
    };

    var overlays = {
      "Cities": cities
    };
    
    L.control.layers(baseLayers, overlays).addTo(map);
  }
}