import { Injectable } from '@angular/core';
import { SERVER_PATH, SERVER_GO } from 'src/app/shared/constants/base-constant';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
// import { EntityResponseType } from '../apupt/apupt.service';
import { map, tap } from 'rxjs/operators';
import { createRequestOption } from 'src/app/shared/httpUtil';
import { MerchantPartner, MerchantTag, MerchantWip, MerchantWipQueue } from './merchant-wip.model';
import { Merchant } from '../merchant/merchant.model';

import { MerchantOutlet } from '../merchant/merchant-outlet.model';
import { SettlementConfig } from '../merchant/merchant-settlement-config.model';

export type EntityResponseType = HttpResponse<MerchantWip>;

@Injectable({
    providedIn: 'root'
})
export class WorkInProgressService {
    private serverUrl = SERVER_PATH + 'merchantwip';
    private serverGo = SERVER_GO + 'merchant'
    private serverUrlOutlet = SERVER_PATH + 'merchantoutletwip';

    constructor(private http: HttpClient) { }

    saveWip(merchantWip: MerchantWip, action: number): Observable<EntityResponseType> {

        const newresourceUrl = this.serverUrl + `/action/${action}`;
        const result = this.http.post<MerchantWip>(newresourceUrl, merchantWip, { observe: 'response' });
        return result;
    }

    upgradeMerchant(merchantWip: MerchantWip):void {
        const body = {
            customerPhone: merchantWip.storePhoneNumber,
            idCard: merchantWip.ownerWIP.ownerNoID,
            merchantAddress: merchantWip.alamat,
            merchantCity: merchantWip.kabupatenKota,
            merchantPostalCode: merchantWip.postalCode,
            birthPlace: merchantWip.ownerWIP.ownerTempatLahir,
            merchantBod: merchantWip.ownerWIP.ownerTanggalLahir
        }
        const pathServer = this.serverGo + `/upgrade`;
        this.http.post<MerchantWip>(pathServer, body, { observe: 'response' })
            .subscribe(
                data => console.log('data-->', data),
                error => console.log('err => ', error)
            );

    }

    upgradeMerchantRetry(data: any): Observable<any> {
    
        const pathServer = this.serverGo + `/upgrade`;
        const result = this.http.post<MerchantWip>(pathServer, data, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertResponse(res)));

        // this.http.post<MerchantWip>(pathServer, data, { observe: 'response' })
        //     .subscribe(
        //         data => console.log('data-->', data),
        //         error => console.log('err => ', error)
        //     );

