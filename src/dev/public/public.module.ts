import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
import { HttpModule } from '@angular/http';

import { PublicRoutingModule } from './public-routing.module';
import { HomeComponent } from './home/home.component';
import { RequestService } from '../services/request.services';

@NgModule({
  imports: [
    CommonModule,
    PublicRoutingModule,
    NgbModule,
    FormsModule,
    HttpModule,
    ReactiveFormsModule
  ],
  declarations: [HomeComponent],
  providers:[RequestService]
})
export class PublicModule { }
