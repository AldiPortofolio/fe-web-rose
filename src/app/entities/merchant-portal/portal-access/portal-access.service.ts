import { Injectable } from '@angular/core';
import { HttpResponse, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PortalAccess, BusinessPortal, ReqBusinessPortal } from './portal-access.model';
import { SERVER_GO, SERVER_BISNIS_PORTAL } from 'src/app/shared/constants/base-constant';
import { tap } from 'rxjs/operators';
import { OutletActivation } from '../outlet-activation/outlet-activation.model';

@Injectable({
  providedIn: 'root'
})
export class PortalAccessService {

  private serverUrlGo = SERVER_GO + 'portal/';

  constructor(private http: HttpClient) { }

  filter(req?: any): Observable<HttpResponse<PortalAccess[]>> {

    let newresourceUrl = null;

    newresourceUrl = this.serverUrlGo + `list-account/filter`;
    return this.http.post<PortalAccess[]>(newresourceUrl, req, { observe: 'response' })
      .pipe(
        tap(results => console.log('raw ', results))
      );
  }

  activation(req?: ReqBusinessPortal): Observable<HttpResponse<BusinessPortal>> {

    let newresourceUrl = null;

    newresourceUrl = this.serverUrlGo + `bpactivation`;
    return this.http.post<BusinessPortal>(newresourceUrl, req, { observe: 'response' })
      .pipe(
        tap(results => console.log('raw ', results))
      );
  }

  sendEmail(req?: any): Observable<HttpResponse<PortalAccess>> {

    let newresourceUrl = null;

    newresourceUrl = this.serverUrlGo + `activation`;
    return this.http.post<PortalAccess>(newresourceUrl, req, { observe: 'response' })
      .pipe(
        tap(results => console.log('raw ', results))
      );
  }

  deactivate(req?: any): Observable<HttpResponse<PortalAccess>> {

    let newresourceUrl = null;

    newresourceUrl = SERVER_BISNIS_PORTAL + `deactivation`;
    return this.http.post<PortalAccess>(newresourceUrl, req, { observe: 'response' })
      .pipe(
        tap(results => console.log('raw ', results))
      );
  }

  resetPassword(req?: any): Observable<HttpResponse<PortalAccess>> {
    let newresourceUrl = null;

    newresourceUrl = this.serverUrlGo + `reset-password`;
    return this.http.post<PortalAccess>(newresourceUrl, req, { observe: 'response' })
      .pipe(
        tap(results => console.log('raw ', results))
      );
  }

  resetPasswordBp(req?: any): Observable<HttpResponse<PortalAccess>> {
    let newresourceUrl = null;

    newresourceUrl = this.serverUrlGo + `reset-password-bp`;
    return this.http.post<PortalAccess>(newresourceUrl, req, { observe: 'response' })
      .pipe(
        tap(results => console.log('raw ', results))
      );
  }

  filterOutlet(req?: any): Observable<HttpResponse<OutletActivation[]>> {

    let newresourceUrl = null;

    newresourceUrl = this.serverUrlGo + `/list-outlet/filter`;
    return this.http.post<OutletActivation[]>(newresourceUrl, req, { observe: 'response' })
      .pipe(
        tap(results => console.log('raw ', results))
      );
  }
}
