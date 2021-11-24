import { Injectable } from '@angular/core';
import { SERVER_GO, SERVER_PATH } from 'src/app/shared/constants/base-constant';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { KategoriBisnis } from './ketegori-bisnis.model';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class KategoriBisnisService {

    private serverUrl = SERVER_PATH + 'kategori-bisnis'
    private serverGoUrl = SERVER_GO + 'kategori-bisnis'
    constructor(private http: HttpClient) { }

    getByJenisUsahaId(id: string): Observable<HttpResponse<KategoriBisnis[]>> {
        let newResourceUrl = null;

        newResourceUrl = this.serverUrl + `/jenis-usaha/${id}`;

        const result = this.http.get<KategoriBisnis[]>(newResourceUrl, { observe: 'response' }).pipe(
            tap(results => console.log('raw', results))
        );

        return result;
    }

    getAllKategoriBisnis(): Observable<HttpResponse<KategoriBisnis[]>> {
        let newResourceUrl = null;

        newResourceUrl = this.serverGoUrl + `/all`;
        
        const result = this.http.get<KategoriBisnis[]>(newResourceUrl, { observe: 'response' }).pipe(
            tap(results => console.log('raw', results))
        );

        return result;
    }

}
