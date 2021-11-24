import { Component, OnInit } from '@angular/core';
import { FeeCicilanSetting } from './fee-cicilan-setting.model';
import { FeeCicilanSettingService } from './fee-cicilan-setting.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'op-fee-cicilan-setting',
  templateUrl: './fee-cicilan-setting.component.html',
  styleUrls: ['./fee-cicilan-setting.component.css']
})
export class FeeCicilanSettingComponent implements OnInit {

  feeCicilanInput = {
    adminFeeDoku: 0,
    adminFeeInfinitium: 0,
    vaBcaFee: 0,
    vaMandiriFee: 0,
    vaLainnyaFee: 0,
  }

  feeCicilan: FeeCicilanSetting;
  closeResult: string;
  totalRecord = 10;
  totalData = 0;

  isFormDirty: Boolean = false;

  constructor(
    private feeCicilanSettingService: FeeCicilanSettingService,
    private router: Router,
    private ngxService: NgxUiLoaderService) {
  }

  ngOnInit() {
    this.loadAll();
  }

  loadAll() {
    this.ngxService.start(); // start loader

    this.feeCicilanSettingService.find()
      .subscribe(
        (res: HttpResponse<FeeCicilanSetting[]>) => this.onSuccess(res.body, res.headers),
        (res: HttpErrorResponse) => this.onError(res.message)
      );

  }


  private onSuccess(data, headers) {
    this.ngxService.stop();
    if (data.contents.length < 0) {
      return;
    }
    console.log(data);
    this.feeCicilan = data.contents;
    this.totalData = data.totalData;
  }

  private onError(error) {
    this.ngxService.stop();
    console.log('error..', error);
  }

  save(): void {
    this.ngxService.start();

    this.feeCicilanSettingService.save(this.feeCicilanInput).subscribe(result => {
      this.isFormDirty = true;
      if (result.body.errCode === '00') {
        Swal.fire('Success ', '', 'success').then(
          res => { this.router.navigate(['/main/fee-cicilan-setting']), this.loadAll(), this.resetFilter()}
        );
      } else {
        console.log('error');
        Swal.fire('Failed', result.body.errDesc, 'error').then(
        );
      }
      this.ngxService.stop();
    });
  }

  resetFilter() {
    this.feeCicilanInput = {
      adminFeeDoku: 0,
      adminFeeInfinitium: 0,
      vaBcaFee: 0,
      vaMandiriFee: 0,
      vaLainnyaFee: 0,
    }
  }

}