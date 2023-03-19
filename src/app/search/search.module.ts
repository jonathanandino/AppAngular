import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core'
import { NativeScriptCommonModule, NativeScriptFormsModule } from '@nativescript/angular'

import {NoticiasService} from "../domain/noticias.service"
import { SearchRoutingModule } from './search-routing.module'
import { SearchComponent } from './search.component'
import {SearchFormComponent} from './search-form.component'
import { MinLenDirective } from "./minlen.validator"; 


@NgModule({
  imports: [NativeScriptCommonModule, SearchRoutingModule, NativeScriptFormsModule],
  
  declarations: [SearchComponent, SearchFormComponent, MinLenDirective],
  //providers:[NoticiasService],

  schemas: [NO_ERRORS_SCHEMA],
})
export class SearchModule {}