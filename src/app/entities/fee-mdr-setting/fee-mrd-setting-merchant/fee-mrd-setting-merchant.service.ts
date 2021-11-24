import { Injectable } from '@angular/core';
import { HttpResponse, HttpClient } from '@angular/common/http';
import { SERVER_GO } from 'src/app/shared/constants/base-constant';
import { FeeMdrSettingMerchant } from './fee-mdr-setting-merchant.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export type EntityResponseType = HttpResponse<FeeMdrSettingMerchant>;

@Injectable({
  providedIn: 'root'
})
export class FeeMrdSettingMerchantService {

  private serverUrl = SERVER_GO + 'fee-mdr-setting';

  constructor(private http: HttpClient) { }

  filter(req?: any): Observable<HttpResponse<FeeMdrSettingMerchant[]>> {
    let newResourceUrl = null;
    let result = null;
    Object.keys(req).forEach((key) => {
    });

    newResourceUrl = this.serverUrl + `/filter`;

    result = this.http.post<FeeMdrSettingMerchant[]>(newResourceUrl, req['filter'], { observe: 'response' });

    return result;
  }

  save(feeMdr: FeeMdrSettingMerchant): Observable<EntityResponseType> {
    const copy = this.convert(feeMdr);
    const result = this.http.post<FeeMdrSettingMerchant>(`${this.serverUrl}`, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertResponse(res)));

    return result;
  }

  private convert(feeMdr: FeeMdrSettingMerchant): FeeMdrSettingMerchant {
    const copy: FeeMdrSettingMerchant = Object.assign({}, feeMdr);
    return copy;
  }

  private convertResponse(res: EntityResponseType): EntityResponseType {
    const body: FeeMdrSettingMerchant = this.convertItemFromServer(res.body);
    return res.clone({ body });
  }

  private convertItemFromServer(feeMdr: FeeMdrSettingMerchant): FeeMdrSettingMerchant {
    const copyOb: FeeMdrSettingMerchant = Object.assign({}, feeMdr);
    return copyOb;
  }

}
