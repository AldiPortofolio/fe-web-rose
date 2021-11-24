import { Injectable } from '@angular/core';
import { HttpResponse, HttpClient } from '@angular/common/http';
import { MasterTag } from './master-tag.model';
import { SERVER_GO } from 'src/app/shared/constants/base-constant';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


export type EntityResponseType = HttpResponse<MasterTag>;

@Injectable({
  providedIn: 'root'
})
export class MasterTagService {

    private serverUrl = SERVER_GO + 'master-tag';

    constructor(private http: HttpClient) { }

    filter(req?: any): Observable<HttpResponse<MasterTag[]>> {
        let newResourceUrl = null;
        let result = null;
        Object.keys(req).forEach((key) => {
        });

        newResourceUrl = this.serverUrl + `/filter`;

        result = this.http.post<MasterTag[]>(newResourceUrl, req['filter'], { observe: 'response' });

        return result;
    }

    getAll(): Observable<HttpResponse<MasterTag[]>> {
        let newResourceUrl = null;
        let result = null;

        newResourceUrl = this.serverUrl + `/all`;

        result = this.http.get<MasterTag[]>(newResourceUrl, { observe: 'response' });

        return result;
    }

    save(masterTag: MasterTag): Observable<EntityResponseType> {
        const copy = this.convert(masterTag);
        const result = this.http.post<MasterTag>(`${this.serverUrl}`, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertResponse(res)));

        return result;
    }

    private convert(masterTag: MasterTag): MasterTag {
        const copy: MasterTag = Object.assign({}, masterTag);
        return copy;
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: MasterTag = this.convertItemFromServer(res.body);
        return res.clone({ body });
    }

    private convertItemFromServer(masterTag: MasterTag): MasterTag {
        const copyOb: MasterTag = Object.assign({}, masterTag);
        return copyOb;
    }


}
