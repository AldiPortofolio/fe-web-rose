import { Injectable } from '@angular/core';
import { SERVER_GO } from 'src/app/shared/constants/base-constant';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GenerateQrService {

  private serverUrl = SERVER_GO + 'generate-qr';

  constructor(private http: HttpClient) { }

  generate(req?: any): Observable<HttpResponse<any>> {
    let newResourceUrl = null;
    let result = null;
    Object.keys(req).forEach((key) => {
    });

    newResourceUrl = this.serverUrl + `/generate`;

    result = this.http.post<any[]>(newResourceUrl, req['filter'], { observe: 'response' });

    return result;
  }

}
