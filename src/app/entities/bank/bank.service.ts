import { Injectable } from '@angular/core';
import { HttpResponse, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { SERVER_GO} from 'src/app/shared/constants/base-constant';
import { ListAccountBank } from './bank.model';

@Injectable({
  providedIn: 'root'
})
export class listAccountBankService {

  private serverUrlGo = SERVER_GO + 'deposit-bank/';

  constructor(private http: HttpClient) { }

  getAll(req?: any): Observable<HttpResponse<ListAccountBank[]>> {

    let newresourceUrl = null;

    newresourceUrl = this.serverUrlGo + `all`;
    return this.http.post<ListAccountBank[]>(newresourceUrl, req, { observe: 'response' })
      .pipe(
        tap(results => console.log('Bank >>> ', results))
      );
  }
}
