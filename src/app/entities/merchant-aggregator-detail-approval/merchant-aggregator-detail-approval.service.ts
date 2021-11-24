import { Injectable } from '@angular/core';
import { SERVER_GO } from 'src/app/shared/constants/base-constant';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { MerchantAggregator } from '../merchant-aggregator/merchant-aggregator.model';
import { tap, map } from 'rxjs/operators';
import { MerchantAggregatorDetail } from './merchant-aggregator-detail.model';
import { Merchant } from '../merchant/merchant.model';

export type EntityResponseType = HttpResponse<MerchantAggregatorDetail>;

@Injectable({
  providedIn: 'root'
})
export class MerchantAggregatorDetailApprovalService {

    private serverUrl = SERVER_GO + 'merchant-aggregator-detail';

    private dataSource = new BehaviorSubject<string[]>(['','']);
    dataSharing = this.dataSource.asObservable();

    constructor(private http: HttpClient) { }

    sendData(midAggregator: string, aggregatorName: string) {
        const data = [midAggregator, aggregatorName]
        this.dataSource.next(data);
    }

    filter(req?: any): Observable<HttpResponse<MerchantAggregator[]>> {
        let newResourceUrl = null;
        let page = null;
        let limit = null;
        Object.keys(req).forEach((key) => {
            if (key === 'page') {
                req['filter'].page = req[key];
            }
            if (key === 'count') {
                req['filter'].limit = req[key];
            }
        });

        newResourceUrl = this.serverUrl + `/list-data-approval`;

        return this.http.post<MerchantAggregator[]>(newResourceUrl, req['filter'], { observe: 'response' })
        .pipe(
            tap(results => console.log('raw ', results))
        );
    }

    approve(midAggregator?: string): Observable<HttpResponse<MerchantAggregatorDetail>> {
        let newresourceUrl = null;

        const req = {
            "midAggregator": midAggregator
        }

        newresourceUrl = this.serverUrl + `/approve`;
        return this.http.post<MerchantAggregatorDetail>(newresourceUrl, req, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertResponse(res)));
        
    }

    findDetailByMidAggragtor(req?: any): Observable<HttpResponse<Merchant[]>> {
        let newResourceUrl = null;

        newResourceUrl = this.serverUrl + `/filter-data-approval`;

        return this.http.post<Merchant[]>(newResourceUrl, req, { observe: 'response' })
            .pipe(
                tap(results => console.log('raw ', results))
            );
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        console.log('convert response');
        const body: MerchantAggregatorDetail = this.convertItemFromServer(res.body);
        return res.clone({ body });
    }

    /**
     * Convert a returned JSON object to memberBank.
     */
    private convertItemFromServer(merchantAggregatorDetail: MerchantAggregatorDetail): MerchantAggregatorDetail {
        const copyOb: MerchantAggregatorDetail = Object.assign({}, merchantAggregatorDetail);
        return copyOb;
    }

    /**
 * Convert a Member to a JSON which can be sent to the server.
 */
    private convert(merchantAggregatorDetail: MerchantAggregatorDetail): MerchantAggregatorDetail {
        const copy: MerchantAggregatorDetail = Object.assign({}, merchantAggregatorDetail);
        return copy;
    }
}
