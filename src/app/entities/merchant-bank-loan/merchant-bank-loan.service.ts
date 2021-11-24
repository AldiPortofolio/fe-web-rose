import { Injectable } from '@angular/core';
import { HttpResponse, HttpClient } from '@angular/common/http';
import { MerchantBankLoan } from './merchant-bank-loan.model';
import { SERVER_GO } from 'src/app/shared/constants/base-constant';
import { Observable } from 'rxjs';
import { SubMerchantBankLoan } from './sub-merchant-bank-loan.model';

export type EntityResponseType = HttpResponse<MerchantBankLoan>;

@Injectable({
  providedIn: 'root'
})
export class MerchantBankLoanService {

	private serverUrl = SERVER_GO + 'merchant-bank-loan';

	constructor(private http: HttpClient) { }

	filter(req?: any): Observable<HttpResponse<MerchantBankLoan[]>> {
		let newResourceUrl = null;
		let result = null;
		Object.keys(req).forEach((key) => {
		});

		newResourceUrl = this.serverUrl + `/filter`;

		result = this.http.post<MerchantBankLoan[]>(newResourceUrl, req['filter'], { observe: 'response' });

		return result;
	}

	findSub(req?: any): Observable<HttpResponse<SubMerchantBankLoan[]>> {
		let newResourceUrl = null;
		let result = null;
		Object.keys(req).forEach((key) => {
		});

		newResourceUrl = this.serverUrl + `/find-sub`;

		result = this.http.post<SubMerchantBankLoan[]>(newResourceUrl, req['filter'], { observe: 'response' });

		return result;
	}

}
