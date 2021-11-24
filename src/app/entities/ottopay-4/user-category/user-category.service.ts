import { Injectable } from '@angular/core';
import { HttpResponse, HttpClient } from '@angular/common/http';
import { SERVER_GO } from 'src/app/shared/constants/base-constant';
import { UserCategory } from './user-category.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export type EntityResponseType = HttpResponse<UserCategory>;

@Injectable({
  providedIn: 'root'
})
export class UserCategoryService {

  private serverUrl = SERVER_GO + 'user-category';

  constructor(private http: HttpClient) { }

  filter(req?: any): Observable<HttpResponse<UserCategory[]>> {
    let newResourceUrl = null;
    let result = null;
    Object.keys(req).forEach((key) => {
    });

    newResourceUrl = this.serverUrl + `/filter`;

    result = this.http.post<UserCategory[]>(newResourceUrl, req['filter'], { observe: 'response' });

    return result;
  }

  dropdown(): Observable<HttpResponse<UserCategory[]>> {
    let newResourceUrl = null;
    let result = null;

    newResourceUrl = this.serverUrl + `/dropdown`;

    result = this.http.get<UserCategory[]>(newResourceUrl, { observe: 'response' });

    return result;
  }

  save(userCategory: UserCategory): Observable<EntityResponseType> {
    const copy = this.convert(userCategory);
    const result = this.http.post<UserCategory>(`${this.serverUrl}`, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertResponse(res)));

    return result;
  }

  private convert(userCategory: UserCategory): UserCategory {
    const copy: UserCategory = Object.assign({}, userCategory);
    return copy;
  }

  private convertResponse(res: EntityResponseType): EntityResponseType {
    const body: UserCategory = this.convertItemFromServer(res.body);
    return res.clone({ body });
  }

  private convertItemFromServer(userCategory: UserCategory): UserCategory {
    const copyOb: UserCategory = Object.assign({}, userCategory);
    return copyOb;
  }
}
