import { Component, ElementRef, Input } from '@angular/core';
import { INav } from "../../../interfaces/inav";
import { IGridComponent } from '../igrid/igrid.component';
import { IGrid } from 'src/app/interfaces/IGird.interface';


@Component({
  selector: 'BI-Nav',
  templateUrl: 'bi-nav.component.html',
  styleUrls: ['bi-nav.component.scss']
})
export class BiNavComponent implements INav {
  @Input() BIGrid!:IGrid;


  /**
   * add new row to the grid
   * @return void
   */
  AddRow(): void {
    console.log(this.BIGrid);
    
    this.BIGrid.AddRow();
  };
  /**
   * delete row from the grid
   * @return void
   */
  DeleteRow(): void {
    this.BIGrid.DeleteRow();
  };
  /**
   * cancel edits in any cell
   * @return void
   */
  Cancel(): void {
    this.BIGrid.Cancel();
  };
  /**
   * save edits in any cell
   * @return void
   */
  Save(): void {
    this.BIGrid.Save();
  };
}
