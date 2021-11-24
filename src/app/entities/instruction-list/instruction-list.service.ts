import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { SERVER_GO } from 'src/app/shared/constants/base-constant';
import { InstructionList } from './instruction-list.model';

export type EntityResponseType = HttpResponse<InstructionList>;

@Injectable({
  providedIn: 'root'
})
export class InstructionListService {

  private serverUrl = SERVER_GO + 'instruction-list';

  constructor(private http: HttpClient) { }

  filter(req?: any): Observable<HttpResponse<InstructionList[]>> {
    let newResourceUrl = null;
    let result = null;
    Object.keys(req).forEach((key) => {
    });

    newResourceUrl = this.serverUrl + `/filter`;

    result = this.http.post<InstructionList[]>(newResourceUrl, req['filter'], { observe: 'response' });

    return result;
  }

  save(instructionList : InstructionList): Observable<EntityResponseType> {
    const copy = this.convert(instructionList);
    const result = this.http.post<InstructionList>(`${this.serverUrl}`, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertResponse(res)));

    return result;
  }

 delete(id?: number): Observable<HttpResponse<InstructionList>> {
        const newResourceUrl = this.serverUrl + `/delete/${id}`;
        return this.http.delete(`${newResourceUrl}`, { observe: 'response' })
            .pipe(
                tap(results => console.log('raw ', results))
            );
    }
  private convert(InstructionList: InstructionList): InstructionList {
    const copy: InstructionList = Object.assign({}, InstructionList);
    return copy;
  }

  private convertResponse(res: EntityResponseType): EntityResponseType {
    const body: InstructionList = this.convertItemFromServer(res.body);
    return res.clone({ body });
  }

  private convertItemFromServer(product: InstructionList): InstructionList {
    const copyOb: InstructionList = Object.assign({}, product);
    return copyOb;
  }
}
