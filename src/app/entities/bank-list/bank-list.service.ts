import { Injectable } from '@angular/core';
import { HttpResponse, HttpClient } from '@angular/common/http';
import { BankList } from './bank-list.model';
import { SERVER_GO } from 'src/app/shared/constants/base-constant';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


export type EntityResponseType = HttpResponse<BankList>;


@Injectable({
  providedIn: 'root'
})
export class BankListService {

    private serverUrl = SERVER_GO + 'bank-list';

    constructor(private http: HttpClient) { }

    filter(req?: any): Observable<HttpResponse<BankList[]>>{
        let newResourceUrl = null;
        let result = null;
        Object.keys(req).forEach((key) => {
        });

        newResourceUrl = this.serverUrl + `/filter`;

        result = this.http.post<BankList[]>(newResourceUrl, req['filter'], { observe: 'response' });

        return result;
    }

    save(banklist: BankList): Observable<EntityResponseType> {
        const copy = this.convert(banklist);
        const result = this.http.post<BankList>(`${this.serverUrl}`, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertResponse(res)));

        return result;
    }

    private convert(banklist: BankList): BankList {
        const copy: BankList = Object.assign({}, banklist);
        return copy;
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: BankList = this.convertItemFromServer(res.body);
        return res.clone({ body });
    }

    private convertItemFromServer(banklist: BankList): BankList {
        const copyOb: BankList = Object.assign({}, banklist);
        return copyOb;
    }


}
