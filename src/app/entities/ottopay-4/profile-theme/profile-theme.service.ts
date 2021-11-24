import { Injectable } from '@angular/core';
import { HttpResponse, HttpClient } from '@angular/common/http';
import { SERVER_GO } from 'src/app/shared/constants/base-constant';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ProfileTheme } from './profile-theme.model';

export type EntityResponseType = HttpResponse<ProfileTheme>;

@Injectable({
  providedIn: 'root'
})
export class ProfileThemeService {

  private serverUrl = SERVER_GO + 'profile-theme';

  constructor(private http: HttpClient) { }

  filter(req?: any): Observable<HttpResponse<ProfileTheme[]>> {
    let newResourceUrl = null;
    let result = null;
    Object.keys(req).forEach((key) => {
    });

    newResourceUrl = this.serverUrl + `/filter`;

    result = this.http.post<ProfileTheme[]>(newResourceUrl, req['filter'], { observe: 'response' });

    return result;
  }

  save(feature: ProfileTheme): Observable<EntityResponseType> {
    const copy = this.convert(feature);
    const result = this.http.post<ProfileTheme>(`${this.serverUrl}`, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertResponse(res)));

    return result;
  }

  private convert(profileTheme: ProfileTheme): ProfileTheme {
    const copy: ProfileTheme = Object.assign({}, profileTheme);
    return copy;
  }

  private convertResponse(res: EntityResponseType): EntityResponseType {
    const body: ProfileTheme = this.convertItemFromServer(res.body);
    return res.clone({ body });
  }

  private convertItemFromServer(profileTheme: ProfileTheme): ProfileTheme {
    const copyOb: ProfileTheme = Object.assign({}, profileTheme);
    return copyOb;
  }
}
