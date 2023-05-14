import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { DateInputsModule } from '@progress/kendo-angular-dateinputs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { IGridComponent } from './Shared/components/igrid/igrid.component';
import { GridModule } from '@progress/kendo-angular-grid';

import { HttpClientModule } from "@angular/common/http";
import { ReactiveFormsModule } from '@angular/forms';
import { PagerModule } from '@progress/kendo-angular-pager';
import { FilterModule } from '@progress/kendo-angular-filter';
import { AlertModule } from '@full-fledged/alerts';
import { ButtonModule } from '@progress/kendo-angular-buttons';
import { BiNavComponent } from './Shared/components/BI-Nav/bi-nav.component';
import { IDataService } from './interfaces/IDataService';
import { DatasService } from './Shared/services/data.service';
import { PrimeMdule } from './Shared/components/Prime/prime.module';

@NgModule({
  declarations: [
    AppComponent,
    IGridComponent,
    BiNavComponent
  ],
  imports: [
    BrowserModule,
    DateInputsModule,
    BrowserAnimationsModule,
    GridModule,
    HttpClientModule,
    ReactiveFormsModule,
    PagerModule,
    FilterModule,
    AlertModule.forRoot({ maxMessages: 5, timeout: 5000, positionY: "top" }),
    PrimeMdule,
    ButtonModule
  ],
  providers: [
    {
      provide: IDataService,
      useClass: DatasService
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
