import { Injectable } from '@angular/core';
import { HttpResponse, HttpClient } from '@angular/common/http';
import { ReportFinished } from './finished-report.model';
import { SERVER_GO } from 'src/app/shared/constants/base-constant';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

export type EntityResponseTypr = HttpResponse<ReportFinished>;

@Injectable({
  providedIn: 'root'
})
export class FinishedReportService {
  private serverUrl = SERVER_GO + 'report-finish';

  constructor(private http: HttpClient) { }

   filter(req?: any): Observable<HttpResponse<ReportFinished[]>> {
        let dataReportFinished = null;

     dataReportFinished = this.serverUrl + '/all';

        console.log('CONSOLE LOG', req);

     return this.http.post<ReportFinished[]>(dataReportFinished, req, { observe: 'response' })
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

  sendKafka(req?: any): Observable<HttpResponse<ReportFinished[]>> {

    let urlSendKafka = null;

    urlSendKafka = this.serverUrl + '/send';

    console.log('Req Send Kafka --->', req);

    return this.http.post<ReportFinished[]>(urlSendKafka, req, {observe: 'response'})
    .pipe(
      tap(results => console.log('result', results))
    )
  }
}
