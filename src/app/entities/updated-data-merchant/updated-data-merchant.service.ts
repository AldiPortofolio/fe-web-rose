import { Injectable } from '@angular/core';
import { HttpResponse, HttpClient } from '@angular/common/http';
import { UpdatedDataMerchant } from './updated-data-merchant.model';
import { SERVER_GO } from 'src/app/shared/constants/base-constant';
import { Observable } from 'rxjs';


export type EntityResponseType = HttpResponse<UpdatedDataMerchant>;


@Injectable({
  providedIn: 'root'
})
export class UpdatedDataMerchantService {

    private serverUrl = SERVER_GO + 'updated-data';

    constructor(private http: HttpClient) { }

    filter(req?: any): Observable<HttpResponse<UpdatedDataMerchant[]>> {
        let newResourceUrl = null;
        let result = null;
        Object.keys(req).forEach((key) => {
        });

        newResourceUrl = this.serverUrl + `/filter`;

        result = this.http.post<UpdatedDataMerchant[]>(newResourceUrl, req['filter'], { observe: 'response' });

        return result;
    }

    approve(req?: any): Observable<HttpResponse<UpdatedDataMerchant>> {
        let newResourceUrl = null;
        let result = null;
        Object.keys(req).forEach((key) => {
        });

        newResourceUrl = this.serverUrl + `/approve`;

        result = this.http.post<UpdatedDataMerchant>(newResourceUrl, req, { observe: 'response' });

        return result;
    }

    reject(req?: any): Observable<HttpResponse<UpdatedDataMerchant>> {
        let newResourceUrl = null;
        let result = null;
        Object.keys(req).forEach((key) => {
        });

        newResourceUrl = this.serverUrl + `/reject`;

        result = this.http.post<UpdatedDataMerchant>(newResourceUrl, req, { observe: 'response' });

        return result;
    }
}
