import { Injectable } from '@angular/core';
import { HttpResponse, HttpClient } from '@angular/common/http';
import { SERVER_GO } from 'src/app/shared/constants/base-constant';
import { OpLimitTransaction } from './op-limit-transaction.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export type EntityResponseType = HttpResponse<OpLimitTransaction>;

@Injectable({
  providedIn: 'root'
})
export class OpLimitTransactionService {

  private serverUrl = SERVER_GO + 'limit-transaction';

  constructor(private http: HttpClient) { }

  filter(req?: any): Observable<HttpResponse<OpLimitTransaction[]>> {
    let newResourceUrl = null;
    let result = null;
    Object.keys(req).forEach((key) => {
    });

    newResourceUrl = this.serverUrl + `/filter`;

    result = this.http.post<OpLimitTransaction[]>(newResourceUrl, req['filter'], { observe: 'response' });

    return result;
  }

  save(limitTransaction: OpLimitTransaction): Observable<EntityResponseType> {
    const copy = this.convert(limitTransaction);
    const result = this.http.post<OpLimitTransaction>(`${this.serverUrl}`, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertResponse(res)));

    return result;
  }

  private convert(limitTransaction: OpLimitTransaction): OpLimitTransaction {
    const copy: OpLimitTransaction = Object.assign({}, limitTransaction);
    return copy;
  }

  private convertResponse(res: EntityResponseType): EntityResponseType {
    const body: OpLimitTransaction = this.convertItemFromServer(res.body);
    return res.clone({ body });
  }

  private convertItemFromServer(limitTransaction: OpLimitTransaction): OpLimitTransaction {
    const copyOb: OpLimitTransaction = Object.assign({}, limitTransaction);
    return copyOb;
  }
}
