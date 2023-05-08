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
            super.next(data);
            this.loading = false;
        });
    }

    public fetch(skip: number): Observable<any> {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoicm9vdCIsImp0aSI6ImI2ZGM4ZDhjLWJmNmQtNGI3Ni04OGZhLTQ3OWEzNWY3NWQwYyIsIkJVSUQiOiIxIiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy9yb2xlIjoiQWRtaW5pc3RyYXRvciIsImV4cCI6MTY4MzU4ODc1OSwiaXNzIjoiaHR0cDovL2xvY2FsaG9zdDo1OTkyMSIsImF1ZCI6Imh0dHA6Ly9sb2NhbGhvc3Q6NDIwMCJ9.hlYRN7xtI5DRWz2S7ddig8KJHCLaXkPLC8b9kHxjQqU"
            })
        };
        return this.http
            .get(`https://bifmcg.bi-technologies.net/SalesBuzzOData/HH_AR_CustomerCategories?$skip=${skip}&$top=10&$count=true`, httpOptions)
            .pipe(map((data: any) => ({data: data.value, total: data['@odata.count']})));
    }

    delete(id: any) {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoicm9vdCIsImp0aSI6ImI2ZGM4ZDhjLWJmNmQtNGI3Ni04OGZhLTQ3OWEzNWY3NWQwYyIsIkJVSUQiOiIxIiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy9yb2xlIjoiQWRtaW5pc3RyYXRvciIsImV4cCI6MTY4MzU4ODc1OSwiaXNzIjoiaHR0cDovL2xvY2FsaG9zdDo1OTkyMSIsImF1ZCI6Imh0dHA6Ly9sb2NhbGhvc3Q6NDIwMCJ9.hlYRN7xtI5DRWz2S7ddig8KJHCLaXkPLC8b9kHxjQqU"
            })
        };
        return this.http.delete<any>(`https://bifmcg.bi-technologies.net/SalesBuzzOData/HH_AR_CustomerCategories/${id}`, httpOptions)
    }

    add(data: any): Observable<any> {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoicm9vdCIsImp0aSI6ImI2ZGM4ZDhjLWJmNmQtNGI3Ni04OGZhLTQ3OWEzNWY3NWQwYyIsIkJVSUQiOiIxIiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy9yb2xlIjoiQWRtaW5pc3RyYXRvciIsImV4cCI6MTY4MzU4ODc1OSwiaXNzIjoiaHR0cDovL2xvY2FsaG9zdDo1OTkyMSIsImF1ZCI6Imh0dHA6Ly9sb2NhbGhvc3Q6NDIwMCJ9.hlYRN7xtI5DRWz2S7ddig8KJHCLaXkPLC8b9kHxjQqU"
            })
        };
        return this.http.post<any>(`https://bifmcg.bi-technologies.net/SalesBuzzOData/HH_AR_CustomerCategories`, data, httpOptions)
    }

    edit(data: any, id: any): Observable<any> {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoicm9vdCIsImp0aSI6ImI2ZGM4ZDhjLWJmNmQtNGI3Ni04OGZhLTQ3OWEzNWY3NWQwYyIsIkJVSUQiOiIxIiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy9yb2xlIjoiQWRtaW5pc3RyYXRvciIsImV4cCI6MTY4MzU4ODc1OSwiaXNzIjoiaHR0cDovL2xvY2FsaG9zdDo1OTkyMSIsImF1ZCI6Imh0dHA6Ly9sb2NhbGhvc3Q6NDIwMCJ9.hlYRN7xtI5DRWz2S7ddig8KJHCLaXkPLC8b9kHxjQqU"
            })
        };
        return this.http.put<any>(`https://bifmcg.bi-technologies.net/SalesBuzzOData/HH_AR_CustomerCategories/${id}`, data, httpOptions)
    }
}
