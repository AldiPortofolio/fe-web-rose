import { Injectable } from '@angular/core';
import { HttpResponse, HttpClient } from '@angular/common/http';
import { MerchantMasterTag } from './merchant-master-tag.model';
import { SERVER_GO } from 'src/app/shared/constants/base-constant';
import { Observable } from 'rxjs';

export type EntityResponseType = HttpResponse<MerchantMasterTag>;

@Injectable({
  providedIn: 'root'
})
export class MerchantMasterTagService {

    private serverUrl = SERVER_GO + 'merchant-master-tag';

    constructor(private http: HttpClient) { }

    filter(req?: any): Observable<HttpResponse<MerchantMasterTag[]>> {
        let newResourceUrl = null;
        let result = null;
        Object.keys(req).forEach((key) => {
        });

        newResourceUrl = this.serverUrl + `/filter`;

        result = this.http.post<MerchantMasterTag[]>(newResourceUrl, req['filter'], { observe: 'response' });

        return result;
    }

    async downloadAll(): Promise<HttpResponse<Blob>> {

        const newresourceUrl = this.serverUrl + '/download-all';

        return await this.http.get<Blob>(
            newresourceUrl,
            { responseType: 'blob' as 'json', observe: 'response' }
        ).toPromise();
    }
}
