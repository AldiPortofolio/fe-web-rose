import { Injectable } from '@angular/core';
import { HttpResponse, HttpClient } from '@angular/common/http';
import { SERVER_GO } from 'src/app/shared/constants/base-constant';
import { MasterType } from './master-service-and-type.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export type EntityResponseType = HttpResponse<MasterType>;

@Injectable({
  providedIn: 'root'
})
export class MasterTypeService {

  private serverUrl = SERVER_GO + 'master-type';

  constructor(private http: HttpClient) { }

  getAll(): Observable<HttpResponse<MasterType[]>> {
    let newResourceUrl = null;
    let result = null;

    newResourceUrl = this.serverUrl + `/all`;

    result = this.http.get<MasterType[]>(newResourceUrl, { observe: 'response' });

    return result;
  }

  save(master: MasterType): Observable<EntityResponseType> {
    const copy = this.convert(master);
    const result = this.http.post<MasterType>(`${this.serverUrl}`, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertResponse(res)));

    return result;
  }

  private convert(master: MasterType): MasterType {
    const copy: MasterType = Object.assign({}, master);
    return copy;
  }

  private convertResponse(res: EntityResponseType): EntityResponseType {
    const body: MasterType = this.convertItemFromServer(res.body);
    return res.clone({ body });
  }

  private convertItemFromServer(master: MasterType): MasterType {
    const copyOb: MasterType = Object.assign({}, master);
    return copyOb;
  }

}