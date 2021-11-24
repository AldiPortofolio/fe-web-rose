import { Injectable } from '@angular/core';
import { SERVER_GO } from 'src/app/shared/constants/base-constant';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ClearSession } from './clear-session.model';
import { map } from 'rxjs/operators';

export type EntityResponseType = HttpResponse<ClearSession>;


@Injectable({
  providedIn: 'root'
})
export class ClearSessionService {

    private serverUrl = SERVER_GO + 'clear-session';

    constructor(private http: HttpClient) { }

    getLastUpdated(): Observable<EntityResponseType> {
        let newresourceUrl = this.serverUrl + `/last-updated`;

        return this.http.get<ClearSession>(newresourceUrl, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertResponse(res)));
    }

    clear(): Observable<EntityResponseType> {
        let newresourceUrl = this.serverUrl;

        return this.http.get<ClearSession>(newresourceUrl, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertResponse(res)));
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: ClearSession = this.convertItemFromServer(res.body);
        return res.clone({ body });
    }

    private convertItemFromServer(clearSession: ClearSession): ClearSession {
        const copyOb: ClearSession = Object.assign({}, clearSession);
        return copyOb;
    }
}
