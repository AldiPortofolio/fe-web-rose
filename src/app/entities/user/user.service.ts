import { Injectable } from '@angular/core';
import { SERVER_PATH, SERVER, AUTH_PATH, SERVER_GO } from 'src/app/shared/constants/base-constant';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from './user.model';
import { createRequestOption } from 'src/app/shared/httpUtil';
import { tap, map } from 'rxjs/operators';
// import { sha512 } from 'js-sha512';
import * as sha512 from 'js-sha512';


export type EntityResponseType = HttpResponse<User>;

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private serverUrl = SERVER_PATH + 'user';

  constructor(private http: HttpClient) { }

  filter(req?: any): Observable<HttpResponse<User[]>> {
    const options = createRequestOption(req);
    let allData = null;
    let pageNumber = null;
    let pageCount = null;
    let newresourceUrl = null;

    Object.keys(req).forEach((key) => {
        if (key === 'allData') {
            allData = req[key];
        }
        if (key === 'page') {
            pageNumber = req[key];
        }
        if (key === 'count') {
            pageCount = req[key];
        }
    });

    newresourceUrl = this.serverUrl + `/filter/page/${pageNumber}/count/${pageCount}`;
    return this.http.post<User[]>(newresourceUrl, req['filter'], {  observe: 'response' })
        .pipe(
            tap(results => console.log('raw ', results ) )
        );
    }

    save(user: User): Observable<EntityResponseType> {
        const copy = this.convert(user);
        console.log('prepare post++', copy, '++', `${this.serverUrl}`);

        return this.http.post<User>(`${this.serverUrl}`, copy, { observe: 'response'})
            .pipe(map((res: EntityResponseType) => this.convertResponse(res)));
    }

    logout(): void {
        const newresourceUrl = `${AUTH_PATH}logout`;

        this.http.post<User>(`${newresourceUrl}`, null).toPromise();
    }

    changePassword(userName, credential): Observable<EntityResponseType> {

        console.log(userName, credential);

        const data = {
            username: userName,
            oldPass: sha512.sha512(userName + credential.oldPass),
            newPass: sha512.sha512(userName + credential.newPass)
        };
        const result = this.http.post<User>(SERVER + `auth/update-password`, data, { observe: 'response' });
        //     .pipe(map())

        return result;
    }

    updatePassword(userName, credential): Observable<EntityResponseType> {

        console.log(userName, credential);

        const data = {
            username: userName,
            oldPass: sha512.sha512(userName + credential.oldPass),
            newPass: sha512.sha512(userName + credential.newPass)
        };
        const result = this.http.post<User>(SERVER_GO + `app-user/update`, data, { observe: 'response' });
        //     .pipe(map())

        return result;
    }


    getCurrentUser(): Observable<HttpResponse<User>> {
        const newresourceUrl = this.serverUrl + `/current-user`;

        return this.http.get<User> (newresourceUrl, { observe: 'response' });
    }

    resetP(idUser): Observable<HttpResponse<User>> {
        const newresourceUrl = SERVER + `auth/${idUser}/resetpassword`;
        return this.http.get<User>(newresourceUrl, { observe: 'response' });
    }

    forceLogout(idUser): Observable<HttpResponse<User>> {
        const newresourceUrl = SERVER + `auth/${idUser}/forceLogout`;
        return this.http.get<User>(newresourceUrl, { observe: 'response' });
    }

    openLocked(idUser): Observable<HttpResponse<User>> {
        const newresourceUrl = SERVER + `auth/${idUser}/openLocked`;
        return this.http.get<User>(newresourceUrl, { observe: 'response' });
    }

    updateStatus(idUser): Observable<HttpResponse<User>> {
        const newresourceUrl = SERVER + `auth/${idUser}/updateStatus`;
        return this.http.get<User>(newresourceUrl, { observe: 'response' });
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        console.log('convert response');
        const body: User = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to memberBank.
     */
    private convertItemFromServer(user: User): User {
      const copyOb: User = Object.assign({}, user);
      return copyOb;
    }

        /**
     * Convert a Member to a JSON which can be sent to the server.
     */
    private convert( user: User): User {
        const copy: User = Object.assign({}, user);
        return copy;
    }

}

