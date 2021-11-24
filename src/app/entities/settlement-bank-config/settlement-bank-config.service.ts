import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SERVER_GO } from 'src/app/shared/constants/base-constant';
import { SettlementType } from './settlement-type.model';
import { map } from 'rxjs/operators';
import { Lookup } from '../lookup/lookup.model';

export type EntityResponseType = HttpResponse<SettlementType>;

@Injectable({
  providedIn: 'root'
})
export class SettlementBankConfigService {

  private serverUrl = SERVER_GO+ 'settlement-config';
  
  constructor(private http: HttpClient) { }

  filter(req?: any): Observable<HttpResponse<SettlementType[]>> {
    let newResourceUrl = null;
    let result = null;
    Object.keys(req).forEach((key) => {
    });

    newResourceUrl = this.serverUrl + `/filter`;

    result = this.http.post<SettlementType[]>(newResourceUrl, req['filter'], { observe: 'response' });

    return result;
  }

  save(banklist: SettlementType): Observable<EntityResponseType> {
    const copy = this.convert(banklist);
    const result = this.http.post<SettlementType>(`${this.serverUrl}`, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertResponse(res)));

    return result;
  }

  private convert(banklist: SettlementType): SettlementType {
    const copy: SettlementType = Object.assign({}, banklist);
    return copy;
  }

  private convertResponse(res: EntityResponseType): EntityResponseType {
    const body: SettlementType = this.convertItemFromServer(res.body);
    return res.clone({ body });
  }

  private convertItemFromServer(banklist: SettlementType): SettlementType {
    const copyOb: SettlementType = Object.assign({}, banklist);
    return copyOb;
  }

  lookup(req?: any): Observable<HttpResponse<Lookup[]>> {
    let newResourceUrl = null;
    let result = null;
    Object.keys(req).forEach((key) => {
    });

    newResourceUrl = SERVER_GO + `lookup/filter`;

    result = this.http.post<Lookup[]>(newResourceUrl, req, { observe: 'response' });

    return result;
  }
}
