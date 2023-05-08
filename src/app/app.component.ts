import { IColumns } from './interfaces/IColumns.interface';
import { Component } from '@angular/core';
import { DatasService } from './Shared/services/data.service';
import { Validators } from '@angular/forms';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent {
	columns: IColumns[] = [
		{ name: "ProductID", type: "numeric", Validators: null, disabled: false },
		{ name: "ProductName", type: "text", Validators: Validators.required, disabled: false },
		{ name: "UnitPrice", type: "numeric", Validators: null, disabled: false },
		{ name: "Discontinued", type: "text", Validators: null, disabled: false },
		{
			name: "UnitsInStock", type: "numeric", Validators: Validators.compose([
				Validators.required,
				Validators.pattern("^[0-9]{1,3}"),
			]), disabled: false
		}
	];
	dataItem: any;
	constructor(public dataService: DatasService) { }
	title = 'kendo-grid';

	getRowGrid(event: any) {
		this.dataItem = event.dataItem;
	}

	beforeAction() {
		
	}
}
