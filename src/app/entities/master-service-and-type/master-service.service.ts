import { Injectable } from '@angular/core';
import { HttpResponse, HttpClient } from '@angular/common/http';
import { SERVER_GO } from 'src/app/shared/constants/base-constant';
import { MasterService } from './master-service-and-type.model'
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export type EntityResponseType = HttpResponse<MasterService>;

@Injectable({
  providedIn: 'root'
})
export class MasterServiceService {

  private serverUrl = SERVER_GO + 'master-service';

  constructor(private http: HttpClient) { }

  getAll(): Observable<HttpResponse<MasterService[]>> {
    let newResourceUrl = null;
    let result = null;

    newResourceUrl = this.serverUrl + `/all`;

    result = this.http.get<MasterService[]>(newResourceUrl, { observe: 'response' });

    return result;
  }

  save(master: MasterService): Observable<EntityResponseType> {
    const copy = this.convert(master);
    const result = this.http.post<MasterService>(`${this.serverUrl}`, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertResponse(res)));

    return result;
  }

  private convert(master: MasterService): MasterService {
    const copy: MasterService = Object.assign({}, master);
    return copy;
  }

  private convertResponse(res: EntityResponseType): EntityResponseType {
    const body: MasterService = this.convertItemFromServer(res.body);
    return res.clone({ body });
  }

  private convertItemFromServer(master: MasterService): MasterService {
    const copyOb: MasterService = Object.assign({}, master);
    return copyOb;
  }

}