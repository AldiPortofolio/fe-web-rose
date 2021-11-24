import { Injectable } from '@angular/core';
import { SERVER_GO } from 'src/app/shared/constants/base-constant';
import { ReportQr } from './report-qr.model';
import { HttpResponse, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ReportQrService {

  private serverUrl = SERVER_GO + 'report-qr';

  constructor(private http: HttpClient) { }

  filter(req?: any): Observable<HttpResponse<ReportQr[]>> {
    let dataReportQr = null;

    dataReportQr = this.serverUrl + '/all';

    console.log('CONSOLE LOG', req);

    return this.http.post<ReportQr[]>(dataReportQr, req, { observe: 'response' })
      .pipe(
        tap(results => console.log('raw ', results))
      );
  }

  async download(req?: any): Promise<HttpResponse<Blob>> {

    const newresourceUrl = this.serverUrl + '/download';

    return await this.http.post<Blob>(
      newresourceUrl, req,
      { responseType: 'blob' as 'json', observe: 'response' }
    ).toPromise();
  }

  async downloadResult(req?: any): Promise<HttpResponse<Blob>> {

    const newresourceUrl = this.serverUrl + '/download/result';

    return await this.http.post<Blob>(
      newresourceUrl, req,
      { responseType: 'blob' as 'json', observe: 'response' }
    ).toPromise();
  }
}
