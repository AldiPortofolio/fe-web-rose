// import { Injectable } from '@angular/core';

// @Injectable({
//   providedIn: 'root'
// })
// export class MccService {

//   constructor() { }
// }

import { Injectable } from '@angular/core';
import { SERVER_PATH } from 'src/app/shared/constants/base-constant';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Mcc } from './mcc.model';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MccService {

  private serverUrl = SERVER_PATH + 'mcc';

  constructor(private http: HttpClient) { }

  getAll(): Observable<HttpResponse<Mcc[]>> {
    let newResourceUrl = null;

    newResourceUrl = this.serverUrl + '/all';

    const result = this.http.get<Mcc[]>(newResourceUrl, { observe: 'response' }).pipe(
      tap(results => console.log('raw', results))
    );

    return result;
  }
}
