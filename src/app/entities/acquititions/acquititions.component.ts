import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import Swal from 'sweetalert2';
import { LookupDto } from '../lookup/lookup-dto.model';
import { Lookup } from '../lookup/lookup.model';
import { LookupService } from '../lookup/lookup.service';
import { MerchantGroup } from '../merchant-group/merchant-group.model';
import { MerchantGroupService } from '../merchant-group/merchant-group.service';
import { UserCategory } from '../ottopay-4/user-category/user-category.model';
import { UserCategoryService } from '../ottopay-4/user-category/user-category.service';
import { AcquititionsModalComponent } from './acquititions.modal.component';
import { Acquisition } from './acquititions.model';
import { AcquititionsService } from './acquititions.service';

@Component({
  selector: 'op-acquititions',
  templateUrl: './acquititions.component.html',
  styleUrls: ['./acquititions.component.css']
})
export class AcquititionsComponent implements OnInit {
  searchTerm = {
    name: '',
    merchantGroup: 0,
    merchantCategory: '',
    page: 1,
    limit: 10,
  };

  searchTermLookup = {
    name: '',
    code:'',
    lookupGroup:'',
    page: 1,
    limit: 9999,
  };

  acquititions: Acquisition[];
  acquitition: Acquisition;
  closeResult: string;
  currPage = 1;
  totalRecord = 10;
  totalData = 0;

  lookupTipeMerchant: LookupDto[] = [];
  lookupJenisUsaha: LookupDto[] = [];
  lookupSrId: LookupDto[] = [];
  lookupMerchantGroup: MerchantGroup[] = [];
  userCategoryList: UserCategory[];

  merchantGroupSelected = '';

  constructor(
    private acquititionsService: AcquititionsService,
    private merchantGroupService: MerchantGroupService,
    private lookupService: LookupService,
    private userCategoryService: UserCategoryService,
    private modalService: NgbModal,
    private ngxService: NgxUiLoaderService,
    ) {
  }

  ngOnInit() {
    this.lookup("TIPE_MERCHANT");
    this.lookup("SR_ID");
    this.lookup("JENIS_USAHA");
    this.loadLookupMerchantGroup();
    this.loadDropdownUserCategory();
    this.loadAll(this.currPage);
    setTimeout(() => {
      
    }, 1000);
  }

  loadAll(page) {
    this.ngxService.start(); // start loader
    this.searchTerm.page = page
    this.searchTerm.limit = this.totalRecord
    this.searchTerm.merchantGroup = +this.searchTerm.merchantGroup
    
    console.log('this.searchTerm', this.searchTerm)
    this.acquititionsService.filter({
      filter: this.searchTerm,
    })
      .subscribe(
        (res: HttpResponse<Acquisition[]>) => this.onSuccess(res.body, res.headers),
        (res: HttpErrorResponse) => this.onError(res.message)
      );

  }

  onFilter() {
    this.loadAll(this.currPage);
  }

  private onSuccess(data, headers) {
    this.ngxService.stop();
    if (data.contents.length < 0) {
      return;
    }
    console.log(data);
    this.acquititions = data.contents; 
    this.acquititions.forEach( data => {
      data.businessTypeArr = data.businessType.split(",")
      let tempBt = []
      data.businessTypeArr.forEach( (bt) => {
        tempBt.push(" " + bt)
      })
      data.businessTypeArr = tempBt
      data.salesRetailsArr = data.salesRetails.split(",")
      let temp = []
      data.salesRetailsArr.forEach( (sr) => {
        for ( let j = 0 ; j < this.lookupSrId.length ; j++ ) {
          if ( sr === this.lookupSrId[j].code ) {
            temp.push(" " + this.lookupSrId[j].name)
          }
        }
      })
      data.salesRetailsArr = temp
      console.log("hasil split",data.businessTypeArr)
      console.log("hasil split",data.salesRetailsArr)
    })
    this.totalData = data.totalData;
  }

  private onError(error) {
    this.ngxService.stop();
    console.log('error..', error);
  }

  open(status, message) {
    const modalRef = this.modalService.open(AcquititionsModalComponent, { size: 'lg' });
    modalRef.componentInstance.statusRec = status;
    modalRef.componentInstance.objEdit = message;
    modalRef.componentInstance.listJenisUsaha = this.lookupJenisUsaha;
    modalRef.componentInstance.listMerchantGroup = this.lookupMerchantGroup;
    modalRef.componentInstance.listMerchantCategory = this.userCategoryList;
    modalRef.componentInstance.listTipeMerchant = this.lookupTipeMerchant;
    modalRef.componentInstance.listSrId = this.lookupSrId;
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

  loadPage() {
    this.loadAll(this.currPage);
  }

  remove(acquisition: Acquisition ) {
    console.log(acquisition)
    this.acquititionsService.delete(acquisition.id).subscribe(result => {
        console.log('Result==>' + result.body);
        if (result.body.errCode === '00') {
            console.log('Toast success');
            Swal.fire('Success', 'Success delete Acquisition', 'success');
            this.currPage = 1;
            this.loadAll(this.currPage);
        } else {
            Swal.fire('Failed', result.body.errDesc, 'error');
        }
    });

  }

  loadLookupMerchantGroup() {
      this.ngxService.start();
      this.merchantGroupService.query({
          page: 1,
          count: 1000,
      }).subscribe(
              (res: HttpResponse<MerchantGroup[]>) => this.onSuccessMG(res.body, res.headers),
              (res: HttpErrorResponse ) => this.onErrorMG(res.message),
              () => { this.ngxService.stop(); console.log('Finally MG'); }
      );
  }

  private onErrorMG(error) {
      console.log('Error load MG ', error);
  }

  private onSuccessMG(data, headers) {
      this.lookupMerchantGroup = data.content;
  }

  private lookup (lookupGroup : string) {
    this.searchTermLookup.lookupGroup = lookupGroup
    this.lookupService.filter({
      filter: this.searchTermLookup,
    })
    .subscribe(
            (res: HttpResponse<Lookup[]>) => this.onSuccessLookup(res.body, res.headers, lookupGroup),
            (res: HttpErrorResponse) => this.onError(res.message),
            () => {}
    );
  }

  private onSuccessLookup(data, headers, lookupGroup: string) {
    this.ngxService.stop();
    if (data.contents.length < 0) {
      return;
    }
    console.log(data);
    if ( lookupGroup == "JENIS_USAHA" ) {
      this.lookupJenisUsaha = data.contents
    } else if (lookupGroup == "SR_ID" ) {
      this.lookupSrId = data.contents
    } else if (lookupGroup == "TIPE_MERCHANT" ) {
      this.lookupTipeMerchant = data.contents
    }

  }

  loadDropdownUserCategory() {
  this.ngxService.start(); // start loader

  this.userCategoryService.dropdown()
    .subscribe(
      (res: HttpResponse<UserCategory[]>) => this.onSuccessDropdown(res.body, res.headers),
      (res: HttpErrorResponse) => this.onError(res.message)
    );

  }

  private onSuccessDropdown(data, headers) {
    this.ngxService.stop();
    if (data.contents.length < 0) {
      return;
    }

    this.userCategoryList = data.contents;
  }
}
