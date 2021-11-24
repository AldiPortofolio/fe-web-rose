import { Injectable } from '@angular/core';
import { HttpResponse, HttpClient } from '@angular/common/http';
import { LimitTransactionApproval } from './limit-transaction-approval.model';
import { SERVER_GO } from 'src/app/shared/constants/base-constant';
import { Observable } from 'rxjs';
import { tap, map } from 'rxjs/operators';

export type EntityResponseType = HttpResponse<LimitTransactionApproval>;

@Injectable({
  providedIn: 'root'
})

export class LimitTransactionApprovalService {

    private serverUrl = SERVER_GO + 'masterlimitationtemp';


    constructor(private http: HttpClient) { }

    filter(req?: any): Observable<HttpResponse<LimitTransactionApproval[]>> {
        let newResourceUrl = null;
        

        newResourceUrl = this.serverUrl + `/filter`;

        return this.http.post<LimitTransactionApproval[]>(newResourceUrl, req, { observe: 'response' })
            .pipe(
                tap(results => console.log('raw ', results))
            );
    }

    approve(id?: number): Observable<HttpResponse<LimitTransactionApproval>> {
        let newresourceUrl = null;

        const req = {
            "id": id
        }

        newresourceUrl = this.serverUrl + `/approve`;
        return this.http.post<LimitTransactionApproval>(newresourceUrl, req, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertResponse(res)));

    }

    reject(id?: number): Observable<HttpResponse<LimitTransactionApproval>> {
        let newresourceUrl = null;

        const req = {
            "id": id
        }

        newresourceUrl = this.serverUrl + `/reject`;
        return this.http.post<LimitTransactionApproval>(newresourceUrl, req, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertResponse(res)));

    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        console.log('convert response');
        const body: LimitTransactionApproval = this.convertItemFromServer(res.body);
        return res.clone({ body });
    }

    /**
     * Convert a returned JSON object to memberBank.
     */
    private convertItemFromServer(limitTransactionApproval: LimitTransactionApproval): LimitTransactionApproval {
        const copyOb: LimitTransactionApproval = Object.assign({}, limitTransactionApproval);
        return copyOb;
    }

}
