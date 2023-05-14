import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { IDataService } from "../../interfaces/IDataService";
@Injectable({
    providedIn: 'root'
})
export class DatasService extends IDataService {
    public data: any[] = [];
    //loading: boolean = true;

    constructor(private http: HttpClient) {
        super()
    }

    public read(filter: string): void {
        this.fetch(filter).subscribe((data) => {
            this.data = data;
            super.next(data);
            this.loading = false;
        });
    }

    public fetch(filter: string): Observable<any> {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoicm9vdCIsImp0aSI6IjQyYTJiOTFiLWQwMjctNGUyNy1hNmJmLWY1NjJmMTUyNDZhOSIsIkJVSUQiOiIxIiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy9yb2xlIjoiQWRtaW5pc3RyYXRvciIsImV4cCI6MTY4NDA3NDc1MiwiaXNzIjoiaHR0cDovL2xvY2FsaG9zdDo1OTkyMSIsImF1ZCI6Imh0dHA6Ly9sb2NhbGhvc3Q6NDIwMCJ9.00QjItleTqxfteVWs3miefDfY6P9Y_7mmrbN543vJlM"
            })
        };
        return this.http
            .get(`https://bifmcg.bi-technologies.net/SalesBuzzOData/HH_AR_CustomerCategories?${filter}`, httpOptions)
            .pipe(map((data: any) => ({ data: data.value, total: data['@odata.count'] ? data['@odata.count'] : data.value.length })));
    }

    delete(id: string) {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoicm9vdCIsImp0aSI6IjQyYTJiOTFiLWQwMjctNGUyNy1hNmJmLWY1NjJmMTUyNDZhOSIsIkJVSUQiOiIxIiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy9yb2xlIjoiQWRtaW5pc3RyYXRvciIsImV4cCI6MTY4NDA3NDc1MiwiaXNzIjoiaHR0cDovL2xvY2FsaG9zdDo1OTkyMSIsImF1ZCI6Imh0dHA6Ly9sb2NhbGhvc3Q6NDIwMCJ9.00QjItleTqxfteVWs3miefDfY6P9Y_7mmrbN543vJlM"
            })
        };
        return this.http.delete<any>(`https://bifmcg.bi-technologies.net/SalesBuzzOData/HH_AR_CustomerCategories/${id}`, httpOptions)
    }

    add(data: any): Observable<any> {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoicm9vdCIsImp0aSI6IjQyYTJiOTFiLWQwMjctNGUyNy1hNmJmLWY1NjJmMTUyNDZhOSIsIkJVSUQiOiIxIiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy9yb2xlIjoiQWRtaW5pc3RyYXRvciIsImV4cCI6MTY4NDA3NDc1MiwiaXNzIjoiaHR0cDovL2xvY2FsaG9zdDo1OTkyMSIsImF1ZCI6Imh0dHA6Ly9sb2NhbGhvc3Q6NDIwMCJ9.00QjItleTqxfteVWs3miefDfY6P9Y_7mmrbN543vJlM"
            })
        };
        return this.http.post<any>(`https://bifmcg.bi-technologies.net/SalesBuzzOData/HH_AR_CustomerCategories`, data, httpOptions)
    }

    edit(data: any, id: string): Observable<any> {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoicm9vdCIsImp0aSI6IjQyYTJiOTFiLWQwMjctNGUyNy1hNmJmLWY1NjJmMTUyNDZhOSIsIkJVSUQiOiIxIiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy9yb2xlIjoiQWRtaW5pc3RyYXRvciIsImV4cCI6MTY4NDA3NDc1MiwiaXNzIjoiaHR0cDovL2xvY2FsaG9zdDo1OTkyMSIsImF1ZCI6Imh0dHA6Ly9sb2NhbGhvc3Q6NDIwMCJ9.00QjItleTqxfteVWs3miefDfY6P9Y_7mmrbN543vJlM"
            })
        };
        return this.http.put<any>(`https://bifmcg.bi-technologies.net/SalesBuzzOData/HH_AR_CustomerCategories/${id}`, data, httpOptions)
    }
}
