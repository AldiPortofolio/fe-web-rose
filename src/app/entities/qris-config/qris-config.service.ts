import { Injectable } from '@angular/core';
import { HttpResponse, HttpClient } from '@angular/common/http';
import { QrisConfig } from './qris-config.model';
import { SERVER_GO } from 'src/app/shared/constants/base-constant';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export type EntityResponseType = HttpResponse<QrisConfig>;


@Injectable({
  providedIn: 'root'
})
export class QrisConfigService {

    private serverUrl = SERVER_GO + 'qris-config';

    constructor(private http: HttpClient) { }

    filter(req?: any): Observable<HttpResponse<QrisConfig[]>> {
        let newResourceUrl = null;
        let result = null;
        Object.keys(req).forEach((key) => {
        });

        newResourceUrl = this.serverUrl + `/filter`;

        result = this.http.post<QrisConfig[]>(newResourceUrl, req['filter'], { observe: 'response' });

        return result;
    }

    save(qrisConfig: QrisConfig): Observable<EntityResponseType> {
        const copy = this.convert(qrisConfig);
        const result = this.http.post<QrisConfig>(`${this.serverUrl}`, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertResponse(res)));

        return result;
    }

    private convert(qrisConfig: QrisConfig): QrisConfig {
        const copy: QrisConfig = Object.assign({}, qrisConfig);
        return copy;
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: QrisConfig = this.convertItemFromServer(res.body);
        return res.clone({ body });
    }

    private convertItemFromServer(qrisConfig: QrisConfig): QrisConfig {
        const copyOb: QrisConfig = Object.assign({}, qrisConfig);
        return copyOb;
    }
}
