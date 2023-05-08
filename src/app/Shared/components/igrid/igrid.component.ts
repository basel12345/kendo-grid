import { Component, Input, OnInit, Output, ViewChild, EventEmitter } from '@angular/core';
import { CellClickEvent, CreateFormGroupArgs, GridComponent, GridDataResult, GridItem, PageChangeEvent } from '@progress/kendo-angular-grid';
import { Observable, map, of } from 'rxjs';
import { IGrid } from 'src/app/interfaces/IGird.interface';
import { State } from "@progress/kendo-data-query";
import { FormBuilder, FormGroup } from '@angular/forms';
import { Product } from 'src/app/class/product';
import { AfterViewInit } from '@angular/core';
import { IColumns } from 'src/app/interfaces/IColumns.interface';

@Component({
	selector: 'app-igrid',
	templateUrl: './igrid.component.html',
	styleUrls: ['./igrid.component.css']
})
export class IGridComponent implements IGrid<GridDataResult>, OnInit, AfterViewInit {
	@Input() public DataService: any;
	@Input() Columns!: IColumns[];
	@Output() CellClick = new EventEmitter<CellClickEvent>();
	@ViewChild("Grid") Mygrid!: GridComponent;
	form: any = {};
	formGroup!: FormGroup;
	GridData!: Observable<GridDataResult>;
	state: State = { skip: 0, take: 10 };
	rowIndex!: number;
	dataItem!: any;
	constructor(
		private formBuilder: FormBuilder
	) { }

	ngOnInit(): void {
		this.GetGridData();
		this.DataService.read(this.state.skip);
		this.createFormGroup = this.createFormGroup.bind(this);
	}

	ngAfterViewInit() {
		this.SelectedRowChanged();
		this.Columns.forEach(res => this.form[res.Name] = [{ value: "", disabled: !res.IsEditable }, res.Validators]);
	}

	createFormGroup(args: CreateFormGroupArgs | any): FormGroup {
		this.rowIndex = args.rowIndex;
		const item = !isNaN(args.rowIndex) ? args.dataItem : new Product();
		this.formGroup = this.formBuilder.group(this.form);
		this.formGroup.patchValue(item)
		return this.formGroup;
	}

	GetGridData() {
		this.GridData = this.DataService;
	}

	BeforeAction() {
	}

	public pageChange(event: PageChangeEvent): void {
		this.state.skip = event.skip;
		this.DataService.read(this.state.skip);
		this.GetGridData()
	}

	public trackByItem(index: number, item: GridItem): any {
		return item.data;
	}

	SelectedRowChanged() {
		this.Mygrid.cellClick.subscribe((res: any) => {
			this.dataItem = res?.['dataItem'];
			this.CellClick.emit(res);
		});
	}

	AddRow() {
		this.Mygrid.addRow(this.createFormGroup(new Product()));
	}

	DeleteRow() {
		this.DataService.delete(this.dataItem.CategoryId).subscribe((res: any) => {
			this.DataService.read(this.state.skip)
			this.GetGridData()
		})
	}

	onValueChange(e: any) {
		console.log(e)
	}

	Cancel() {
		this.DataService.read(this.state.skip);
		this.Mygrid.cancelCell();
	}

	Save() {
		this.BeforeAction();
		if (isNaN(this.rowIndex)) {
			// Save Create
			this.DataService.add(this.formGroup.value).subscribe((res: any) => {
				if (this.formGroup?.valid) {
					this.DataService.data['data'].unshift(this.formGroup.value);
					this.Mygrid.closeRow();
					this.GetGridData();
				};
			});
		} else {
			// Save Update
			this.DataService.edit(this.formGroup.value, this.formGroup.value.CategoryId).subscribe((res: any) => {
				if (this.formGroup?.valid) {
					this.GetGridData();
				}
			})
		}
	}

}