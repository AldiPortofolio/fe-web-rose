import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ValidationCodeService } from '../validation-code/validation-code.service';
import { TOTAL_RECORD_PER_PAGE } from 'src/app/shared/constants/base-constant';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ValidationCodeMasterTag } from './validation-code-master-tag.model';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { ValidationCodeMasterTagModalComponent } from './validation-code-master-tag.modal.component';
import { ValidationCodeMasterTagService } from './validation-code-master-tag.service';
import { Location } from '@angular/common';
import { MasterTagService } from '../master-tag/master-tag.service';
import { MasterTag } from '../master-tag/master-tag.model';

@Component({
  selector: 'op-validation-code-master-tag',
  templateUrl: './validation-code-master-tag.component.html',
  styleUrls: ['./validation-code-master-tag.component.css']
})
export class ValidationCodeMasterTagComponent implements OnInit {
	private sub: Subscription;
	validationCode: number;

	validationCodeMasterTagList: ValidationCodeMasterTag[];
	validationCodeMasterTag: ValidationCodeMasterTag;

	listMasterTag: MasterTag[];

	currPage = 1;
	totalData = 0;
	totalRecord = TOTAL_RECORD_PER_PAGE;
	searchTerm = {
		masterTagCode: '',
		validationCodeId: this.validationCode,

		page: 1,
		limit: 10,
	};

	closeResult: string;

	constructor(private validationCodeService: ValidationCodeService,
		private modalService: NgbModal,
		private location: Location,
		private masterTagService: MasterTagService,
		private validationCodeMasterTagService: ValidationCodeMasterTagService,
		private ngxService: NgxUiLoaderService) { }
	
	ngOnInit() {
		this.validationCodeService.dataSharing.subscribe(
			data => this.validationCode = data
		);
		console.log('validationCode -->',this.validationCode);
		this.searchTerm.validationCodeId = this.validationCode;
		if(this.validationCode == 0) {
			this.goBack();
		}
		this.loadAllMasterTag();
		this.loadAll(this.currPage);


	}

	loadAll(page) {
		this.ngxService.start(); // start loader
		this.searchTerm.page = page
		this.searchTerm.limit = this.totalRecord

		this.validationCodeMasterTagService.filter({
			filter: this.searchTerm,
		})
			.subscribe(
				(res: HttpResponse<ValidationCodeMasterTag[]>) => this.onSuccess(res.body, res.headers),
				(res: HttpErrorResponse) => this.onError(res.message)
			);
	}

	private onSuccess(data, headers) {
		this.ngxService.stop();
		if (data.contents.length < 0) {
			return;
		}
		console.log(data);
		this.validationCodeMasterTagList = data.contents;
		this.totalData = data.totalData;
	}

	private onError(error) {
		this.ngxService.stop();
		console.log('error..', error);
	}

	loadAllMasterTag() {
		this.masterTagService.getAll()
			.subscribe(
				(res: HttpResponse<MasterTag[]>) => this.onSuccessMasterTag(res.body, res.headers),
				(res: HttpErrorResponse) => this.onError(res.message)
			);
	}

	private onSuccessMasterTag(data, headers) {
		this.ngxService.stop();
		if (data.contents.length < 0) {
			return;
		}
		console.log(data);
		this.listMasterTag = data.contents;
	}

	loadPage() {
		this.loadAll(this.currPage);
	}

	onFilter() {
		this.loadAll(this.currPage);
	}

	resetFilter() {
		this.searchTerm = {
			masterTagCode :'',
			validationCodeId: this.validationCode,
			page: 1,
			limit: 10,
		};
		this.loadAll(1);
	}

	open(status, message) {
		const modalRef = this.modalService.open(ValidationCodeMasterTagModalComponent, { size: 'lg' });
		modalRef.componentInstance.statusRec = status;
		modalRef.componentInstance.objEdit = message;
		modalRef.componentInstance.listMasterTag = this.listMasterTag;
		modalRef.componentInstance.validationCodeId = this.validationCode;

		modalRef.result.then((result) => {
			this.closeResult = `Closed with: ${result}`;
			console.log(this.closeResult);
			this.currPage = 1;
			this.loadAll(this.currPage);
		}, (reason) => {
			this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
			this.currPage = 1;
			this.loadAll(this.currPage);
		});
	}

	private getDismissReason(reason: any): string {
		console.log(reason);
		return reason;
	}

	goBack() {
		this.location.back();
	}
	

}
