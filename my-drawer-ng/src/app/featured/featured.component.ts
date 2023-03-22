import { Component, OnInit } from '@angular/core'
import { RadSideDrawer } from 'nativescript-ui-sidedrawer'
import { Application } from '@nativescript/core'
import { GestureEventData } from 'tns-core-modules'
import { GridLayout} from "tns-core-modules/ui/layouts/grid-layout"

@Component({
  selector: 'Featured',
  templateUrl: './featured.component.html',
})
export class FeaturedComponent implements OnInit {
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
  onLongPress(args: GestureEventData) {
    console.log("Object that triggered teh event: " + args.object);
    console.log("View that triggered the event: " + args.view);
    console.log("Event name: " + args.eventName);

    const grid = <GridLayout>args.object;
    grid.rotate = 0;
    grid.animate({
      rotate: 360,
      duration: 2000
    });
  }

}
