import { Injectable } from '@angular/core';
import { SERVER_GO } from 'src/app/shared/constants/base-constant';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BlastNotifService {

  private serverUrl = SERVER_GO + 'blast-notif';


  constructor(private http: HttpClient) { }

  sendAll(req?:any): Observable<HttpResponse<any>> {
    let newResourceUrl = null;
    let result = null;

    newResourceUrl = this.serverUrl + `/send-all`;

    result = this.http.post<any>(newResourceUrl, req['filter'], { observe: 'response' });

    return result;
  }

}
