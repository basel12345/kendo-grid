import { GridDataResult, GridItem } from "@progress/kendo-angular-grid";
import { State } from "@progress/kendo-data-query";
import { Observable } from "rxjs";

export interface IGrid {
    gridData: Observable<GridDataResult>,
    onStateChange: (state: State) => void;
    SelectedRowChanged: () => void;
    trackByItem: (index: number, item: GridItem) => void;
    BeforeAction: () => void;
    AddRow: () => void;
    DeleteRow: () => void;
    Cancel: () => void;
    Save: () => void;
}