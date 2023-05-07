import { Component } from '@angular/core';
import { DatasService } from './Shared/services/data.service';
import { Validators } from '@angular/forms';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent {
	columns = [
		{ name: "ProductID", type: "numeric" },
		{ name: "ProductName", type: "text" },
		{ name: "UnitPrice", type: "numeric" },
		{ name: "Discontinued", type: "checkbox" },
		{ name: "UnitsInStock", type: "numeric" }
	]
	form = {
		ProductID: "",
		ProductName: ["", Validators.required],
		UnitPrice: "",
		UnitsInStock: [
			"",
			Validators.compose([
				Validators.required,
				Validators.pattern("^[0-9]{1,3}"),
			]),
		],
		Discontinued: ""
	}
	dataItem: any;
	constructor(public dataService: DatasService) { }
	title = 'kendo-grid';

	getRowGrid(event: any) {
		this.dataItem = event.dataItem;
	}
}
