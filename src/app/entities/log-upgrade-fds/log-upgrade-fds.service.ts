import { Injectable } from '@angular/core';
import { HttpResponse, HttpClient } from '@angular/common/http';
import { SERVER_GO } from 'src/app/shared/constants/base-constant';
import { Observable } from 'rxjs';
import { LogUpgradeFds } from './log-upgrade-fds.model';
import { map } from 'rxjs/operators';

export type EntityResponseType = HttpResponse<LogUpgradeFds>;

@Injectable({
  providedIn: 'root'
})
export class LogUpgradeFdsService {

    private serverUrl = SERVER_GO + 'upgrade-fds';

    constructor(private http: HttpClient) { }

    filter(req?: any): Observable<HttpResponse<LogUpgradeFds[]>> {
        let newResourceUrl = null;
        let result = null;
        Object.keys(req).forEach((key) => {
        });

        newResourceUrl = this.serverUrl + `/filter`;

        result = this.http.post<LogUpgradeFds[]>(newResourceUrl, req['filter'], { observe: 'response' });

        return result;
    }

    save(data: LogUpgradeFds): Observable<EntityResponseType> {
        const copy = this.convert(data);
        const result = this.http.post<LogUpgradeFds>(`${this.serverUrl}`, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertResponse(res)));

        return result;
    }

    private convert(data: LogUpgradeFds): LogUpgradeFds {
        const copy: LogUpgradeFds = Object.assign({}, data);
        return copy;
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: LogUpgradeFds = this.convertItemFromServer(res.body);
        return res.clone({ body });
    }

    private convertItemFromServer(data: LogUpgradeFds): LogUpgradeFds {
        const copyOb: LogUpgradeFds = Object.assign({}, data);
        return copyOb;
    }
}
