import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { SERVER_GO } from 'src/app/shared/constants/base-constant';
import { Acquisition } from './acquititions.model';

export type EntityResponseType = HttpResponse<Acquisition>;

@Injectable({
  providedIn: 'root'
})
export class AcquititionsService {

  private serverUrl = SERVER_GO + 'acquititions';

  constructor(private http: HttpClient) { }

  filter(req?: any): Observable<HttpResponse<Acquisition[]>> {
    let newResourceUrl = null;
    let result = null;
    Object.keys(req).forEach((key) => {
    });

    newResourceUrl = this.serverUrl + `/filter`;

    result = this.http.post<Acquisition[]>(newResourceUrl, req['filter'], { observe: 'response' });

    return result;
  }

  save(benner: Acquisition): Observable<EntityResponseType> {
    const copy = this.convert(benner);
    const result = this.http.post<Acquisition>(`${this.serverUrl}`, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertResponse(res)));

    return result;
  }

 delete(id?: number): Observable<HttpResponse<Acquisition>> {
        const newResourceUrl = this.serverUrl + `/delete/${id}`;
        return this.http.delete(`${newResourceUrl}`, { observe: 'response' })
            .pipe(
                tap(results => console.log('raw ', results))
            );
    }
  private convert(acquititions: Acquisition): Acquisition {
    const copy: Acquisition = Object.assign({}, acquititions);
    return copy;
  }

  private convertResponse(res: EntityResponseType): EntityResponseType {
    const body: Acquisition = this.convertItemFromServer(res.body);
    return res.clone({ body });
  }

  private convertItemFromServer(product: Acquisition): Acquisition {
    const copyOb: Acquisition = Object.assign({}, product);
    return copyOb;
  }
}
