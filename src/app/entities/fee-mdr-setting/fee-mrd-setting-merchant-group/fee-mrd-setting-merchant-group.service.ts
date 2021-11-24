import { Injectable } from '@angular/core';
import { HttpResponse, HttpClient } from '@angular/common/http';
import { SERVER_GO } from 'src/app/shared/constants/base-constant';
import { FeeMdrSettingMerchantGroup } from './fee-mdr-setting-merchant-group.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export type EntityResponseType = HttpResponse<FeeMdrSettingMerchantGroup>;

@Injectable({
  providedIn: 'root'
})
export class FeeMrdSettingMerchantGroupService {

  private serverUrl = SERVER_GO + 'fee-mdr-setting-merchant-group';

  constructor(private http: HttpClient) { }

  filter(req?: any): Observable<HttpResponse<FeeMdrSettingMerchantGroup[]>> {
    let newResourceUrl = null;
    let result = null;
    Object.keys(req).forEach((key) => {
    });

    newResourceUrl = this.serverUrl + `/filter`;

    result = this.http.post<FeeMdrSettingMerchantGroup[]>(newResourceUrl, req['filter'], { observe: 'response' });

    return result;
  }

  save(feeMdr: FeeMdrSettingMerchantGroup): Observable<EntityResponseType> {
    const copy = this.convert(feeMdr);
    const result = this.http.post<FeeMdrSettingMerchantGroup>(`${this.serverUrl}`, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertResponse(res)));

    return result;
  }

  private convert(feeMdr: FeeMdrSettingMerchantGroup): FeeMdrSettingMerchantGroup {
    const copy: FeeMdrSettingMerchantGroup = Object.assign({}, feeMdr);
    return copy;
  }

  private convertResponse(res: EntityResponseType): EntityResponseType {
    const body: FeeMdrSettingMerchantGroup = this.convertItemFromServer(res.body);
    return res.clone({ body });
  }

  private convertItemFromServer(feeMdr: FeeMdrSettingMerchantGroup): FeeMdrSettingMerchantGroup {
    const copyOb: FeeMdrSettingMerchantGroup = Object.assign({}, feeMdr);
    return copyOb;
  }

}
