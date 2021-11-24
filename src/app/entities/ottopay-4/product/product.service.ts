import { Injectable } from '@angular/core';
import { HttpResponse, HttpClient } from '@angular/common/http';
import { SERVER_GO } from 'src/app/shared/constants/base-constant';
import { Product } from './product.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export type EntityResponseType = HttpResponse<Product>;

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private serverUrl = SERVER_GO + 'product';

  constructor(private http: HttpClient) { }

  filter(req?: any): Observable<HttpResponse<Product[]>> {
    let newResourceUrl = null;
    let result = null;
    Object.keys(req).forEach((key) => {
    });

    newResourceUrl = this.serverUrl + `/filter`;

    result = this.http.post<Product[]>(newResourceUrl, req['filter'], { observe: 'response' });

    return result;
  }

  save(product: Product): Observable<EntityResponseType> {
    const copy = this.convert(product);
    const result = this.http.post<Product>(`${this.serverUrl}`, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertResponse(res)));

    return result;
  }

  private convert(product: Product): Product {
    const copy: Product = Object.assign({}, product);
    return copy;
  }

  private convertResponse(res: EntityResponseType): EntityResponseType {
    const body: Product = this.convertItemFromServer(res.body);
    return res.clone({ body });
  }

  private convertItemFromServer(product: Product): Product {
    const copyOb: Product = Object.assign({}, product);
    return copyOb;
  }

}
