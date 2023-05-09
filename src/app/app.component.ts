import { IColumns } from './interfaces/IColumns.interface';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { Validators } from '@angular/forms';
import { DataType } from './emuns/DataType';
import { IGridComponent } from './Shared/components/igrid/igrid.component';
import { IDataService } from './interfaces/IDataService';
import { IGrid } from './interfaces/IGird.interface';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent {
	columns: IColumns[] = [
		{ DisplayName: "CategoryId", Name: "CategoryId", DataType: DataType.Text, Validators: null, IsEditable: true, IsFilterable: true, DefaultValue: null, controlType: "", viewCellStyle: "", IsVisible: true },
		{ DisplayName: "Description", Name: "Description", DataType: DataType.Text, Validators: Validators.required, IsEditable: true, IsFilterable: true, DefaultValue: null, controlType: "", viewCellStyle: "", IsVisible: true },
		{ DisplayName: "ArabicDescription", Name: "ArabicDescription", DataType: DataType.Text, Validators: null, IsEditable: true, IsFilterable: true, DefaultValue: null, controlType: "", viewCellStyle: "", IsVisible: true },
		{ DisplayName: "SalesTypeID", Name: "SalesTypeID", DataType: DataType.Text, Validators: Validators.required, IsEditable: true, IsFilterable: true, DefaultValue: null, controlType: "", viewCellStyle: "", IsVisible: true },
		{ DisplayName: "rowguid", Name: "rowguid", DataType: DataType.Text, Validators: null, IsEditable: true, IsFilterable: true, DefaultValue: null, controlType: "", viewCellStyle: "", IsVisible: false }
	]
	dataItem: any;
	@ViewChild(IGridComponent) BIGrid!:IGrid;
	constructor(public dataService: IDataService) {
		console.log(this.dataService);
		
	}
	ngAfterViewInit() {
		this.BIGrid.BeforeAction = () => { }
	}
	title = 'kendo-grid';
	getRowGrid(event: any) {
		this.dataItem = event.dataItem;
	}
}
