import { Injectable } from '@angular/core';
import { SERVER_GO } from 'src/app/shared/constants/base-constant';
import { ReportRejected, ReasonWip } from './report-rejected.model';
import { HttpResponse, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ReportRejectedService {
  private serverUrl = SERVER_GO + 'report-rejected';

  constructor(private http: HttpClient) { }

  filter(req?: any): Observable<HttpResponse<ReportRejected[]>> {
    let dataReportFinished = null;

    dataReportFinished = this.serverUrl + '/all';

    console.log('CONSOLE LOG', req);

    return this.http.post<ReportRejected[]>(dataReportFinished, req, { observe: 'response' })
      .pipe(
        tap(results => console.log('raw ', results))
      );
  }

  getReason(wip?: any): Observable<HttpResponse<ReasonWip[]>> {
    let reasonWip = null;

    reasonWip = this.serverUrl + '/reason/' + wip;

    console.log('CONSOLE LOG', wip);

    return this.http.get<ReasonWip[]>(reasonWip, { observe: 'response' })
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

  sendKafka(req?: any): Observable<HttpResponse<ReportRejected[]>> {

    let urlSendKafka = null;

    urlSendKafka = this.serverUrl + '/send';

    console.log('Req Send Kafka --->', req);

    return this.http.post<ReportRejected[]>(urlSendKafka, req, { observe: 'response' })
      .pipe(
        tap(results => console.log('result', results))
      )
  }
}
