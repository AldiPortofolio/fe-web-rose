import { Injectable } from '@angular/core';
import { HttpResponse, HttpClient } from '@angular/common/http';
import { ValidationCodeMasterTag } from './validation-code-master-tag.model';
import { SERVER_GO } from 'src/app/shared/constants/base-constant';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export type EntityResponseType = HttpResponse<ValidationCodeMasterTag>;

@Injectable({
  providedIn: 'root'
})
export class ValidationCodeMasterTagService {

    private serverUrl = SERVER_GO + 'validation-code-master-tag';

    constructor(private http: HttpClient) { }

    filter(req?: any): Observable<HttpResponse<ValidationCodeMasterTag[]>> {
        let newResourceUrl = null;
        let result = null;
        Object.keys(req).forEach((key) => {
        });

        newResourceUrl = this.serverUrl + `/filter`;

        result = this.http.post<ValidationCodeMasterTag[]>(newResourceUrl, req['filter'], { observe: 'response' });

        return result;
    }

    save(validationCode: ValidationCodeMasterTag): Observable<EntityResponseType> {
        const copy = this.convert(validationCode);
        const result = this.http.post<ValidationCodeMasterTag>(`${this.serverUrl}`, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertResponse(res)));

        return result;
    }

    private convert(validationCode: ValidationCodeMasterTag): ValidationCodeMasterTag {
        const copy: ValidationCodeMasterTag = Object.assign({}, validationCode);
        return copy;
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: ValidationCodeMasterTag = this.convertItemFromServer(res.body);
        return res.clone({ body });
    }

    private convertItemFromServer(validationCode: ValidationCodeMasterTag): ValidationCodeMasterTag {
        const copyOb: ValidationCodeMasterTag = Object.assign({}, validationCode);
        return copyOb;
    }
}
