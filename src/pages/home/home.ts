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
  status = '';
  evento = ''; 

  constructor(public navCtrl: NavController, private geolocation: Geolocation) {
    this.geolocation.getCurrentPosition().then((resp) => {
      this.latitude = resp.coords.latitude;
      this.longitude = resp.coords.longitude;
      console.log("latitude: "+this.latitude);
      console.log("longitude: "+this.longitude);
      this.loadMap();
     }).catch((error) => {
       console.log(error);
     });
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
         this.status = 'Map está funcionando!';
 
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
                 this.evento = "Clicado";
               });
           }).catch((e)=>{
             this.evento = e;
           });
 
       }).catch((e)=>{
         this.status = "Erro ao iniciar o mapa: "+e;
       });
   }

}
