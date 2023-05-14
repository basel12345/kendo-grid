import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Table } from 'primeng/table';
import { Observable } from 'rxjs';
import { IColumns } from 'src/app/interfaces/IColumns.interface';
import { IDataService } from 'src/app/interfaces/IDataService';
import { IGrid } from 'src/app/interfaces/IGird.interface';
import { AlertService } from "@full-fledged/alerts";
@Component({
    selector: 'app-bi-prime-grid',
    templateUrl: './bi-prime-grid.component.html',
    styleUrls: ['./bi-prime-grid.component.scss']
})
export class BIPrimeGridComponent implements IGrid, OnInit {
    @Input() DataService!: IDataService;
    @Input() Columns!: IColumns[];
    @ViewChild('dt1') dt1!: Table;
    @Input() Key!: string;
    data!: any[];
    rowIndex: any;
    GridData!: Observable<any>;
    dataItem: any = {};
    formGrid!: FormGroup;
    form: any = {};
    isNewMode: boolean = true;
    constructor(private formBuilder: FormBuilder, private alertService: AlertService
    ) { }

    ngOnInit() {
        this.DataService.read(`$skip=${0}&$top=10&$count=true`);
        this.GetGridData();
        this.handleFormGroup()
        this.formGrid = this.formBuilder.group(this.form);
    }


    SelectedRowChanged(index?: number, dataItem?: any) {
        if (index) this.rowIndex = index;
        if (dataItem) this.dataItem = dataItem;
        if (Object.keys(this.dataItem).length > 0) this.formGrid.patchValue(this.dataItem);
    }

    GetGridData() {
        this.GridData = this.DataService;
        this.GridData.subscribe((res: any) => {
            this.data = res['data']
        });
    };

    handleFormGroup() {
        this.Columns.forEach(res => this.form[res.Name] = [{ value: res.DefaultValue, disabled: !res.IsEditable }, res.Validators]);
    }

    AddRow() {
        this.formGrid.reset()
        this.rowIndex = null;
        this.dataItem = null;
        this.formGrid.markAllAsTouched();
        this.dt1.value.unshift(this.formGrid);
        // this.dt1.editingRowKeys[this.formGrid.value[this.dt1.dataKey]] = true;
        this.isNewMode = true
    }

    Save() {
        this.BeforeAction();
        if ((this.rowIndex === 0 && this.isNewMode) || isNaN(this.rowIndex)) {
            // Save Create
            if (this.formGrid?.valid) {
                this.DataService.add(this.formGrid.value).subscribe((res: any) => {
                    this.GetGridData();
                    this.handleFormGroup();
                    this.alertService.success("Saved Successfully");
                });
                this.isNewMode = false;
            };
        } else {
            // Save Update
            if (this.formGrid?.valid) {
                this.DataService.edit(this.formGrid.value, this.formGrid.value[this.Key]).subscribe((res: any) => {
                    this.DataService.read(`$skip=${0}&$top=10&$count=true`);
                    this.GetGridData();
                    this.handleFormGroup();
                    this.alertService.success("Saved Successfully");
                });
            };
        };
    }

    Cancel() {
        this.DataService.read(`$skip=${0}&$top=10&$count=true`);
        this.GetGridData();
        this.rowIndex = null;
        this.dataItem = null;
    }

    BeforeAction() {

    }

    DeleteRow() {
        this.DataService.delete(this.dataItem[this.Key]).subscribe((res: any) => {
            this.DataService.read(`$skip=${0}&$top=10&$count=true`);
            this.GetGridData();
            this.alertService.success("Deleted Successfully");
        });
    }

}
