import { Injectable } from '@angular/core';
import { SERVER_GO, BUCKET_NAME } from './constants/base-constant';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { map } from 'rxjs/operators';

export type EntityResponseType = HttpResponse<any>;


@Injectable({
  providedIn: 'root'
})
export class UploadImageService {

    private serverUrl = SERVER_GO + "upload-image";
    private bucketName = BUCKET_NAME;

    constructor(private http: HttpClient) { }

    public uploadImage(file: string, tipe: string, phoneNumber: string): void {
        const pathServer = this.serverUrl;
        const body = {
            'BucketName': this.bucketName,
            'Data': file,
            'NameFile': phoneNumber + '_' + tipe + '.jpeg',
            'ContentType': 'image/jpeg' 
        };
        // const headers= new HttpHeaders({
        //     'Access-Control-Allow-Origin': '*',
        //     'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, PUT',
        //     'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
        // })

        console.log('body', body);
        this.http.post<any>(pathServer, body, { observe: 'response'})
            .subscribe(
                data => console.log('data-->', data),
                error => console.log('err => ', error)
            );

        // this.http.post<any>(pathServer, body, { observe: 'response' })
        //     .pipe(map((res: EntityResponseType) => console.log('res-->', res))).subscribe(
        //     );
    }
}
