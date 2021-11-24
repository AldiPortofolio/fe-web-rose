import { Injectable } from '@angular/core';
import { SERVER_GO } from 'src/app/shared/constants/base-constant';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MdrAggregator } from './mdr-aggregator-model';
import { MdrAggregatorApproval } from '../mdr-aggregator-approval/mdr-aggregator-approval-model';
import { map } from 'rxjs/operators';

export type EntityResponseType = HttpResponse<MdrAggregator>;

@Injectable({
  providedIn: 'root'
})
export class MdrAggregatorService {

    private serverUrl = SERVER_GO + 'mdr-aggregator';

    constructor(private http: HttpClient) { }

    filter(req?: any): Observable<HttpResponse<MdrAggregator[]>> {
        let newResourceUrl = null;
        let result = null;
        Object.keys(req).forEach((key) => {
        });

        newResourceUrl = this.serverUrl + `/filter`;

        result = this.http.post<MdrAggregator[]>(newResourceUrl, req['filter'], { observe: 'response' });

        return result;
    }    

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<MdrAggregator>(`${this.serverUrl}/id/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertResponse(res)));
    }

    save(mdrAggregatorApproval: MdrAggregatorApproval): Observable<EntityResponseType> {
        const copy = this.convert(mdrAggregatorApproval);
        const result = this.http.post<MdrAggregatorApproval>(`${this.serverUrl}`, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertResponse(res)));

        return result;
    }

    private convert(mdrAggregatorApproval: MdrAggregatorApproval): MdrAggregatorApproval {
        const copy: MdrAggregatorApproval = Object.assign({}, mdrAggregatorApproval);
        return copy;
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: MdrAggregatorApproval = this.convertItemFromServer(res.body);
        return res.clone({ body });
    }

    private convertItemFromServer(mdrAggregatorApproval: MdrAggregatorApproval): MdrAggregatorApproval {
        const copyOb: MdrAggregatorApproval = Object.assign({}, mdrAggregatorApproval);
        return copyOb;
    }

}
