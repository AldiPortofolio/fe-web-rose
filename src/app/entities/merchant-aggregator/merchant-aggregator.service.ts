import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MerchantAggregator } from './merchant-aggregator.model';
import { SERVER_PATH } from 'src/app/shared/constants/base-constant';
import { map, tap } from 'rxjs/operators';

export type EntityResponseType = HttpResponse<MerchantAggregator>;

@Injectable({
  providedIn: 'root'
})
export class MerchantAggregatorService {

    private serverUrl = SERVER_PATH + 'merchant-aggregator';

    constructor(private http: HttpClient) { }


    filter(req?: any): Observable<HttpResponse<MerchantAggregator[]>> {
        let pageNumber = null;
        let pageCount = null;
        let newResourceUrl = null;
        let result = null;
        Object.keys(req).forEach((key) => {
            if (key === 'page') {
                pageNumber = req[key];
            }
            if (key === 'count') {
                pageCount = req[key];
            }
        });

        newResourceUrl = this.serverUrl + `/filter/page/${pageNumber}/count/${pageCount}`;

        result = this.http.post<MerchantAggregator[]>(newResourceUrl, req['filter'], { observe: 'response' });

        return result;
    }
    
    findAll(): Observable<HttpResponse<MerchantAggregator[]>> {
    
        let newResourceUrl = null;
        let result = null;

        newResourceUrl = this.serverUrl + `/all`;

        result = this.http.get<MerchantAggregator[]>(newResourceUrl, { observe: 'response' });

        return result;
    }

    getFromMda(id): Observable<HttpResponse<MerchantAggregator[]>> {
        const newresourceUrl = this.serverUrl + `/getFromMda/${id}`;
        return this.http.get<MerchantAggregator[]>(newresourceUrl, { observe: 'response' })
            .pipe(
                tap(result => console.log('hasil', result))
            );
    }

    approveFromMda(id): Observable<MerchantAggregator> {
        const newresourceUrl = this.serverUrl + `/approveMda/${id}`;
        return this.http.post<MerchantAggregator>(newresourceUrl, { observe: 'response' });
    }

    delete(id): Observable<MerchantAggregator> {
        const newresourceUrl = this.serverUrl + `/delete/${id}`;
        return this.http.get<MerchantAggregator>(newresourceUrl);
    }

    save(merchanAggregator: MerchantAggregator): Observable<EntityResponseType> {
        const copy = this.convert(merchanAggregator);
        const result = this.http.post<MerchantAggregator>(`${this.serverUrl}`, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertResponse(res)));

        return result;
    }

    private convert(merchanAggregator: MerchantAggregator): MerchantAggregator {
        const copy: MerchantAggregator = Object.assign({}, merchanAggregator);
        return copy;
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: MerchantAggregator = this.convertItemFromServer(res.body);
        return res.clone({ body });
    }

    private convertItemFromServer(merchanAggregator: MerchantAggregator): MerchantAggregator {
        const copyOb: MerchantAggregator = Object.assign({}, merchanAggregator);
        return copyOb;
    }
}
