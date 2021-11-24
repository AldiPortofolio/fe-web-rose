import { Component, OnInit } from '@angular/core';
import { ReportRejected } from './report-rejected.model';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ReportRejectedService } from './report-rejected.service';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import Swal from 'sweetalert2';

@Component({
  selector: 'op-report-rejected',
  templateUrl: './report-rejected.component.html',
  styleUrls: ['./report-rejected.component.css']
})
export class ReportRejectedComponent implements OnInit {

  reportList: ReportRejected[];
  curPage = 1;
  totalData = 0;
  // totalRecord = TOTAL_RECORD_PER_PAGE;
  totalRecord = 10;
  dateStartMdl: NgbDateStruct;
  dateEndMdl: NgbDateStruct;
  searchTerm = {
    startDate: '',
    endDate: '',
  };

  constructor(private ngxService: NgxUiLoaderService,
    private reportFinishedService: ReportRejectedService) { }

  ngOnInit() {
    this.loadAll(this.curPage);
  }

  loadAll(page) {
    this.ngxService.start();
    console.log('Start load all', this.searchTerm);

    this.reportFinishedService.filter({
      startDate: '',
      endDate: '',
      page: page,
      limit: this.totalRecord,
    })
      .subscribe(
        (res: HttpResponse<ReportRejected[]>) => this.onSuccessGetData(res.body),
        (res: HttpErrorResponse) => this.onError(res.message),
        () => { console.log('finally'); }
      );
  }

  private onSuccess(data) {
    console.log(data);
    this.ngxService.stop();
    if (data.errCode == '00') {
      console.log('success')
      Swal.fire('Success', 'Success generate report', 'success');
    } else {
      Swal.fire('Failed', data.errDesc, 'error');
      console.log('gagal', data.errCode)
    }
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
    this.searchTerm.startDate = ''
    this.searchTerm.endDate = ''
    this.loadAll(this.curPage);
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
    return year + '-' + (mth < 10 ? '0' + mth : mth) + '-' + (day < 10 ? '0' + day : day);
  }

  downloadFile(filePath) {
    console.log('File Path:', filePath);

    this.reportFinishedService.download({
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

  sendKafka() {
    if (this.dateStartMdl == null && this.dateEndMdl == null) {
      this.searchTerm.startDate = ''
      this.searchTerm.endDate = ''
    } else if (this.dateEndMdl == null) {
      this.searchTerm.startDate = this.dateStartMdl.year + '-' +
        ('0' + this.dateStartMdl.month).slice(-2) + '-' +
        ('0' + this.dateStartMdl.day).slice(-2);

      if (!this.searchTerm.startDate) {
        return;
      }
    } else if (this.dateStartMdl == null) {
      this.searchTerm.endDate = this.dateEndMdl.year + '-' +
        ('0' + this.dateEndMdl.month).slice(-2) + '-' +
        ('0' + this.dateEndMdl.day).slice(-2);

      if (!this.searchTerm.endDate) {
        return;
      }
    } else {
      this.searchTerm.startDate = this.dateStartMdl.year + '-' +
        ('0' + this.dateStartMdl.month).slice(-2) + '-' +
        ('0' + this.dateStartMdl.day).slice(-2);
      this.searchTerm.endDate = this.dateEndMdl.year + '-' +
        ('0' + this.dateEndMdl.month).slice(-2) + '-' +
        ('0' + this.dateEndMdl.day).slice(-2);

      if (!this.searchTerm.startDate || !this.searchTerm.endDate) {
        return;
      }
    }
    this.ngxService.start();
    console.log('Start send kafka', this.searchTerm);

    this.reportFinishedService.sendKafka({
      startDate: this.searchTerm.startDate,
      endDate: this.searchTerm.endDate,
    })
      .subscribe(
        (res: HttpResponse<ReportRejected[]>) => this.onSuccess(res.body),
        (res: HttpErrorResponse) => this.onError(res.message),
        () => { console.log('finally'); }
      );
  }

  private onSuccessGetData(data) {
    this.reportList = data.contents;
    this.totalData = data.totalData;
    this.ngxService.stop();
  }

}
