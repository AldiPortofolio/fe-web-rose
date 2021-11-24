import { Injectable } from '@angular/core';
import { SERVER_PATH, SERVER_GO } from 'src/app/shared/constants/base-constant';
import { Observable } from 'rxjs';
import { HttpResponse, HttpClient } from '@angular/common/http';
import { LimitTransaction } from './limit-transaction-model';
import { tap, map } from 'rxjs/operators';
import { LimitTransactionApproval } from '../limit-transaction-approval/limit-transaction-approval.model';

export type EntityResponseType = HttpResponse<LimitTransaction>;

@Injectable({
  providedIn: 'root'
})
export class LimitTransactionService {

  private serverUrl = SERVER_GO + 'masterlimitation';

  constructor(private http: HttpClient) { }

  filter(req?: any): Observable<HttpResponse<LimitTransaction[]>> {
    let newResourceUrl = null;
    let result = null;
    Object.keys(req).forEach((key) => {
    });

    newResourceUrl = this.serverUrl + `/filter`;

    result = this.http.post<LimitTransaction[]>(newResourceUrl, req['filter'], { observe: 'response' });

    return result;
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<LimitTransaction>(`${this.serverUrl}/id/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertResponse(res)));
  }

  save(limitTransactionTemp: LimitTransactionApproval): Observable<EntityResponseType> {
    const copy = this.convert(limitTransactionTemp);
    const result = this.http.post<LimitTransactionApproval>(`${this.serverUrl}`, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertResponse(res)));

    return result;
  }
  private convert(limitTransaction: LimitTransactionApproval): LimitTransaction {
    const copy: LimitTransactionApproval = Object.assign({}, limitTransaction);
    return copy;
  }

  private convertResponse(res: EntityResponseType): EntityResponseType {
    const body: LimitTransactionApproval = this.convertItemFromServer(res.body);
    return res.clone({ body });
  }

  private convertItemFromServer(limitTransactionTemp: LimitTransactionApproval): LimitTransactionApproval {
    const copyOb: LimitTransactionApproval = Object.assign({}, limitTransactionTemp);
    return copyOb;
  }
}
