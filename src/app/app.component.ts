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
		{ name: "CategoryId", type: "numeric" },
		{ name: "Description", type: "text" },
		{ name: "ArabicDescription", type: "text" },
		{ name: "SalesTypeID", type: "text" }
	]
	form = {
		CategoryId: "",
		Description: ["", Validators.required],
		ArabicDescription: "",
		SalesTypeID: ""
	}
	dataItem: any;
	constructor(public dataService: DatasService) { }
	title = 'kendo-grid';
// this.grid.BeforeAction=>(i,d,u){  }
	getRowGrid(event: any) {
		this.dataItem = event.dataItem;
	}
	
}
