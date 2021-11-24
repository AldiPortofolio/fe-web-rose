import { Injectable } from '@angular/core';
import { HttpResponse, HttpClient } from '@angular/common/http';
import { UploadNmid } from './upload-nmid.model';
import { SERVER_PATH, SERVER_GO } from 'src/app/shared/constants/base-constant';
import { Observable } from 'rxjs';
import { tap, map } from 'rxjs/operators';
import { FormGroup } from '@angular/forms';

export type EntityResponseType = HttpResponse<any>;
// export type EntityResponseTypeUploadFile = HttpResponse<UploadFileNmid>;
// export type EntityResponseType = HttpResponse<>;

@Injectable({
  providedIn: 'root'
})
export class UploadNmidService {

    private serverUrl = SERVER_GO + 'merchant/nmid';

    constructor(private http: HttpClient) { }

    filter(req?: any): Observable<HttpResponse<UploadNmid[]>> {
        let dataUploadNmidUrl = null;

        dataUploadNmidUrl = this.serverUrl + '/all';

        console.log('CONSOLE LOG', req);

        return this.http.post<UploadNmid[]>(dataUploadNmidUrl, req, { observe: 'response' })
            .pipe(
                tap(results => console.log('raw ', results))
            );
    }


    async downloadFile(req?: any): Promise<HttpResponse<Blob>> {

        const newresourceUrl = this.serverUrl + '/downloadFile';

        return await this.http.post<Blob>(
            newresourceUrl, req,
            { responseType: 'blob' as 'json', observe: 'response' }
        ).toPromise();
    }

    async downloadResultFile(req?: any): Promise<HttpResponse<Blob>> {

        const newresourceUrl = this.serverUrl + '/download/resultFile';

        return await this.http.post<Blob>(
            newresourceUrl, req,
            { responseType: 'blob' as 'json', observe: 'response' }
        ).toPromise();
    }

    public uploadFile(formData: FormData): Observable<EntityResponseType> {

        // console.log('file --> ', file)
        // console.log('fileName --> ', file.name)
        let newResourceUrl = null;
        let result = null;
        newResourceUrl = this.serverUrl + '/upload';

        result =  this.http.post(newResourceUrl, formData).pipe(
            tap(
            // (res=> console.log('result--> ', res))
                results => console.log('res-->', results)
            
            )
        );

        return result;
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        console.log('convert response');
        const body: UploadNmid = this.convertItemFromServer(res.body);
        return res.clone({ body });
    }

    private convertItemFromServer(uploadNmid: UploadNmid): UploadNmid {
        const copyOb: UploadNmid = Object.assign({}, uploadNmid);
        return copyOb;
    }

  // postFile(fileToUpload: File): Observable<boolean> {
  //   const endpoint = this.serverUrl + `/upload-nmid`;
  //   const formData: FormData = new FormData();
  //   formData.append('fileKey', fileToUpload, fileToUpload.name);
  //   return this.httpClient
  //     .post(endpoint, formData, { headers: yourHeadersConfig })
  //     .map(() => { return true; })
  //     .catch((e) => this.handleError(e));
  // }
}
