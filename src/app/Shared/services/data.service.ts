import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map, skip } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DatasService extends BehaviorSubject<any[]> {
  public data: any[] = [];
  loading: boolean = true;

  constructor(private http: HttpClient) {
    super([]);
  }

  public read(skip: number): void {
    this.fetch(skip).subscribe((data) => {
      this.data = data;
      console.log(this.data);
      
      super.next(data);
      this.loading = false;
    });
  }

  public fetch(skip: number): Observable<any[]> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoicm9vdCIsImp0aSI6ImUxNDgzNjc1LTEzYWMtNGEyNy1hYzJiLTA0NWM3ZmRlZWU3ZSIsIkJVSUQiOiIxIiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy9yb2xlIjoiQWRtaW5pc3RyYXRvciIsImV4cCI6MTY4MzU2NDY1OSwiaXNzIjoiaHR0cDovL2xvY2FsaG9zdDo1OTkyMSIsImF1ZCI6Imh0dHA6Ly9sb2NhbGhvc3Q6NDIwMCJ9.b3OdGglsAamrQEwez2-pGerQ4a1j63ZiM5Kaj6vgyeA"
      })
    };
    return this.http
      .get(`https://bifmcg.bi-technologies.net/SalesBuzzOData/HH_AR_CustomerCategories?$skip=${skip}&$top=10&$count=true`, httpOptions)
      .pipe(map((data: any) => <any[]>data.value));
  }
}
