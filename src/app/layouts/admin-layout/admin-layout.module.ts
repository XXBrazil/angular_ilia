import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { AdminLayoutRoutes } from './admin-layout.routing';
import { TablesComponent } from '../../pages/tables/tables.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {NgxDatatableModule} from '@swimlane/ngx-datatable';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    HttpClientModule,
    NgbModule,
    ReactiveFormsModule,
    NgxDatatableModule,
  ],
  declarations: [
    TablesComponent,
  ]
})
export class AdminLayoutModule {}
