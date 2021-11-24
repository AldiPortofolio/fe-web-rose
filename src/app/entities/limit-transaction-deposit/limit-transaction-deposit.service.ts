import { Injectable } from '@angular/core';
import { HttpResponse, HttpClient } from '@angular/common/http';
import { SERVER_GO } from 'src/app/shared/constants/base-constant';
import { LimitTransactionDeposit } from './limit-transaction-deposit.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export type EntityResponseType = HttpResponse<LimitTransactionDeposit>;

@Injectable({
  providedIn: 'root'
})
export class LimitTransactionDepositService {

  private serverUrl = SERVER_GO + 'limit-transaction-deposit';

  constructor(private http: HttpClient) { }

  filter(req?: any): Observable<HttpResponse<LimitTransactionDeposit[]>> {
    let newResourceUrl = null;
    let result = null;
    Object.keys(req).forEach((key) => {
    });

    newResourceUrl = this.serverUrl + `/filter`;

    result = this.http.post<LimitTransactionDeposit[]>(newResourceUrl, req['filter'], { observe: 'response' });

    return result;
  }

  save(limitTransaction: LimitTransactionDeposit): Observable<EntityResponseType> {
    const copy = this.convert(limitTransaction);
    const result = this.http.post<LimitTransactionDeposit>(`${this.serverUrl}`, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertResponse(res)));

    return result;
  }

  private convert(limitTransaction: LimitTransactionDeposit): LimitTransactionDeposit {
    const copy: LimitTransactionDeposit = Object.assign({}, limitTransaction);
    return copy;
  }

  private convertResponse(res: EntityResponseType): EntityResponseType {
    const body: LimitTransactionDeposit = this.convertItemFromServer(res.body);
    return res.clone({ body });
  }

  private convertItemFromServer(limitTransaction: LimitTransactionDeposit): LimitTransactionDeposit {
    const copyOb: LimitTransactionDeposit = Object.assign({}, limitTransaction);
    return copyOb;
  }
}
