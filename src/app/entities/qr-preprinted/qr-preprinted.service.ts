import { Injectable } from '@angular/core';
import { HttpResponse, HttpClient } from '@angular/common/http';
import { SERVER_GO } from 'src/app/shared/constants/base-constant';
import { Observable } from 'rxjs';
import { QrPreprinted, QrPreprintedReq } from './qr-preprinted.model';
import { tap } from 'rxjs/operators';

export type EntityResponseType = HttpResponse<any>;


@Injectable({
  providedIn: 'root'
})
export class QrPreprintedService {

    private serverUrl = SERVER_GO + 'qr-preprinted';

    constructor(private http: HttpClient) { }

    send(qrPreprintedReq: QrPreprintedReq): Observable<EntityResponseType> {

        const newresourceUrl = this.serverUrl + `/send`;
        const result = this.http.post<QrPreprintedReq>(newresourceUrl, qrPreprintedReq, { observe: 'response' });
        return result;
    }

    filter(req?: any): Observable<HttpResponse<QrPreprinted[]>> {
        let filterUrl = null;

        filterUrl = this.serverUrl + '/all';

        console.log('CONSOLE LOG', req);

        return this.http.post<QrPreprinted[]>(filterUrl, req, { observe: 'response' })
            .pipe(
                tap(results => console.log('raw ', results))
            );
    }

    async downloadFile(req?: any): Promise<HttpResponse<Blob>> {

        const newresourceUrl = this.serverUrl + '/download';

        return await this.http.post<Blob>(
            newresourceUrl, req,
            { responseType: 'blob' as 'json', observe: 'response' }
        ).toPromise();
    }
}
