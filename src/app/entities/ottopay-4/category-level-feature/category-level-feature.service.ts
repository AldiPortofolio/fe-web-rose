import { Injectable } from '@angular/core';
import { HttpResponse, HttpClient } from '@angular/common/http';
import { SERVER_GO } from 'src/app/shared/constants/base-constant';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CategoryLevelFeature } from './category-level-feature.model';

export type EntityResponseType = HttpResponse<CategoryLevelFeature>;

@Injectable({
  providedIn: 'root'
})
export class CategoryLevelFeatureService {

  private serverUrl = SERVER_GO + 'category-level-feature';

  constructor(private http: HttpClient) { }

  filter(req?: any): Observable<HttpResponse<CategoryLevelFeature[]>> {
    let newResourceUrl = null;
    let result = null;
    Object.keys(req).forEach((key) => {
    });

    newResourceUrl = this.serverUrl + `/filter`;

    result = this.http.post<CategoryLevelFeature[]>(newResourceUrl, req['filter'], { observe: 'response' });

    return result;
  }

  save(categoryLevelFeature: CategoryLevelFeature): Observable<EntityResponseType> {
    const copy = this.convert(categoryLevelFeature);
    const result = this.http.post<CategoryLevelFeature>(`${this.serverUrl}`, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertResponse(res)));

    return result;
  }

  private convert(categoryLevelFeature: CategoryLevelFeature): CategoryLevelFeature {
    const copy: CategoryLevelFeature = Object.assign({}, categoryLevelFeature);
    return copy;
  }

  private convertResponse(res: EntityResponseType): EntityResponseType {
    const body: CategoryLevelFeature = this.convertItemFromServer(res.body);
    return res.clone({ body });
  }

  private convertItemFromServer(categoryLevelFeature: CategoryLevelFeature): CategoryLevelFeature {
    const copyOb: CategoryLevelFeature = Object.assign({}, categoryLevelFeature);
    return copyOb;
  }
}
