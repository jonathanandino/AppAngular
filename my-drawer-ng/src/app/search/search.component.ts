import { Component, OnInit, EventEmitter, Output, ViewChild, ElementRef} from '@angular/core'
import {Store} from "@ngrx/store"
import * as SocialShare from "nativescript-social-share"
import { RadSideDrawer } from 'nativescript-ui-sidedrawer'
import { Application } from '@nativescript/core'
import {NoticiasService} from "../domain/noticias.service";
import { View, Color } from 'nativescript-pulltorefresh';
import { layout } from 'tns-core-modules/ui/content-view';
import { NgIfContext } from '@angular/common';
import { getNativeApplication } from '@nativescript/core/application';
//import Toast from "nativescript-android-toast";
import { AppState } from '../app.module';
import { Noticia, NuevaNoticiaAction } from '../domain/noticias-state.model';
//import { Toasty } from 'nativescript-toasty';



@Component({
  selector: 'Search',
  templateUrl: './search.component.html',
})
export class SearchComponent implements OnInit {
  resultados: Array<string>;
  @ViewChild("layout") layout: ElementRef; 

  constructor( public noticias: NoticiasService,
                private store: Store<AppState>) {
    // Use the component constructor to inject providers.
  }

  ngOnInit(): void {
    // Init your component properties here.
    this.store.select((state) => state.noticias.sugerida)
      .subscribe((data) => {
        const f = data;
        if (f != null) {
          console.log("suggerimos leer: " + f.titulo);
          //Toast.show({text: "sugerimos leer: " + f.titulo, duration: Toast.DURATION.SHORT}); 
          //const toast = new Toasty({ text: 'Toast message' });
          //toast.show();
    

        }
      })
  
  }

  onDrawerButtonTap(): void {
    const sideDrawer = <RadSideDrawer>Application.getRootView()
    sideDrawer.showDrawer()
  }

  onItemTap(args): void {
    this.store.dispatch(new NuevaNoticiaAction( new Noticia(args.view.bindingContext)));

  }

  onLongPress(s): void{
    console.log(s);
    SocialShare.shareText(s, "Asunto: compartido desde el curso!");
  }

  buscarAhora(s:string){
    console.dir("buscarAh" + s);
    this.noticias.buscar(s).then((r: any) => {
      console.log("resultados buscarAhora: " + JSON.stringify(r));
      this.resultados = r;
    }, (e) => {
      console.log("error buscarAhora: " + e);
      
      //Toast.show({text: "Error en la busqueda", duration: ToastDuration.DURATION.SHORT});
    });
  }
}
