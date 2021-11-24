import { Injectable } from '@angular/core';
import { HttpResponse, HttpClient } from '@angular/common/http';
import { SERVER_GO } from 'src/app/shared/constants/base-constant';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Feature } from './feature.model';

export type EntityResponseType = HttpResponse<Feature>;

@Injectable({
  providedIn: 'root'
})
export class FeatureService {

  private serverUrl = SERVER_GO + 'feature-product';

  constructor(private http: HttpClient) { }

  filter(req?: any): Observable<HttpResponse<Feature[]>> {
    let newResourceUrl = null;
    let result = null;
    Object.keys(req).forEach((key) => {
    });

    newResourceUrl = this.serverUrl + `/filter`;

    result = this.http.post<Feature[]>(newResourceUrl, req['filter'], { observe: 'response' });

    return result;
  }

  save(feature: Feature): Observable<EntityResponseType> {
    const copy = this.convert(feature);
    const result = this.http.post<Feature>(`${this.serverUrl}`, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertResponse(res)));

    return result;
  }

  private convert(feature: Feature): Feature {
    const copy: Feature = Object.assign({}, feature);
    return copy;
  }

  private convertResponse(res: EntityResponseType): EntityResponseType {
    const body: Feature = this.convertItemFromServer(res.body);
    return res.clone({ body });
  }

  private convertItemFromServer(feature: Feature): Feature {
    const copyOb: Feature = Object.assign({}, feature);
    return copyOb;
  }
}
