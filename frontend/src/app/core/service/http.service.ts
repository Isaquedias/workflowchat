import { Injectable } from "@angular/core";
import { HttpClient, HttpEventType, HttpHeaders, HttpParams } from "@angular/common/http";

import { Observable, throwError } from "rxjs";
import { catchError, map, startWith, take } from "rxjs/operators";
import { environment } from "./../../../environments/environment";

@Injectable({
    providedIn: 'root'
})
export class HttpService {

    protected api_serve: string = environment.uri_api;
    protected httpOptions: any = null

    constructor(
        private http: HttpClient
    ) { }


    get(url: string, resource: any = {}): Observable<any> {

        this.httpOptions = {
            headers: !environment.production ? new HttpHeaders({
                'Authorization': localStorage.getItem('token') || '',
            }) : ''
        };

        var urlGet = '';
        if (JSON.stringify(resource) != '{}') {

            resource = this.clearDataUndefined(resource);

            let urlParams = new URLSearchParams(resource).toString();

            urlGet = `${this.api_serve}/${url}?${urlParams}`;
        } else {
            urlGet = `${this.api_serve}/${url}`;
        }

        return this.http.get(urlGet, this.httpOptions).pipe(
            take(1),
            //   startWith(JSON.parse(localStorage[hasgkey] || '[]')),
            catchError(this.handleError)
        )
    }

    post(url: String, resource: any): Observable<any> {

        this.httpOptions = {
            headers: !environment.production ? new HttpHeaders({
                'Authorization': localStorage.getItem('token') || '',
            }) : ''
        };

        resource = this.clearDataUndefined(resource);

        return this.http.post(this.api_serve + '/' + url, resource, this.httpOptions).pipe(
            take(1),
            catchError(this.handleError)
        )
    }

    postFile(url: String, resource: any): Observable<any> {

        this.httpOptions = {
            headers: !environment.production ? new HttpHeaders({
                'Authorization': localStorage.getItem('token') || '',
            }) : '',
            responseType: 'blob' as 'json' // Adicione esta linha
        };

        resource = this.clearDataUndefined(resource);

        return this.http.post(this.api_serve + '/' + url, resource, this.httpOptions).pipe(
            take(1),
            catchError(this.handleError)
        )
    }

    put(url: string, resource?: any): Observable<any> {

        this.httpOptions = {
            headers: !environment.production ? new HttpHeaders({
                'Authorization': localStorage.getItem('token') || '',
            }) : ''
        };

        resource = this.clearDataUndefined(resource);

        return this.http.put(this.api_serve + '/' + url, resource, this.httpOptions).pipe(
            take(1),
            catchError(this.handleError)
        )
    }

    delete(url: string, identificador: string): Observable<any> {

        this.httpOptions = {
            headers: !environment.production ? new HttpHeaders({
                'Authorization': localStorage.getItem('token') || '',
            }) : ''
        };

        const urlDel = `${this.api_serve}${url}/${identificador}`;

        return this.http.delete(urlDel, this.httpOptions).pipe(
            take(1),
            catchError(this.handleError)
        )
    }

    // PROTECTED METHODS

    private clearDataUndefined(resource: any): any {
        for (let x in resource) {
            if (resource[x] === undefined) {
                delete (resource[x])
            }
        }
        return resource;
    }

    protected handleError(error: any): Observable<any> {
        return throwError(() => error);
    }

}
