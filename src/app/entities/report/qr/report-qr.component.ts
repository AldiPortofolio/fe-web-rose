import { Component, OnInit } from '@angular/core';
import { ReportQr } from './report-qr.model';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { ReportQrService } from './report-qr.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'op-report-qr',
  templateUrl: './report-qr.component.html',
  styleUrls: ['./report-qr.component.css']
})
export class ReportQrComponent implements OnInit {

  reportList: ReportQr[];
  curPage = 1;
  totalData = 0;
  totalRecord = 10;

  constructor(private ngxService: NgxUiLoaderService,
    private reportQrService: ReportQrService) { }

  ngOnInit() {
    this.loadAll(this.curPage);
  }

  loadAll(page) {
    this.ngxService.start();

    this.reportQrService.filter({
      page: page,
      limit: this.totalRecord,
    })
      .subscribe(
        (res: HttpResponse<ReportQr[]>) => this.onSuccessGetData(res.body),
        (res: HttpErrorResponse) => this.onError(res.message),
        () => { console.log('finally'); }
      );
  }

  private onSuccessGetData(data) {
    this.reportList = data.contents;
    this.totalData = data.totalData;
    this.ngxService.stop();
  }

  private onError(error) {
    console.log('error..');
    this.ngxService.stop();
  }

  downloadFile(filePath) {
    console.log('File Path:', filePath);

    this.reportQrService.download({
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

  downloadResultFile(filePath) {
    console.log('File Path:', filePath);

    this.reportQrService.downloadResult({
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
  onFilter() {
    this.loadAll(this.curPage);
  }

  loadPage() {
    this.loadAll(this.curPage);
    console.log(this.curPage);
  }

}
