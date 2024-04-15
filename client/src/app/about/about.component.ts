import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import * as mapboxgl from 'mapbox-gl';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
})
export class AboutComponent implements OnInit {
  map: any;
  marker: any;

  ngOnInit(): void {
    this.map = new mapboxgl.Map({
      accessToken: environment.mapbox.accessToken,
      container: 'map', // container ID
      style: 'mapbox://styles/mapbox/streets-v12', // style URL
      center: [105, 18], // starting position [lng, lat]
      zoom: 4, // starting zoom
    });

    // add marker
    new mapboxgl.Marker({
      color: 'red',
      draggable: true,
      anchor: 'bottom',
    })
      .setLngLat([105.85, 21.0])
      .addTo(this.map);
    new mapboxgl.Marker({
      color: 'red',
      draggable: true,
      anchor: 'bottom',
    })
      .setLngLat([105.85, 18.0])
      .addTo(this.map);
    new mapboxgl.Marker({
      color: 'red',
      draggable: true,
      anchor: 'bottom',
    })
      .setLngLat([107.85, 15.0])
      .addTo(this.map);

    // add popup
    new mapboxgl.Popup({
      closeButton: true,
      closeOnClick: false,
      anchor: 'right',
    })
      .setLngLat([105.85, 21.0])
      .setHTML('<small>Ha Noi</small>')
      .addTo(this.map)
    new mapboxgl.Popup({
      closeButton: true,
      closeOnClick: false,
      anchor: 'right',
    })
      .setLngLat([105.85, 18.0])
      .setHTML('<small>Da Nang</small>')
      .addTo(this.map)
    new mapboxgl.Popup({
      closeButton: true,
      closeOnClick: false,
      anchor: 'right',
    })
      .setLngLat([107.85, 15.0])
      .setHTML('<small>Ho Chi Minh</small>')
      .addTo(this.map);


    // map control

    this.map.addControl(new mapboxgl.NavigationControl({
      showCompass:true,
      showZoom: true,
    }))

    this.map.addControl(new mapboxgl.GeolocateControl({
      positionOptions: {
        enableHighAccuracy: true
      },
      trackUserLocation: true
    }))
  }
}
