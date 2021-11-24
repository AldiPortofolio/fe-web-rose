import { Injectable } from '@angular/core';
import { SERVER_PATH, SERVER_GO } from 'src/app/shared/constants/base-constant';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { MerchantAggregatorDetail, MerchantAggregatorDetailTemp } from './merchant-aggregator-detail.model';
import { Observable } from 'rxjs';
import { tap, map } from 'rxjs/operators';

export type EntityResponseType = HttpResponse<any>;

@Injectable({
  providedIn: 'root'
})
export class MerchantAggregatorDetailService {
  private serverUrl = SERVER_GO + 'merchant-aggregator-detail';
  private serverUpload = SERVER_GO + 'merchant/agg/upload'
  private serverDownload = SERVER_GO + 'merchant/agg/download-template'

  constructor(private http: HttpClient) { }


  filter(req?: any): Observable<HttpResponse<MerchantAggregatorDetail[]>> {
    let newResourceUrl = null;
    let result = null;
    Object.keys(req).forEach((key) => {});

    newResourceUrl = this.serverUrl + `/filter`;

    result = this.http.post<MerchantAggregatorDetail[]>(newResourceUrl, req['filter'], { observe: 'response' });

    return result;
  }

  filterTemp(req?: any): Observable<HttpResponse<MerchantAggregatorDetail[]>> {
    let newResourceUrl = null;
    let result = null;
    Object.keys(req).forEach((key) => { });

    newResourceUrl = this.serverUrl + `/filter-temp`;

    result = this.http.post<MerchantAggregatorDetail[]>(newResourceUrl, req['filter'], { observe: 'response' });

    return result;
  }

  partnerName(req?: any): Observable<HttpResponse<MerchantAggregatorDetail[]>> {
    let newResourceUrl = null;
    let result = null;
    Object.keys(req).forEach((key) => { });

    newResourceUrl = this.serverUrl + `/list-aggregator`;

    result = this.http.post<MerchantAggregatorDetail[]>(newResourceUrl, req['filter'], { observe: 'response' });

    return result;
  }

  public uploadFile(formData: FormData): Observable<EntityResponseType> {

    let newResourceUrl = null;
    let result = null;
    newResourceUrl = this.serverUpload

    result = this.http.post(newResourceUrl, formData).pipe(
      tap(
        results => console.log('res-->', results)

      )
    );

    return result;
  }

  save(Req?: any): Observable<EntityResponseType> {
    let result = null;
    result = this.http.post<MerchantAggregatorDetailTemp>(this.serverUrl, Req).pipe(
      tap(
        result => console.log('res-->',result)
      )
    );
    return result;
  }

  async downloadTemplateFile(req?: any): Promise<HttpResponse<Blob>> {

    const newresourceUrl = this.serverDownload;

    return await this.http.post<Blob>(
      newresourceUrl, req,
      { responseType: 'blob' as 'json', observe: 'response' }
    ).toPromise();
  }
}
