import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { DateInputsModule } from '@progress/kendo-angular-dateinputs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { IGridComponent } from './Shared/components/igrid/igrid.component';
import { GridModule } from '@progress/kendo-angular-grid';

import { HttpClient, HttpClientModule } from "@angular/common/http";
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    IGridComponent,
  ],
  imports: [
    BrowserModule,
    DateInputsModule,
    BrowserAnimationsModule,
    GridModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
