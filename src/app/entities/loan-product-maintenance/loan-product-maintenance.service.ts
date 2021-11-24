import { Injectable } from '@angular/core';
import { HttpResponse, HttpClient } from '@angular/common/http';
import { LoanProductMaintenance } from './loan-product-maintenance.model';
import { SERVER_GO } from 'src/app/shared/constants/base-constant';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export type EntityResponseType = HttpResponse<LoanProductMaintenance>;

@Injectable({
  providedIn: 'root'
})
export class LoanProductMaintenanceService {

  private serverUrl = SERVER_GO + 'loan-product-maintenance';

  constructor(private http: HttpClient) { }

  filter(req?: any): Observable<HttpResponse<LoanProductMaintenance[]>> {
    let newResourceUrl = null;
    let result = null;
    Object.keys(req).forEach((key) => {
    });

    newResourceUrl = this.serverUrl + `/filter`;

    result = this.http.post<LoanProductMaintenance[]>(newResourceUrl, req['filter'], { observe: 'response' });

    return result;
  }

  save(data: LoanProductMaintenance): Observable<EntityResponseType> {
    const copy = this.convert(data);
    const result = this.http.post<LoanProductMaintenance>(`${this.serverUrl}`, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertResponse(res)));

    return result;
  }

  private convert(data: LoanProductMaintenance): LoanProductMaintenance {
    const copy: LoanProductMaintenance = Object.assign({}, data);
    return copy;
  }

  private convertResponse(res: EntityResponseType): EntityResponseType {
    const body: LoanProductMaintenance = this.convertItemFromServer(res.body);
    return res.clone({ body });
  }

  private convertItemFromServer(data: LoanProductMaintenance): LoanProductMaintenance {
    const copyOb: LoanProductMaintenance = Object.assign({}, data);
    return copyOb;
  }



}
