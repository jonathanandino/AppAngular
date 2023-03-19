import { Component, OnInit, EventEmitter, Output, ViewChild, ElementRef } from '@angular/core'
import { RadSideDrawer } from 'nativescript-ui-sidedrawer'
import { Application } from '@nativescript/core'
import {NoticiasService} from "../domain/noticias.service";
import { View, Color } from 'nativescript-pulltorefresh';
import { layout } from 'tns-core-modules/ui/content-view';

@Component({
  selector: 'Search',
  templateUrl: './search.component.html',
})
export class SearchComponent implements OnInit {
  resultados: Array<string>;
  @ViewChild("layout") layout: ElementRef; 

  constructor( public noticias: NoticiasService) {
    // Use the component constructor to inject providers.
  }

  ngOnInit(): void {
    // Init your component properties here.
    this.noticias.agregar("hola");
    this.noticias.agregar("hola 2!");
    this.noticias.agregar("hola  3!");


  
  }

  onDrawerButtonTap(): void {
    const sideDrawer = <RadSideDrawer>Application.getRootView()
    sideDrawer.showDrawer()
  }

  onItemTap(x): void {
    console.dir(x);
  }

  buscarAhora(s:string){
    this.resultados = this.noticias.buscar().filter((x) => x.indexOf(s) >= 0);
 
    /*
    const layout = <View> this.layout.nativeElement;
    layout.animate({
      backgroundColor: new Color("blue"),
      duration: 300,
      delay: 150
    }).then(() => layout.animate({
      backgroundColor: new Color("white"),
      duration: 300,
      delay: 150
    }))
    */
  }
}
