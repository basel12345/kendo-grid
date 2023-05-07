import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DatasService extends BehaviorSubject<any[]> {
  public data: any[] = [];
  loading: boolean = true;

  constructor(private http: HttpClient) {
    super([]);
  }

  public read(): void {
    this.fetch().subscribe((data) => {
      this.data = data;
      super.next(data);
      this.loading = false;
    });
  }

  public fetch(): Observable<any[]> {
    return this.http
      .get(`https://demos.telerik.com/kendo-ui/service-v4/odata/Products/`)
      .pipe(map((data: any) => <any[]>data.value));
  }
}
