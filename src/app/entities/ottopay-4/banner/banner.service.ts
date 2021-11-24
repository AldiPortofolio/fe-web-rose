import { Injectable } from '@angular/core';
import { HttpResponse, HttpClient } from '@angular/common/http';
import { SERVER_GO } from 'src/app/shared/constants/base-constant';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Banner } from './banner.model';

export type EntityResponseType = HttpResponse<Banner>;

@Injectable({
  providedIn: 'root'
})
export class BannerService {

  private serverUrl = SERVER_GO + 'banner';

  constructor(private http: HttpClient) { }

  filter(req?: any): Observable<HttpResponse<Banner[]>> {
    let newResourceUrl = null;
    let result = null;
    Object.keys(req).forEach((key) => {
    });

    newResourceUrl = this.serverUrl + `/filter`;

    result = this.http.post<Banner[]>(newResourceUrl, req['filter'], { observe: 'response' });

    return result;
  }

  save(benner: Banner): Observable<EntityResponseType> {
    const copy = this.convert(benner);
    const result = this.http.post<Banner>(`${this.serverUrl}`, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertResponse(res)));

    return result;
  }

 delete(id?: number): Observable<HttpResponse<Banner>> {
        const newResourceUrl = this.serverUrl + `/delete/${id}`;
        return this.http.delete(`${newResourceUrl}`, { observe: 'response' })
            .pipe(
                tap(results => console.log('raw ', results))
            );
    }
  private convert(benner: Banner): Banner {
    const copy: Banner = Object.assign({}, benner);
    return copy;
  }

  private convertResponse(res: EntityResponseType): EntityResponseType {
    const body: Banner = this.convertItemFromServer(res.body);
    return res.clone({ body });
  }

  private convertItemFromServer(product: Banner): Banner {
    const copyOb: Banner = Object.assign({}, product);
    return copyOb;
  }
}
