import { Injectable } from '@angular/core';
import { MagTransactions } from './mag-transactions.model';
import { SERVER_GO } from 'src/app/shared/constants/base-constant';
import { HttpResponse, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MagTransactionsService {
  private serverUrl = SERVER_GO + 'mag-transactions';

  constructor(private http: HttpClient) { }

  filter(req?: any): Observable<HttpResponse<MagTransactions[]>> {
    let result
    let newResourceUrl = this.serverUrl + `/all`;

    result = this.http.post<MagTransactions[]>(newResourceUrl, req['filter'], { observe: 'response' });

    return result;
  }

  export(req?: any): Observable<HttpResponse<MagTransactions[]>> {
    let result
    let newResourceUrl = this.serverUrl + `/export`;

    result = this.http.post<MagTransactions[]>(newResourceUrl, req['filter'], { observe: 'response' });

    return result;
  }
}
