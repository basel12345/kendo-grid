import { ValidatorFn } from '@angular/forms';
import { DataType } from '../emuns/DataType';
export interface IColumns {
    Validators: ValidatorFn | null,
    Name: string,
    DisplayName: string,
    DataType: DataType,
    IsEditable: boolean,
    IsFilterable: boolean,
    DefaultValue: string | null,
    controlType: any,
    viewCellStyle: string
}