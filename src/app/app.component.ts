import { IColumns } from './interfaces/IColumns.interface';
import { Component, ViewChild } from '@angular/core';
import { DatasService } from './Shared/services/data.service';
import { Validators } from '@angular/forms';
import { DataType } from './emuns/DataType';
import { IGridComponent } from './Shared/components/igrid/igrid.component';
import Swal from 'sweetalert2';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent {
	columns: IColumns[] = [
		{ DisplayName: "CategoryId", Name: "CategoryId", DataType: DataType.Text, Validators: null, IsEditable: true, IsFilterable: true, DefaultValue: null, controlType: "", viewCellStyle: "" },
		{ DisplayName: "Description", Name: "Description", DataType: DataType.Text, Validators: Validators.required, IsEditable: true, IsFilterable: true, DefaultValue: null, controlType: "", viewCellStyle: "" },
		{ DisplayName: "ArabicDescription", Name: "ArabicDescription", DataType: DataType.Text, Validators: null, IsEditable: true, IsFilterable: true, DefaultValue: null, controlType: "", viewCellStyle: "" },
		{ DisplayName: "SalesTypeID", Name: "SalesTypeID", DataType: DataType.Text, Validators: null, IsEditable: true, IsFilterable: true, DefaultValue: null, controlType: "", viewCellStyle: "" },
		{ DisplayName: "rowguid", Name: "rowguid", DataType: DataType.Text, Validators: null, IsEditable: false, IsFilterable: true, DefaultValue: null, controlType: "", viewCellStyle: "" }
	]
	dataItem: any;
	@ViewChild(IGridComponent) IGridComp!: IGridComponent;
	constructor(public dataService: DatasService) {
		console.log(this.IGridComp);
	}
	ngAfterViewInit() {
		this.IGridComp.BeforeAction = () => {
			
		}
	}
	title = 'kendo-grid';
	getRowGrid(event: any) {
		this.dataItem = event.dataItem;
	}
}
