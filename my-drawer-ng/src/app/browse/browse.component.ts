import { Component,ViewChild,ElementRef, OnInit } from '@angular/core'
import { registerElement } from '@nativescript/angular'
import { RadSideDrawer } from 'nativescript-ui-sidedrawer'
import { Application } from '@nativescript/core'
var gmaps = require("nativescript-google-maps-sdk")

registerElement("MapView", () => require("nativescript-google-maps-sdk").MapView)

@Component({
  selector: 'Browse',
  templateUrl: './browse.component.html',
})
export class BrowseComponent implements OnInit {
  @ViewChild("MapView") mapView: ElementRef;
  
  constructor() {
    // Use the component constructor to inject providers.
  }

  ngOnInit(): void {
    // Init your component properties here.
  }

  onDrawerButtonTap(): void {
    const sideDrawer = <RadSideDrawer>Application.getRootView()
    sideDrawer.showDrawer()
  }

  // Map events
  onMapReady(event): void {
    console.log("Map Ready");

    var mapView = event.object;
    var marker = new gmaps.Marker();
    marker.position = gmaps.Position.positionFromLatLng(-346037, -58.3817);
    marker.title = "Buenos Aires";
    marker.snippet = "Argentina";
    marker.userData= {index : 1};
    mapView.addMartker(marker);
  }

}
