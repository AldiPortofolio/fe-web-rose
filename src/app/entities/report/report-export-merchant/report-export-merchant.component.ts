import { Component, OnInit } from '@angular/core';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ReportExportMerchantService } from './report-export-merchant.service';
import { ReportExportMerchant } from './report-export-merchant.model';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import Swal from 'sweetalert2';

@Component({
  selector: 'op-report-export-merchant',
  templateUrl: './report-export-merchant.component.html',
  styleUrls: ['./report-export-merchant.component.css']
})
export class ReportExportMerchantComponent implements OnInit {

  reportList: ReportExportMerchant[];
  curPage = 1;
  totalData = 0;
  totalRecord = 10;
  dateStartMdl: NgbDateStruct;
  dateEndMdl: NgbDateStruct;
  searchTerm = {
    startDate: '',
    endDate: '',
    page: 0,
    limit: 0,
  };

  constructor(private ngxService: NgxUiLoaderService,
    private reportExportMerchantService: ReportExportMerchantService) { }

  ngOnInit() {
    this.loadAll(this.curPage);
  }

  loadAll(page) {
    this.ngxService.start();
    console.log('Start load all', this.searchTerm);

    this.reportExportMerchantService.filter({
      startDate: '',
      endDate: '',
      page: page,
      limit: this.totalRecord,
    })
      .subscribe(
        (res: HttpResponse<ReportExportMerchant[]>) => this.onSuccessGetData(res.body),
        (res: HttpErrorResponse) => this.onError(res.message),
        () => { console.log('finally'); }
      );
  }

  private onError(error) {
    console.log('error..');
    this.ngxService.stop();
  }

  loadPage() {
    this.loadAll(this.curPage);
    console.log(this.curPage);
  }

  onFilter() {
    this.searchTerm.startDate = this.dateFormatter(this.dateStartMdl);
    this.searchTerm.endDate = this.dateFormatterEnd(this.dateEndMdl);
    this.searchTerm.page = this.curPage;
    this.searchTerm.limit = this.totalRecord;
    if (!this.searchTerm.startDate || !this.searchTerm.endDate) {
      return;
    }
    this.ngxService.start();
    console.log('Start load all', this.searchTerm);

    this.reportExportMerchantService.filter(this.searchTerm)
      .subscribe(
        (res: HttpResponse<ReportExportMerchant[]>) => this.onSuccessGetData(res.body),
        (res: HttpErrorResponse) => this.onError(res.message),
        () => { console.log('finally'); }
      );
  }

  dateFormatter(params: NgbDateStruct): string {
    console.log(params);
    if (!params) {
      this.ngxService.stop();
      Swal.fire('Failed', 'silahkan pilih tanggal', 'error');
      return;
    }
    const year = params.year;
    const mth = params.month;
    const day = params.day;
    // return dt.toLocaleString(['id']);
    // return year + '-' + mth + '-' + day;
    return year + '-' + (mth < 10 ? '0' + mth : mth) + '-' + (day < 10 ? '0' + day : day) + ' 00:00:00';
  }

  dateFormatterEnd(params: NgbDateStruct): string {
    console.log(params);
    if (!params) {
      this.ngxService.stop();
      Swal.fire('Failed', 'silahkan pilih tanggal', 'error');
      return;
    }
    const year = params.year;
    const mth = params.month;
    const day = params.day;
    // return dt.toLocaleString(['id']);
    // return year + '-' + mth + '-' + day;
    return year + '-' + (mth < 10 ? '0' + mth : mth) + '-' + (day < 10 ? '0' + day : day) + ' 23:59:59';
  }

  downloadFile(filePath) {
    console.log('File Path:', filePath);

    this.reportExportMerchantService.download({
      filePath: filePath
    }).then(
      (resp) => {
        console.log('res-->', resp);

        const url = window.URL.createObjectURL(resp.body);
        const link = document.createElement('a');
        document.body.appendChild(link);
        link.setAttribute('style', 'display: none');
        link.href = url;
        link.download = filePath;
        link.click();
        link.remove();
        window.URL.revokeObjectURL(url);
      },
      (err) => {

        // console.log("TEST: ", err)
        if (err.status == 500) {
          Swal.fire('Error', 'File not found!', 'error');
        }
      }
    );
  }

  private onSuccessGetData(data) {
    this.reportList = data.contents;
    this.totalData = data.totalData;
    this.ngxService.stop();
  }
}
