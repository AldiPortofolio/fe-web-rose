import { Injectable } from '@angular/core';
import { SERVER_PATH, SERVER_GO } from 'src/app/shared/constants/base-constant';
import { Observable } from 'rxjs';
import { HttpResponse, HttpClient } from '@angular/common/http';
import { tap, map } from 'rxjs/operators';
import { MdrBank, MdrBankResponse } from './mdr-bank.model';

export type EntityResponseType = HttpResponse<MdrBankResponse>;

@Injectable({
    providedIn: 'root'
})
export class MdrBankService {

    private serverUrl = SERVER_GO + 'mdr-bank';

    constructor(private http: HttpClient) { }

    filter(req?: any): Observable<HttpResponse<MdrBank[]>> {
        let newResourceUrl = null;
        let result = null;

        newResourceUrl = this.serverUrl + `/filter`;

        result = this.http.post<MdrBank[]>(newResourceUrl, req['filter'], { observe: 'response' });

        return result;
    }

    save(req: MdrBank): Observable<EntityResponseType> {
        return this.http.post<any>(`${this.serverUrl}`, req, {  observe: 'response' })
            .pipe(
                tap(results => console.log('raw ', results ) )
            );
    }
}
