import { Injectable } from '@angular/core';
import { HttpResponse, HttpClient } from '@angular/common/http';
import { FeeCicilanSetting } from './fee-cicilan-setting.model';
import { SERVER_GO } from 'src/app/shared/constants/base-constant';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export type EntityResponseType = HttpResponse<FeeCicilanSetting>;

@Injectable({
  providedIn: 'root'
})
export class FeeCicilanSettingService {

  private serverUrl = SERVER_GO + 'fee-cicilan';

  constructor(private http: HttpClient) { }

  find(): Observable<HttpResponse<FeeCicilanSetting[]>> {
    let newResourceUrl = null;
    let result = null;

    newResourceUrl = this.serverUrl + `/find`;

    result = this.http.get<FeeCicilanSetting[]>(newResourceUrl, { observe: 'response' });
    return result;
  }

  save(FeeCicilan: FeeCicilanSetting): Observable<EntityResponseType> {
    const copy = this.convert(FeeCicilan);
    const result = this.http.post<FeeCicilanSetting>(`${this.serverUrl}`, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertResponse(res)));

    return result;
  }

  private convert(FeeCicilan: FeeCicilanSetting): FeeCicilanSetting {
    const copy: FeeCicilanSetting = Object.assign({}, FeeCicilan);
    return copy;
  }

  private convertResponse(res: EntityResponseType): EntityResponseType {
    const body: FeeCicilanSetting = this.convertItemFromServer(res.body);
    return res.clone({ body });
  }

  private convertItemFromServer(FeeCicilan: FeeCicilanSetting): FeeCicilanSetting {
    const copyOb: FeeCicilanSetting = Object.assign({}, FeeCicilan);
    return copyOb;
  }

}
