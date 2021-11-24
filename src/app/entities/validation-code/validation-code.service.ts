import { Injectable } from '@angular/core';
import { HttpResponse, HttpClient } from '@angular/common/http';
import { ValidationCode } from './validation-code.model';
import { SERVER_GO } from 'src/app/shared/constants/base-constant';
import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

export type EntityResponseType = HttpResponse<ValidationCode>;


@Injectable({
  providedIn: 'root'
})
export class ValidationCodeService {
    private dataSource = new BehaviorSubject<number>(0);
    dataSharing = this.dataSource.asObservable();

    private serverUrl = SERVER_GO + 'validation-code';

    constructor(private http: HttpClient) { }

    filter(req?: any): Observable<HttpResponse<ValidationCode[]>> {
        let newResourceUrl = null;
        let result = null;
        Object.keys(req).forEach((key) => {
        });

        newResourceUrl = this.serverUrl + `/filter`;

        result = this.http.post<ValidationCode[]>(newResourceUrl, req['filter'], { observe: 'response' });

        return result;
    }

    save(validationCode: ValidationCode): Observable<EntityResponseType> {
        const copy = this.convert(validationCode);
        const result = this.http.post<ValidationCode>(`${this.serverUrl}`, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertResponse(res)));

        return result;
    }

    private convert(validationCode: ValidationCode): ValidationCode {
        const copy: ValidationCode = Object.assign({}, validationCode);
        return copy;
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: ValidationCode = this.convertItemFromServer(res.body);
        return res.clone({ body });
    }

    private convertItemFromServer(validationCode: ValidationCode): ValidationCode {
        const copyOb: ValidationCode = Object.assign({}, validationCode);
        return copyOb;
    }

    sendData(id: number) {
        this.dataSource.next(id);
    }
}
