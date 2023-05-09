import { Component, Input, OnInit, Output, ViewChild, EventEmitter } from '@angular/core';
import { CellClickEvent, CreateFormGroupArgs, GridComponent, GridDataResult, GridItem, PageChangeEvent } from '@progress/kendo-angular-grid';
import { Observable } from 'rxjs';
import { IGrid } from 'src/app/interfaces/IGird.interface';
import { State, toODataString } from "@progress/kendo-data-query";
import { FormBuilder, FormGroup } from '@angular/forms';
import { AfterViewInit } from '@angular/core';
import { IColumns } from 'src/app/interfaces/IColumns.interface';
import { AlertService } from '@full-fledged/alerts';
import { IDataService } from 'src/app/interfaces/IDataService';
// type gridDataType = Observable<GridDataResult> | IDataService<GridDataResult>
@Component({
	selector: 'app-igrid',
	templateUrl: './igrid.component.html',
	styleUrls: ['./igrid.component.css']
})
export class IGridComponent implements IGrid, OnInit, AfterViewInit {
	@Input() public DataService!: IDataService;
	@Input() Columns!: IColumns[];
	@Input() Key!: string;
	@Output() CellClick = new EventEmitter<CellClickEvent>();
	@ViewChild("Grid") Mygrid!: GridComponent;
	form: any = {};
	formGroup!: FormGroup;
	GridData!: Observable<any>;
	state: State = { skip: 0, take: 10 };
	rowIndex!: number;
	dataItem!: any;
	data: any;
	newForm: any = {};
	constructor(
		private formBuilder: FormBuilder,
		private alertService: AlertService
	) { }

	ngOnInit(): void {
		this.GetGridData();
		this.DataService.read(`$skip=${this.state.skip}&$top=10&$count=true`);
		this.createFormGroup = this.createFormGroup.bind(this);
	}

	ngAfterViewInit() {
		this.SelectedRowChanged();
		this.handleFormGroup();
	}

	handleFormGroup() {
		this.Columns.forEach(res => this.form[res.Name] = [{ value: res.DefaultValue, disabled: !res.IsEditable }, res.Validators]);
	}


	createFormGroup(args: CreateFormGroupArgs | any): FormGroup {
		this.rowIndex = args.rowIndex;
		const item = args.dataItem;
		this.formGroup = this.formBuilder.group(this.form);
		this.formGroup.patchValue(item)
		return this.formGroup;
	}

	GetGridData() {
		this.GridData = this.DataService;
		this.GridData.subscribe((res: any) => {
			this.data = res;
		});
	}

	BeforeAction() {
	}

	public pageChange(event: PageChangeEvent): void {
		this.state.skip = event.skip;
		this.DataService.read(`$skip=${this.state.skip}&$top=10&$count=true`);
		this.GetGridData();
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
		this.Mygrid.addRow(this.createFormGroup(this.newForm));
	}

	DeleteRow() {
		this.DataService.delete(this.dataItem[this.Key]).subscribe((res: any) => {
			this.DataService.read(`$skip=${this.state.skip}&$top=10&$count=true`);
			this.GetGridData();
			this.alertService.success("Deleted Successfully");
		});
	};

	public cellClickHandler(args: CellClickEvent): void {
		if (!args.isEdited) {
			args.sender.editCell(
				args.rowIndex,
				args.columnIndex,
				this.createFormGroup(args)
			);
		}
	}

	onValueChange(e: any) {
		this.DataService.read(toODataString(e) + '&$count=true');
		this.GetGridData();
	}

	Cancel() {
		this.DataService.read(`$skip=${this.state.skip}&$top=10&$count=true`);
		this.GetGridData();
		this.Mygrid.closeRow(this.rowIndex);
	}

	Save() {
		this.BeforeAction();
		if (isNaN(this.rowIndex)) {
			// Save Create
			if (this.formGroup?.valid) {
				this.DataService.add(this.formGroup.value).subscribe((res: any) => {
					this.data['data'].push(this.formGroup.value);
					this.Mygrid.closeRow();
					this.GetGridData();
					this.handleFormGroup();
					this.alertService.success("Saved Successfully");
				});
			};
		} else {
			// Save Update
			if (this.formGroup?.valid) {
				this.DataService.edit(this.formGroup.value, this.formGroup.value[this.Key]).subscribe((res: any) => {
					this.Mygrid.closeRow(this.rowIndex);
					this.DataService.read(`$skip=${this.state.skip}&$top=10&$count=true`);
					this.GetGridData();
					this.handleFormGroup();
					this.alertService.success("Saved Successfully");
				});
			};
		};
	}

}