import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'lodash';
import { Observable } from 'rxjs';
import { SERVER_GO } from 'src/app/shared/constants/base-constant';
import { ReportExportMerchant } from './report-export-merchant.model';

@Injectable({
  providedIn: 'root'
})
export class ReportExportMerchantService {
  private serverUrl = SERVER_GO + 'report-export-merchant';

  constructor(private http: HttpClient) { }

  filter(req?: any): Observable<HttpResponse<ReportExportMerchant[]>> {
    let url = this.serverUrl + '/filter';

    console.log('CONSOLE LOG', req);

    return this.http.post<ReportExportMerchant[]>(url, req, { observe: 'response' })
    
    
  }

  async download(req?: any): Promise<HttpResponse<Blob>> {

    const newresourceUrl = this.serverUrl + '/download';

    return await this.http.post<Blob>(
      newresourceUrl, req,
      { responseType: 'blob' as 'json', observe: 'response' }
    ).toPromise();
  }
}
