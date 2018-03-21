import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import {
  GoogleMaps,
  GoogleMap,
  GoogleMapsEvent,
  GoogleMapOptions
 } from '@ionic-native/google-maps';
 

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  map: GoogleMap;
  latitude = 0;
  longitude = 0;

  constructor(public navCtrl: NavController, private geolocation: Geolocation) {
    this.geolocation.getCurrentPosition().then((resp) => {
      this.latitude = resp.coords.latitude;
      this.longitude = resp.coords.longitude;
      console.log("latitude: "+this.latitude);
      console.log("longitude: "+this.longitude);
     }).catch((error) => {
       console.log(error);
     });
  }

  ionViewDidLoad() {
    this.loadMap();
   }
 
  loadMap() {
     let mapOptions: GoogleMapOptions = {
       camera: {
         target: {
           lat: this.latitude,
           lng: this.longitude
         },
         zoom: 18,
         tilt: 30
       }
     };
     
     this.map = GoogleMaps.create('map_canvas', mapOptions);

     this.map.one(GoogleMapsEvent.MAP_READY)
       .then(() => {
         console.log('Map is ready!');
 
         this.map.addMarker({
             title: 'Ionic',
             icon: 'blue',
             animation: 'DROP',
             position: {
               lat: this.latitude,
               lng: this.longitude
             }
           })
           .then(marker => {
             marker.on(GoogleMapsEvent.MARKER_CLICK)
               .subscribe(() => {
                 alert('clicked');
               });
           });
 
       });
   }

}
