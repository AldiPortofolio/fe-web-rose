import { Injectable } from '@angular/core';
import { SERVER_GO } from 'src/app/shared/constants/base-constant';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AkuisisiSfa, AkuisisiSfaFailed } from './akuisisi-sfa.model';

@Injectable({
  providedIn: 'root'
})
export class AkuisisiSfaService {

    private serverUrl = SERVER_GO+ 'akuisisi-sfa';


    constructor(private http: HttpClient) { }

    filter(req?: any): Observable<HttpResponse<AkuisisiSfa[]>> {
        let newResourceUrl = null;
        let result = null;
        Object.keys(req).forEach((key) => {
        });

        newResourceUrl = this.serverUrl + `/filter`;

        result = this.http.post<AkuisisiSfa[]>(newResourceUrl, req['filter'], { observe: 'response' });

        return result;
    }

    filterFailed(req?: any): Observable<HttpResponse<AkuisisiSfaFailed[]>> {
        let newResourceUrl = null;
        let result = null;
        Object.keys(req).forEach((key) => {
        });

        newResourceUrl =  SERVER_GO + `akuisisi-sfa-failed/filter`;

        result = this.http.post<AkuisisiSfaFailed>(newResourceUrl, req['filter'], { observe: 'response' });

        return result;
    }

     export(req?: any): Observable<any> {

        let newresourceUrl =  SERVER_GO + `report-export-akuisisi-sfa/send`;
        return this.http.post(newresourceUrl, req, { observe: 'response' })

    }
}
