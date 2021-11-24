import { Injectable } from '@angular/core';
import { SERVER_GO } from 'src/app/shared/constants/base-constant';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MerchantBankAccount } from './merchant-bank-account.model';
import { tap, map } from 'rxjs/operators';
import { MerchantBankAccountValidation } from './merchant-bank-account-validation.model';

export type EntityResponseType = HttpResponse<MerchantBankAccount>;


@Injectable({
  providedIn: 'root'
})
export class MerchantBankAccountService {

    private serverUrl = SERVER_GO + 'merchant-bank-account';

    constructor(private http: HttpClient,
        ) { }

    filter(req?: any): Observable<HttpResponse<MerchantBankAccount[]>> {
        let newResourceUrl = null;
        let result = null;
        Object.keys(req).forEach((key) => {
        });

        newResourceUrl = this.serverUrl + `/approval`;

        result = this.http.post<MerchantBankAccount[]>(newResourceUrl, req['filter'], { observe: 'response' });

        return result;
    }

    validation(req?: any): Observable<HttpResponse<MerchantBankAccountValidation>> {
        let newResourceUrl = null;
        let result = null;

        newResourceUrl = this.serverUrl + `/validation-bank-account`;


        result = this.http.post<MerchantBankAccountValidation>(newResourceUrl, req['filter'], { observe: 'response' });

        return result;
    }
    approve(req?: any): Observable<HttpResponse<MerchantBankAccount>> {
        let newResourceUrl = null;
        let result = null;
        Object.keys(req).forEach((key) => {
        });

        newResourceUrl = this.serverUrl + `/approval/approve`;

        result = this.http.post<MerchantBankAccount>(newResourceUrl, req, { observe: 'response' });

        return result;
    }

    resendPushNotif(req?: any): Observable<HttpResponse<MerchantBankAccount>> {
        let newResourceUrl = null;
        let result = null;
        Object.keys(req).forEach((key) => {
        });

        newResourceUrl = this.serverUrl + `/approval/resendpushnotif`;

        result = this.http.post<MerchantBankAccount>(newResourceUrl, req, { observe: 'response' });

        return result;
    }

    reject(req?: any): Observable<HttpResponse<MerchantBankAccount>> {
        let newResourceUrl = null;
        let result = null;
        Object.keys(req).forEach((key) => {
        });

        newResourceUrl = this.serverUrl + `/approval/reject`;

        result = this.http.post<MerchantBankAccount>(newResourceUrl, req, { observe: 'response' });

        return result;
    }

    getAllByMid(mid: string): Observable<HttpResponse<MerchantBankAccount[]>> {
        let newResourceUrl = null;

        newResourceUrl = this.serverUrl + `/mid/${mid}`;

        const result = this.http.get<MerchantBankAccount[]>(newResourceUrl, { observe: 'response' }).pipe(
            tap(results => console.log('raw', results))
        );

        return result;
    }

    save(merchantBankAccount: MerchantBankAccount): Observable<EntityResponseType> {
        const copy = this.convert(merchantBankAccount);
        const result = this.http.post<MerchantBankAccount>(`${this.serverUrl}`, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertResponse(res)));

        return result;
    }

    private convert(merchantBankAccount: MerchantBankAccount): MerchantBankAccount {
        const copy: MerchantBankAccount = Object.assign({}, merchantBankAccount);
        return copy;
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: MerchantBankAccount = this.convertItemFromServer(res.body);
        return res.clone({ body });
    }

    private convertItemFromServer(merchantBankAccount: MerchantBankAccount): MerchantBankAccount {
        const copyOb: MerchantBankAccount = Object.assign({}, merchantBankAccount);
        return copyOb;
    }
}
