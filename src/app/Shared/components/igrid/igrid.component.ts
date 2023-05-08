import { Component, Input, OnInit, Output, ViewChild, EventEmitter } from '@angular/core';
import { CellClickEvent, CreateFormGroupArgs, GridComponent, GridDataResult, GridItem } from '@progress/kendo-angular-grid';
import { Observable, map } from 'rxjs';
import { IGrid } from 'src/app/interfaces/IGird.interface';
import { State, process } from "@progress/kendo-data-query";
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
	@Input() BeforeAction!: () => void;
	@Output() CellClick = new EventEmitter<CellClickEvent>();
	form: any = {};
	@ViewChild("Grid") Mygrid!: GridComponent;
	formGroup!: FormGroup;
	GridData!: Observable<GridDataResult>;
	state: State = { skip: 0, take: 5 };
	rowIndex!: number;
	dataItem!: any;
	constructor(
		private formBuilder: FormBuilder
	) { }

	ngOnInit(): void {
		this.GetGridData();
		this.DataService.read();
		this.createFormGroup = this.createFormGroup.bind(this);
	}

	ngAfterViewInit() {
		this.SelectedRowChanged();
		this.Columns.forEach(res => this.form[res.name] = [{ value: "", disabled: res.disabled }, res.Validators]);
	}

	createFormGroup(args: CreateFormGroupArgs | any): FormGroup {
		this.rowIndex = args.rowIndex;
		const item = !isNaN(args.rowIndex) ? args.dataItem : new Product();
		this.formGroup = this.formBuilder.group(this.form);
		this.formGroup.patchValue(item)
		return this.formGroup;
	}

	GetGridData() {
		this.GridData = this.DataService.pipe(
			map((data) => {
				return process(Array.isArray(data) ? data : [data], this.state)
			}),
		);
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
	}

	Cancel() {
		this.DataService.read();
		this.Mygrid.cancelCell();
	}

	Save() {
		if (isNaN(this.rowIndex)) {
			// Save Create
			if (this.formGroup.valid) {
				this.DataService.data.unshift(this.formGroup.value);
				this.Mygrid.closeRow();
				this.GetGridData();
			}
		} else {
			// Save Update
		}

	}

}