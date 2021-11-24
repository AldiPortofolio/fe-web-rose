import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import Swal from 'sweetalert2';
import { MonitoringAktivasiFdsService } from './monitoring-aktivasi-fds.service';
import { MonitoringAktivasiFds } from './monitoring-aktivasi-fds.model';

@Component({
  selector: 'op-monitoring-aktivasi-fds',
  templateUrl: './monitoring-aktivasi-fds.component.html',
  styleUrls: ['./monitoring-aktivasi-fds.component.css']
})
export class MonitoringAktivasiFdsComponent implements OnInit {

  dateStartMdl: NgbDateStruct;
  dateEndMdl: NgbDateStruct;
  searchTerm = {
      key: '',
      startDate: '',
      endDate: '',
      page: 1,
      limit: 10,
  }

  monitoringAktivasiFdsList: MonitoringAktivasiFds[];

  currPage = 1;
  totalRecord = 10;
  totalData = 0;


  constructor(
      private router: Router,
      private akuisisiSfaService: MonitoringAktivasiFdsService,
      private ngxService: NgxUiLoaderService,

  ) { }

  ngOnInit() {
      this.loadAll(this.currPage);
  }

    // loadAll(page) {
    //     this.ngxService.start(); // start loader
    //     this.searchTerm.page = page;
    //     this.searchTerm.limit = this.totalRecord;

    //     this.akuisisiSfaService.filter({
    //         filter: this.searchTerm,
    //     }).subscribe(
    //             (res: HttpResponse<AkuisisiSfa[]>) => this.onSuccess(res.body, res.headers),
    //             (res: HttpErrorResponse) => this.onError(res.message)
    //         );

    // }

  loadAll(page) {
      this.ngxService.start(); // start loader
      this.searchTerm.page = page
      this.searchTerm.limit = this.totalRecord
      console.log("ini tanggal --->",this.dateStartMdl, this.dateEndMdl)
      if (this.dateStartMdl == null) {
          this.searchTerm.startDate = ""
      } else {
          this.searchTerm.startDate = this.dateFormatter(this.dateStartMdl)
      }

      if (this.dateEndMdl == null) {
          this.searchTerm.endDate = ""
      } else {
          this.searchTerm.endDate = this.dateFormatterEnd(this.dateEndMdl)
      }

      this.akuisisiSfaService.filter({
          filter: this.searchTerm,
      })
          .subscribe(
              (res: HttpResponse<MonitoringAktivasiFds[]>) => this.onSuccess(res.body, res.headers),
              (res: HttpErrorResponse) => this.onError(res.message)
          );

  }

  private onSuccess(data, headers) {
      this.ngxService.stop();
      if (data.contents.length < 0) {
          return;
      }
      console.log(data);
      this.monitoringAktivasiFdsList = data.contents;
      this.totalData = data.totalData;
  }

  private onError(error) {
      this.ngxService.stop();
      console.log('error..', error);
  }

  onFilter() {
      this.loadAll(this.currPage);
  }

  loadPage() {
      this.loadAll(this.currPage);
  }

  dateFormatter(params: NgbDateStruct): string {
      console.log(params);
  
      const year = params.year;
      const mth = params.month;
      const day = params.day;
      // return dt.toLocaleString(['id']);
      // return year + '-' + mth + '-' + day;
      return year + '-' + (mth < 10 ? '0' + mth : mth) + '-' + (day < 10 ? '0' + day : day) + ' 00:00:00';
  }

  dateFormatterEnd(params: NgbDateStruct): string {
      console.log(params);
  
      const year = params.year;
      const mth = params.month;
      const day = params.day;
      // return dt.toLocaleString(['id']);
      // return year + '-' + mth + '-' + day;
      return year + '-' + (mth < 10 ? '0' + mth : mth) + '-' + (day < 10 ? '0' + day : day) + ' 23:59:59';
  }

    // export() {
    //     if (this.dateStartMdl == null) {
    //         this.searchTerm.startDate = ""
    //     } else {
    //         this.searchTerm.startDate = this.dateFormatter(this.dateStartMdl)
    //     }

    //     if (this.dateEndMdl == null) {
    //         this.searchTerm.endDate = ""
    //     } else {
    //         this.searchTerm.endDate = this.dateFormatterEnd(this.dateEndMdl)
    //     }

    //     if ( this.searchTerm.key == '' && this.searchTerm.startDate == '' && this.searchTerm.endDate == '' ) {
    //         Swal.fire('Warning', "Please select filter", "warning").then(
    //             () => this.router.navigate(['/main/monitoring-aktivasi-fds'])
    //         );
    //     } else {
        
    //         this.akuisisiSfaService.export(this.searchTerm).subscribe( result => {
    //             console.log("ini result body", result)

    //             if ( result.body.errCode == "00") {
    //                 this.ngxService.stop();
    //                 Swal.fire('Success', 'Successfully export data akuisisi sfa', 'success').then(
    //                     () => this.router.navigate(['/main/report-export-monitoring-aktivasi-fds'])
    //                 );
    //             } else {
    //                 this.ngxService.stop();
    //                 Swal.fire('Failed', result.body.errDesc, 'error').then(
    //                     () => this.onBack()
    //                 );
    //             }
    //         })
    //     }
    // }

  onBack() {
      // this.route.
      this.ngxService.stop();
      this.router.navigate(['/main/monitoring-aktivasi-fds']);
  }

}
