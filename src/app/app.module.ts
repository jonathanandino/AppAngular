import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core'
import { NativeScriptModule } from '@nativescript/angular'
import { NativeScriptUISideDrawerModule } from 'nativescript-ui-sidedrawer/angular'

import {EffectsModule} from "@ngrx/effects";
import {ActionReducerMap, StoreModule as NgRxStoreModule, StoreModule, StoreRootModule} from "@ngrx/store";
import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import {NoticiasService} from "./domain/noticias.service"
import {
        initializeNoticiasState,
        NoticiasEffects,
        NoticiasState,
        reducersNoticias
        } from "./domain/noticias-state.model";

// redux init
//tslint:disable-next-line:interface-name
export interface AppState {
  noticias: NoticiasState;
}

const reducers: ActionReducerMap<AppState> = {
  noticias: reducersNoticias
};

const reducersInitialiState = {
  noticias: initializeNoticiasState()
};
// fin redux init

@NgModule({
  bootstrap: [AppComponent],
  imports: [
          AppRoutingModule, 
          NativeScriptModule, 
          NativeScriptUISideDrawerModule,
          NgRxStoreModule.forRoot(reducers, {initialState: reducersInitialiState}),
          EffectsModule.forRoot([NoticiasEffects])
        ],
  
  providers:[NoticiasService],

  declarations: [AppComponent],
  schemas: [NO_ERRORS_SCHEMA],
})
export class AppModule {}
