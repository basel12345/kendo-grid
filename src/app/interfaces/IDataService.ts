import { Injectable, forwardRef } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { DatasService } from "../Shared/services/data.service";

export abstract class IDataService extends BehaviorSubject<any[]> {
    constructor()
    {
        super([])
    }
    abstract edit(data: any, id: string): Observable<any>;
    abstract add(data: any): Observable<any>;
    abstract delete(id: string): Observable<any>;
    abstract read(filter: string): void;
    abstract fetch(filter: string): Observable<any>;
    loading: boolean = true;
}