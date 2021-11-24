import { Injectable } from '@angular/core';
import { SERVER_PATH, SERVER_GO } from 'src/app/shared/constants/base-constant';
import { Observable } from 'rxjs';
import { HttpResponse, HttpClient } from '@angular/common/http';
import { tap, map } from 'rxjs/operators';
import { MdrTenor, MdrTenorResponse } from './mdr-tenor.model';

export type EntityResponseType = HttpResponse<MdrTenorResponse>;

@Injectable({
    providedIn: 'root'
})
export class MdrTenorService {

    private serverUrl = SERVER_GO + 'mdr-tenor';

    constructor(private http: HttpClient) { }

    filter(req?: any): Observable<HttpResponse<MdrTenor[]>> {
        let newResourceUrl = null;
        let result = null;

        newResourceUrl = this.serverUrl + `/filter`;

        result = this.http.post<MdrTenor[]>(newResourceUrl, req['filter'], { observe: 'response' });

        return result;
    }

    save(req: MdrTenor): Observable<EntityResponseType> {
        return this.http.post<any>(`${this.serverUrl}`, req, { observe: 'response' })
            .pipe(
                tap(results => console.log('raw ', results))
            );
    }
}