        return result;

    }

    saveMchtOutlet(merchantOutlets: MerchantOutlet[], idMerchant: number): Observable<HttpResponse<any>> {
        const newresourceUrl = this.serverUrlOutlet + `/merchantwipid/${idMerchant}`;
        const result = this.http.post<any>(newresourceUrl, merchantOutlets, { observe: 'response' });
        return result;
    }

    getWip(action: number): Observable<EntityResponseType> {

        const newresourceUrl = this.serverUrl + `/action/${action}`;
        const result = this.http.post<MerchantWip>(newresourceUrl, {}, { observe: 'response' });
        return result;
    }

    getMerchantWIPEddQueue(): Observable<HttpResponse<MerchantWipQueue[]>> {
        return this.http.get<MerchantWipQueue[]>(`${this.serverUrl}/queue-edd`, { observe: 'response' })
            .pipe(
                // map((res: HttpResponse<memberType[]>) => this.convertArrayResponse(res))
                tap(accessMatrixMenu => console.log('raw ', accessMatrixMenu))
                // console.log('observable ', accessMatrixMenu)
            );
    }

    getMerchantWIPApproveQueue(): Observable<HttpResponse<MerchantWipQueue[]>> {
        return this.http.get<MerchantWipQueue[]>(`${this.serverUrl}/queue-approve`, { observe: 'response' })
            .pipe(
                // map((res: HttpResponse<memberType[]>) => this.convertArrayResponse(res))
                tap(accessMatrixMenu => console.log('raw ', accessMatrixMenu))
                // console.log('observable ', accessMatrixMenu)
            );
    }

    getMerchantWIPVerificationQueue(): Observable<HttpResponse<MerchantWipQueue[]>> {
        return this.http.get<MerchantWipQueue[]>(`${this.serverUrl}/queue-verification`, { observe: 'response' })
            .pipe(
                // map((res: HttpResponse<memberType[]>) => this.convertArrayResponse(res))
                tap(accessMatrixMenu => console.log('raw ', accessMatrixMenu))
                // console.log('observable ', accessMatrixMenu)
            );
    }

    getMerchantWIPQueue(): Observable<HttpResponse<MerchantWipQueue[]>> {
        return this.http.get<MerchantWipQueue[]>(`${this.serverUrl}/all-queue`, { observe: 'response' })
            .pipe(
                // map((res: HttpResponse<memberType[]>) => this.convertArrayResponse(res))
                tap(accessMatrixMenu => console.log('raw ', accessMatrixMenu))
                // console.log('observable ', accessMatrixMenu)
            );
    }

    setPriority(idWipQueue: number, priority: number): Observable<HttpResponse<any>> {

        let req = {
            "id": idWipQueue,
            "priority": priority
        }
        const newresourceUrl = this.serverUrl + `/setpriority`;
        return this.http.post<any>(newresourceUrl, req, { responseType: 'text' as 'json' });
    }

    releaseUser(idWipQueue: number): Observable<HttpResponse<any>> {

        let req = {
            "id": idWipQueue,
        }
        const newresourceUrl = this.serverUrl + `/release-user`;
        return this.http.post<any>(newresourceUrl, req, { responseType: 'text' as 'json' });
    }

    setVip(idWipQueue: number, stateName: string): Observable<HttpResponse<any>>  {

        const newresourceUrl = this.serverUrl + `/` + stateName + `/setVip/` + idWipQueue;
        return this.http.post<any>(newresourceUrl, { responseType: 'text' as 'json' });
    }

    setVvip(idWipQueue: number, stateName: string): Observable<HttpResponse<any>> {

        const newresourceUrl = this.serverUrl + `/` + stateName + `/setvvip/` + idWipQueue;
        return this.http.post<any>(newresourceUrl, {responseType: 'text' as 'json' });
    }

    getStatusPriority(idMerchant: number): Observable<HttpResponse<string>> {
        const newresourceUrl = this.serverUrl + '/status-priority';
        const result = this.http.get<any>(`${newresourceUrl}/${idMerchant}`, { responseType: 'text' as 'json' });
        return result;
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<MerchantWip>(`${this.serverUrl}/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertResponse(res)));
    }

    filter(req?: any): Observable<HttpResponse<MerchantWip[]>> {
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
        return this.http.post<MerchantWip[]>(newresourceUrl, req['filter'], { observe: 'response' })
            .pipe(
                tap(results => console.log('raw ', results))
            );
    }

    /**
     * Dashboard
     * */
    getDataDashboard(): Observable<HttpResponse<Map<string, number>>> {
        const newresourceUrl = this.serverUrl + `/dashboard-wip`;
        const result =  this.http.get<Map<string, number>>(`${newresourceUrl}`, { observe: 'response' });

        return result;
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        console.log('convert response');
        const body: MerchantWip = this.convertItemFromServer(res.body);
        return res.clone({ body });
    }

    /**
     * Convert a returned JSON object to memberBank.
     */
    private convertItemFromServer(teroris: MerchantWip): MerchantWip {
        const copyOb: MerchantWip = Object.assign({}, teroris);
        return copyOb;
    }

    /**
    * Convert a Member to a JSON which can be sent to the server.
    */
    private convert(teroris: MerchantWip): MerchantWip {
        const copy: MerchantWip = Object.assign({}, teroris);
        return copy;
    }

    saveSettlementConfig(settlementConfig: SettlementConfig): Observable<HttpResponse<SettlementConfig>> {
        const newresourceUrl = SERVER_GO + `merchant-settlement-config`;
        const result = this.http.post<SettlementConfig>(newresourceUrl, settlementConfig, { observe: 'response' });
        return result;
    }


    getDataTag(merchantId: string): Observable<HttpResponse<MerchantTag[]>> {
        var data = {
            mid: merchantId
        }
        const newresourceUrl = SERVER_GO + `merchant-master-tag/find-by-mid`;
        const result = this.http.post<MerchantTag[]>(`${newresourceUrl}`, data ,{ observe: 'response' });

        return result;
    }

    getDataPartnerLink(req?: any): Observable<HttpResponse<MerchantPartner[]>> {
        const newresourceUrl = SERVER_GO + `partner-link/filter`

        return this.http.post<MerchantPartner[]>(`${newresourceUrl}`, req['filter'], { observe: 'response' })
            .pipe(
                tap(results => console.log('raw ', results))
            );
    }

    addPartner(req?: any): Observable<HttpResponse<MerchantPartner>> {
        const newresourceUrl = SERVER_GO + `partner-link`
        return this.http.post<MerchantPartner>(`${newresourceUrl}`, req['filter'], { observe: 'response' })
            .pipe(
                tap(results => console.log('raw ', results))
            );
    }

    deletePartner(id?: number): Observable<HttpResponse<MerchantPartner>> {
        const newresourceUrl = SERVER_GO + `partner-link/delete/${id}`
        return this.http.delete(`${newresourceUrl}`, { observe: 'response' })
            .pipe(
                tap(results => console.log('raw ', results))
            );
    }

}
