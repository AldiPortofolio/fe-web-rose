import { Injectable } from '@angular/core';
import { SERVER_GO } from 'src/app/shared/constants/base-constant';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LevelMerchant } from './level-merchant.model';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LevelMerchantService {

    private serverUrl = SERVER_GO + 'level-merchant';

    constructor(private http: HttpClient) { }

    getAllLevelMerchant(limit: number): Observable<HttpResponse<LevelMerchant[]>> {
        let newResourceUrl = null;

        newResourceUrl = this.serverUrl + `/${limit}`;

        const result = this.http.get<LevelMerchant[]>(newResourceUrl, { observe: 'response' }).pipe(
            tap(results => console.log('raw', results))
        );

        return result;
    }

}
