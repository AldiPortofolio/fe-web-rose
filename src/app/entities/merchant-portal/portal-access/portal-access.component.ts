import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';
import { TOTAL_RECORD_PER_PAGE } from 'src/app/shared/constants/base-constant';
import { Router } from '@angular/router';
import { PortalAccessService } from './portal-access.service';
import { PortalAccess } from './portal-access.model';
import { PortalAccessModalComponent } from './portal-access.modal.component';

@Component({
  selector: 'op-portal-access',
  templateUrl: './portal-access.component.html',
  styleUrls: ['./portal-access.component.css']
})
export class PortalAccessComponent implements OnInit {

  filter = [
    { code: '1', name: 'Merchant ID' },
    { code: '2', name: 'MPAN' },
    { code: '3', name: 'Email' },
    { code: '4', name: 'Nomor Hp' },
  ];

  filterAction = [
    { code: '1', name: 'Active' },
    { code: '0', name: 'Non Active' },
  ];

  filterMtype = [
    { code: '8079', name: 'UMKM' },
    { code: '8080', name: 'Modern' }, 
    { code: '8081', name: 'eCommerce' },
  ];

  constructor(
    private listAccountService: PortalAccessService,
    private ngxService: NgxUiLoaderService,
    private modalService: NgbModal,
    private router: Router,
  ) { }

  request= {
    search: '',
    filter_by: '',
    keyword: '',
    filter_action: '',
    filter_mtype: '',
    page: 1,
    limit: 10,
  };
  totalRecord = TOTAL_RECORD_PER_PAGE;
  curPage = 1;
  listAccount: PortalAccess[];
  totalData = 0;

  ngOnInit() {
    this.loadListMerchant(this.curPage);
  }

  loadListMerchant(page) {
    this.ngxService.start();

    this.request.search = this.request.search.replace(/^0+/, '')
    this.request.page = page
    this.request.limit = this.totalRecord

    this.listAccountService.filter({
      search: this.request.search,
      filter_by: this.request.filter_by,
      keyword: this.request.keyword,
      filter_action: this.request.filter_action,
      filter_mtype: this.request.filter_mtype,
      page: this.request.page,
      limit: this.request.limit,
    }).subscribe(
      (res: HttpResponse<PortalAccess[]>) => this.onSuccess(res.body, res.headers),
      (res: HttpErrorResponse) => this.onError(res.message)
    );

  }

  private onSuccess(data, headers) {
    this.ngxService.stop();

    if (data.contents.length < 0) {
      return;
    }
    this.listAccount = data.contents;
    this.totalData = data.totalData;
  }

  private onError(error) {
    this.ngxService.stop();
    console.log('error..', error);
  }

  loadPage() {
    this.loadListMerchant(this.curPage);
  }

  onFilter() {
    this.loadListMerchant(this.curPage);
  }

  clearSelected() { 
    this.request = {
      search: '',
      filter_by: '',
      keyword: '',
      filter_action: '',
      filter_mtype: '',
      page: 1,
      limit: 10,
    };

    this.curPage = 1;

    this.loadListMerchant(this.curPage);
  }

  openActivation(merchant_data) {

    const modalRef = this.modalService.open(PortalAccessModalComponent, { size: 'lg' });
    modalRef.componentInstance.objData = merchant_data;

    modalRef.result.then((result) => {
      this.curPage = 1;
      this.loadListMerchant(this.curPage);
    }, (reason) => {
      this.curPage = 1;
        this.loadListMerchant(this.curPage);
    });
  }

  deactivate(merchant_data) {
    this.ngxService.start();
    Swal.fire({
      title: 'Are you sure?',
      text: 'Do you want to deactivate this merchant?',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#DD6B55',
      confirmButtonText: 'Deactivate!'
    }).then((result) => {
      if (result.value) {
        this.listAccountService.deactivate({ value: merchant_data.mid }).subscribe((result) => {
          const code = result.body.code.toString()
          this.ngxService.stop();
          if (code == '00') {
            Swal.fire('Success', "Deactivation merchant success", 'success').then(
              () => this.onBack()
            );
          } else {
            Swal.fire('Failed', result.body.msg, 'error').then(
              () => this.onBack()
            );

          }
        });
      } else {
        this.onBack()
      }
    });

    this.ngxService.stop();
  }

  reset(merchant_data) {
    this.ngxService.start();
    Swal.fire({
      title: 'Are you sure?',
      text: 'Do you want to reset password ?',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#DD6B55',
      confirmButtonText: 'Reset!'
    }).then((result) => {
      if (result.value) {
        merchant_data.action = "reset password"
        this.listAccountService.resetPassword(merchant_data).subscribe((result) => {
          this.ngxService.stop();
          if (result.body.errCode == '00') {
            Swal.fire('Success', 'Your password has been reset. Check your email for new password!', 'success').then(
              () => this.onBack()
            );
          } else if (result.body.errCode == '05'){
            Swal.fire('Failed', 'Invalid email address' + ' "' + merchant_data.email + '"', 'error').then(
              () => this.onBack()
            );
          } else {
            Swal.fire('Failed', result.body.errDesc, 'error').then(
              () => this.onBack()
            );
          }
        });
      }else{
        this.onBack()
      }
    });

    this.ngxService.stop();

  }

  onBack() {
    this.loadListMerchant(this.curPage);
  }

}
