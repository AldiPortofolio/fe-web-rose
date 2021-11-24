import { Injectable } from '@angular/core';
import { HttpResponse, HttpClient } from '@angular/common/http';
import { SERVER_GO } from 'src/app/shared/constants/base-constant';
import { ImageManagement } from './image-management.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export type EntityResponseType = HttpResponse<ImageManagement>;

@Injectable({
  providedIn: 'root'
})
export class ImageManagementService {

  private serverUrl = SERVER_GO + 'image-management';

  constructor(private http: HttpClient) { }

  filter(req?: any): Observable<HttpResponse<ImageManagement[]>> {
    let newResourceUrl = null;
    let result = null;
    Object.keys(req).forEach((key) => {
    });

    newResourceUrl = this.serverUrl + `/filter`;

    result = this.http.post<ImageManagement[]>(newResourceUrl, req['filter'], { observe: 'response' });

    return result;
  }

  save(limitTransaction: ImageManagement): Observable<EntityResponseType> {
    const copy = this.convert(limitTransaction);
    const result = this.http.post<ImageManagement>(`${this.serverUrl}`, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertResponse(res)));

    return result;
  }

  private convert(imageManagement: ImageManagement): ImageManagement {
    const copy: ImageManagement = Object.assign({}, imageManagement);
    return copy;
  }

  private convertResponse(res: EntityResponseType): EntityResponseType {
    const body: ImageManagement = this.convertItemFromServer(res.body);
    return res.clone({ body });
  }

  private convertItemFromServer(imageManagement: ImageManagement): ImageManagement {
    const copyOb: ImageManagement = Object.assign({}, imageManagement);
    return copyOb;
  }
}
