import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SERVER_GO } from 'src/app/shared/constants/base-constant';
import { MonitoringAktivasiFds } from './monitoring-aktivasi-fds.model';

@Injectable({
  providedIn: 'root'
})
export class MonitoringAktivasiFdsService {

  private serverUrl = SERVER_GO+ 'monitoring-activation-fds';


    constructor(private http: HttpClient) { }

    filter(req?: any): Observable<HttpResponse<MonitoringAktivasiFds[]>> {
        let newResourceUrl = null;
        let result = null;
        Object.keys(req).forEach((key) => {
        });

        newResourceUrl = this.serverUrl + `/filter`;

        result = this.http.post<MonitoringAktivasiFds[]>(newResourceUrl, req['filter'], { observe: 'response' });

        return result;
    }

     
}
