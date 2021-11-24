import { Injectable } from '@angular/core';
import { SERVER_GO } from 'src/app/shared/constants/base-constant';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UploadMerchant } from '../upload-merchant/upload-merchant.model';
import { tap } from 'rxjs/operators';

export type EntityResponseType = HttpResponse<any>;


@Injectable({
  providedIn: 'root'
})
export class UploadMerchantNonWipService {

    private serverUrl = SERVER_GO + 'upload-merchant-non-wip';

    constructor(private http: HttpClient) { }

    filter(req?: any): Observable<HttpResponse<UploadMerchant[]>> {
        let dataUploadMerchantUrl = null;

        dataUploadMerchantUrl = this.serverUrl + '/all';

        console.log('CONSOLE LOG', req);

        return this.http.post<UploadMerchant[]>(dataUploadMerchantUrl, req, { observe: 'response' })
            .pipe(
                tap(results => console.log('raw ', results))
            );
    }

    public uploadFile(formData: FormData): Observable<EntityResponseType> {

        // console.log('file --> ', file)
        // console.log('fileName --> ', file.name)
        let newResourceUrl = null;
        let result = null;
        newResourceUrl = this.serverUrl + '/upload';

        result = this.http.post(newResourceUrl, formData).pipe(
            tap(
                // (res=> console.log('result--> ', res))
                results => console.log('res-->', results)

            )
        );

        return result;
    }

    async downloadFile(req?: any): Promise<HttpResponse<Blob>> {

        const newresourceUrl = this.serverUrl + '/download';

        return await this.http.post<Blob>(
            newresourceUrl, req,
            { responseType: 'blob' as 'json', observe: 'response' }
        ).toPromise();
    }

    async downloadResultFile(req?: any): Promise<HttpResponse<Blob>> {

        const newresourceUrl = this.serverUrl + '/result-download';

        return await this.http.post<Blob>(
            newresourceUrl, req,
            { responseType: 'blob' as 'json', observe: 'response' }
        ).toPromise();
    }

    async downloadTemplateFile(): Promise<HttpResponse<Blob>> {

        const newresourceUrl = this.serverUrl + '/download-example';

        return await this.http.post<Blob>(
            newresourceUrl, '',
            { responseType: 'blob' as 'json', observe: 'response' }
        ).toPromise();
    }
}
