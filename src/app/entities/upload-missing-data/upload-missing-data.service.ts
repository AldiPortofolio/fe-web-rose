import { Injectable } from '@angular/core';
import { HttpResponse, HttpClient } from '@angular/common/http';
import { SERVER_GO } from 'src/app/shared/constants/base-constant';
import { Observable } from 'rxjs';
import { UploadMissingData } from './upload-missing-data.model';
import { tap } from 'rxjs/operators';

export type EntityResponseType = HttpResponse<any>;

@Injectable({
  providedIn: 'root'
})
export class UploadMissingDataService {

    private serverUrl = SERVER_GO+ 'upload-missing';

    constructor(private http: HttpClient) { }

    filter(req?: any): Observable<HttpResponse<UploadMissingData[]>> {
        let dataUploadMerchantUrl = null;

        dataUploadMerchantUrl = this.serverUrl + '/all';

        console.log('CONSOLE LOG', req);

        return this.http.post<UploadMissingData[]>(dataUploadMerchantUrl, req['filter'], { observe: 'response' })
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

    async downloadExample(): Promise<HttpResponse<Blob>> {

        const newresourceUrl = this.serverUrl + '/download-example';

        return await this.http.get<Blob>(
            newresourceUrl,
            { responseType: 'blob' as 'json', observe: 'response' }
        ).toPromise();
    }
}
