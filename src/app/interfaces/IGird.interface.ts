import { Observable } from "rxjs";

export interface IGrid<T> {
    DataService: any,
    GridData: Observable<T>,
    Columns: Object,
    SelectedRowChanged: () => void;
    GetGridData: () => void;
    BeforeAction: () => void;
    
    AddRow: () => void;
    DeleteRow: () => void;
    Cancel: () => void;
    Save: () => void;
}