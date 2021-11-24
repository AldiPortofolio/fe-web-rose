import { Injectable } from '@angular/core';
import { Observable, observable } from 'rxjs';
// import { Lookup } from './lookup.model';
import { LookupDto } from './lookup-dto.model';
import { HttpResponse, HttpClient } from '@angular/common/http';
import { SERVER_PATH, SERVER_GO, SERVER } from 'src/app/shared/constants/base-constant';
import { map, tap } from 'rxjs/operators';
import { Lookup } from './lookup.model';
import { MasterDataApproval } from '../master-data-approval/master-data-approval.model';

export type EntityResponseType = HttpResponse<Lookup>;
export type EntityResponseTypeMda = HttpResponse<MasterDataApproval>;
// export type EntityResponseTypeDto = HttpResponse<LookupDto>;


@Injectable({
    providedIn: 'root'
})
export class LookupService {

    private serverUrl = SERVER_PATH + 'lookup';
    private serverGo = SERVER_GO + 'lookup';


    constructor(private http: HttpClient) { }




    findForMerchantGroup():  Observable<HttpResponse<LookupDto[]>> {
        // return this.http.get<LookupDto[]>(this.serverUrl + `/all/redis`, {  observe: 'response' })
        return this.http.get<LookupDto[]>(this.serverUrl + `/merchantGroup`, {  observe: 'response' })
            .pipe(
                tap(merchantGrouplist => console.log('raw ', merchantGrouplist ) )
                );
    }

    save(data: Lookup): Observable<EntityResponseType> {
        const copy = this.convert(data);
        const result = this.http.post<Lookup>(`${this.serverGo}`, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertResponse(res)));

        return result;
    }

    repair(lookup: Lookup, idMda: Number): Observable<EntityResponseType> {
        const copy = this.convert(lookup);
        const newResourceUrl = this.serverUrl + `/repair/${idMda}`;
        return this.http.post<Lookup>(newResourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertResponse(res)));
    }

    saveRiskProfiler(lookupGroup: String, lookupList: Lookup[] ): Observable<EntityResponseTypeMda> {
        console.log(lookupGroup);
        console.log(lookupList);

        // return null;
        return this.http.post<MasterDataApproval>(this.serverUrl + `/risk-profiler/` + lookupGroup, lookupList, { observe: 'response'})
            .pipe(map((res: EntityResponseTypeMda) => this.convertListResponse(res)));
    }

    repairRiskProfiler(lookupGroup: String, lookupList: Lookup[], idMda: number): Observable<EntityResponseTypeMda> {
        console.log(lookupGroup);
        console.log(lookupList);
        const newResourceUrl = this.serverUrl + `/risk-profiler/` + lookupGroup + `/repair/${idMda}`;

        return this.http.post<MasterDataApproval>(newResourceUrl, lookupList, { observe: 'response' })
            .pipe(map((res: EntityResponseTypeMda) => this.convertListResponse(res)));
    }

    filter(req?: any): Observable<HttpResponse<Lookup[]>> {
        let newResourceUrl = null;
        let result = null;
        Object.keys(req).forEach((key) => {
        });

        newResourceUrl = this.serverGo + `/filter`;

        result = this.http.post<Lookup[]>(newResourceUrl, req['filter'], { observe: 'response' });

        return result;
    }

    findByName(req?: any): Observable<HttpResponse<Lookup[]>> {
        let groupName = null;
        let newresourceUrl = null;


        Object.keys(req).forEach((key) => {
            if (key === 'groupName') {
                groupName = req[key];
            }
        });

        newresourceUrl = this.serverUrl + `/name/${groupName}`;

        return this.http.get<Lookup[]>(newresourceUrl, { observe: 'response' });

    }

    // find all job risk data
    findNameWithRisk(name?: String): Observable<HttpResponse<Lookup[]>> {
        let newresourceUrl = null;

        newresourceUrl = this.serverUrl + `/name/${name}/isHighRisk/1`;
        return this.http.get<Lookup[]>(newresourceUrl, { observe: 'response' });
    }

    getFromMda(id): Observable<HttpResponse<Lookup[]>> {
        const newresourceUrl = this.serverUrl + `/getFromMda/${id}`;
        return this.http.get<Lookup[]> (newresourceUrl, {observe: 'response'});
    }

    getRiskFromMda(id): Observable<HttpResponse<[]>> {
        const newresourceUrl = this.serverUrl + `/risk-profiler/getFromMda/${id}`;
        return this.http.get<[]> (newresourceUrl, {observe: 'response'});
    }

    approveFromMda(id): Observable<Lookup> {
        const newresourceUrl = this.serverUrl  + `/approveMda/${id}`;
        return this.http.post<Lookup> (newresourceUrl, { observe: 'response'});
    }

    approveRiskFromMda(id): Observable<MasterDataApproval> {
        const newresourceUrl = this.serverUrl  + `/risk-profiler/approveMda/${id}`;
        return this.http.post<MasterDataApproval> (newresourceUrl, { observe: 'response'});
    }

    private convert( lookup: Lookup): Lookup {
        const copy: Lookup = Object.assign({}, lookup);
        return copy;
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: Lookup = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertListResponse(res: EntityResponseTypeMda): EntityResponseTypeMda {
        const body: MasterDataApproval = this.convertListItemFromServer(res.body);
        return res.clone({body});
    }

    private convertItemFromServer(lookup: Lookup): Lookup {
        const copyOb: Lookup = Object.assign({}, lookup);
        return copyOb;
    }

    private convertListItemFromServer(mda: MasterDataApproval): MasterDataApproval {
        const copyOb: MasterDataApproval = Object.assign({}, mda);
        return copyOb;
    }

}
