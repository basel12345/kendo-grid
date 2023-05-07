import { AfterViewInit, Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { CreateFormGroupArgs, GridComponent, GridDataResult, GridItem } from '@progress/kendo-angular-grid';
import { Observable, map } from 'rxjs';
import { IGrid } from 'src/app/interfaces/IGird.interface';
import { DatasService } from '../../services/data.service';
import { State, process } from "@progress/kendo-data-query";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Product } from 'src/app/class/product';
const matches = (el: any, selector: any) => (el.matches || el.msMatchesSelector).call(el, selector);

@Component({
	selector: 'app-igrid',
	templateUrl: './igrid.component.html',
	styleUrls: ['./igrid.component.css']
})
export class IGridComponent implements IGrid, OnInit {

	formGroup!: FormGroup;
	@ViewChild("Grid") Mygrid!: GridComponent;
	gridData!: Observable<GridDataResult>;
	state: State = { skip: 0, take: 5 };
	rowIndex!: number;
	// docClickSubscription: () => void;
	constructor(
		public dataService: DatasService,
		private formBuilder: FormBuilder,
		private renderer: Renderer2
	) { }

	ngOnInit(): void {
		this.gridData = this.dataService.pipe(
			map((data) => {
				return process(data, this.state)
			}),
		);
		this.dataService.read();
		this.createFormGroup = this.createFormGroup.bind(this);
		// this.docClickSubscription = this.renderer.listen('document', 'click', this.onDocumentClick.bind(this));

	}

	// private onDocumentClick(e: any): void {
	// 	if (this.formGroup && this.formGroup.valid &&
	// 		!matches(e.target, '#productsGrid tbody *, #productsGrid .k-grid-toolbar .k-button')) {
	// 		this.saveCurrent();
	// 	}
	// }

	public createFormGroup(args: CreateFormGroupArgs | any): FormGroup {
		this.rowIndex = args.rowIndex;
		const item = !isNaN(args.rowIndex) ? args.dataItem : new Product();
		this.formGroup = this.formBuilder.group({
			ProductID: item.ProductID,
			ProductName: [item.ProductName, Validators.required],
			UnitPrice: item.UnitPrice,
			UnitsInStock: [
				item.UnitsInStock,
				Validators.compose([
					Validators.required,
					Validators.pattern("^[0-9]{1,3}"),
				]),
			],
			Discontinued: item.Discontinued,
		});
		return this.formGroup;
	}


	onStateChange(state: State): void {
		this.state = state;
		this.dataService.read();
	}

	public trackByItem(index: number, item: GridItem): any {
		return item.data;
	}

	SelectedRowChanged() { }
	BeforeAction() { }
	AddRow() {
		this.Mygrid.addRow(this.createFormGroup(new Product()));
	}
	DeleteRow() { }
	Cancel() {
		this.dataService.read()
		this.Mygrid.cancelCell()
	}
	Save() {
		if (isNaN(this.rowIndex)) {
			// Save Create
			if (this.formGroup.valid) {
				this.dataService.data.unshift(this.formGroup.value);
				this.Mygrid.closeRow();
				this.gridData = this.dataService.pipe(
					map((data) => process(data, this.state))
				);
			}
		} else {
			// Save Update
		}

	}

}