import { Injectable } from '@angular/core';
import { HttpResponse, HttpClient } from '@angular/common/http';
import { MdrAggregatorApproval } from './mdr-aggregator-approval-model';
import { SERVER_GO } from 'src/app/shared/constants/base-constant';
import { Observable } from 'rxjs';
import { tap, map } from 'rxjs/operators';

export type EntityResponseType = HttpResponse<MdrAggregatorApproval>;

@Injectable({
  providedIn: 'root'
})
export class MdrAggregatorApprovalService {

    private serverUrl = SERVER_GO + 'mdr-aggregator-temp';


    constructor(private http: HttpClient) { }

    filter(req?: any): Observable<HttpResponse<MdrAggregatorApproval[]>> {
        let newResourceUrl = null;


        newResourceUrl = this.serverUrl + `/filter`;

        return this.http.post<MdrAggregatorApproval[]>(newResourceUrl, req, { observe: 'response' })
            .pipe(
                tap(results => console.log('raw ', results))
            );
    }

    approve(id?: number): Observable<HttpResponse<MdrAggregatorApproval>> {
        let newresourceUrl = null;

        const req = {
            "id": id
        }

        newresourceUrl = this.serverUrl + `/approve`;
        return this.http.post<MdrAggregatorApproval>(newresourceUrl, req, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertResponse(res)));

    }

    reject(id?: number): Observable<HttpResponse<MdrAggregatorApproval>> {
        let newresourceUrl = null;

        const req = {
            "id": id
        }

        newresourceUrl = this.serverUrl + `/reject`;
        return this.http.post<MdrAggregatorApproval>(newresourceUrl, req, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertResponse(res)));

    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        console.log('convert response');
        const body: MdrAggregatorApproval = this.convertItemFromServer(res.body);
        return res.clone({ body });
    }

    /**
     * Convert a returned JSON object to memberBank.
     */
    private convertItemFromServer(mdrAggregatorApproval: MdrAggregatorApproval): MdrAggregatorApproval {
        const copyOb: MdrAggregatorApproval = Object.assign({}, mdrAggregatorApproval);
        return copyOb;
    }

}
