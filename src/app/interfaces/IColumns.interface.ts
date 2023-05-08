import { ValidatorFn } from '@angular/forms';
export interface IColumns {
    name: string,
    type: "boolean" | "text" | "numeric" | "date",
    Validators: ValidatorFn | null,
    disabled: boolean
}