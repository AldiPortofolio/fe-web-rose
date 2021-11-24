import { Injectable, Version } from '@angular/core';
import { SERVER_GO } from 'src/app/shared/constants/base-constant';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { VersionApp } from './version-app.model';
import { map } from 'rxjs/operators';

export type EntityResponseType = HttpResponse<VersionApp>;


@Injectable({
  providedIn: 'root'
})
export class VersionAppService {
    private serverUrl = SERVER_GO + 'version-app';

    constructor(private http: HttpClient) { }
    
    getVersion(): Observable<EntityResponseType> {
        return this.http.get<VersionApp>(`${this.serverUrl}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertResponse(res)));
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: VersionApp = this.convertItemFromServer(res.body);
        return res.clone({ body });
    }

    private convertItemFromServer(versionApp: VersionApp): VersionApp {
        const copyOb: VersionApp = Object.assign({}, versionApp);
        return copyOb;
    }

    udpate(appName?: string, version?: string): Observable<HttpResponse<VersionApp>> {
        let newresourceUrl = null;

        const req = {
            "appName": appName,
            "version": version
        }

        newresourceUrl = this.serverUrl + `/update`;
        return this.http.post<VersionApp>(newresourceUrl, req, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertResponse(res)));

    }
}


