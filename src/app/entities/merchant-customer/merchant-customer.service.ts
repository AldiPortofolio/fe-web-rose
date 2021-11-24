import { Injectable } from '@angular/core';
import { HttpResponse, HttpClient } from '@angular/common/http';
import { SERVER_GO } from 'src/app/shared/constants/base-constant';
import { MerchantCustomer } from './merchant-customer.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export type EntityResponseType = HttpResponse<MerchantCustomer>;

@Injectable({
  providedIn: 'root'
})
export class MerchantCustomerService {

  private serverUrl = SERVER_GO + 'merchant-customer';

  constructor(private http: HttpClient) { }

  filter(req?: any): Observable<HttpResponse<MerchantCustomer[]>> {
    let newResourceUrl = null;
    let result = null;
    Object.keys(req).forEach((key) => {
    });

    newResourceUrl = this.serverUrl + `/filter`;

    result = this.http.post<MerchantCustomer[]>(newResourceUrl, req['filter'], { observe: 'response' });

    return result;
  }

  save(customer: MerchantCustomer): Observable<EntityResponseType> {
    const copy = this.convert(customer);
    const result = this.http.post<MerchantCustomer>(`${this.serverUrl}`, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertResponse(res)));

    return result;
  }

  private convert(customer: MerchantCustomer): MerchantCustomer {
    const copy: MerchantCustomer = Object.assign({}, customer);
    return copy;
  }

  private convertResponse(res: EntityResponseType): EntityResponseType {
    const body: MerchantCustomer = this.convertItemFromServer(res.body);
    return res.clone({ body });
  }

  private convertItemFromServer(customer: MerchantCustomer): MerchantCustomer {
    const copyOb: MerchantCustomer = Object.assign({}, customer);
    return copyOb;
  }
}
