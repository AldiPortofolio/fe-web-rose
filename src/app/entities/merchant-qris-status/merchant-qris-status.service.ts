import { Injectable } from '@angular/core';
import { MerchantQrisStatus } from './merchant-qris-status.model';
import { SERVER_GO } from 'src/app/shared/constants/base-constant';
import { HttpResponse, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export type EntityResponseType = HttpResponse<MerchantQrisStatus>;

@Injectable({
  providedIn: 'root'
})
export class MerchantQrisStatusService {
    private serverUrl = SERVER_GO + 'qris-status';

    constructor(private http: HttpClient) { }

    filter(req?: any): Observable<HttpResponse<MerchantQrisStatus[]>> {
        let newResourceUrl = null;
        let result = null;
        Object.keys(req).forEach((key) => {
        });

        newResourceUrl = this.serverUrl + `/filter`;

        result = this.http.post<MerchantQrisStatus[]>(newResourceUrl, req['filter'], { observe: 'response' });

        return result;
    }

}
