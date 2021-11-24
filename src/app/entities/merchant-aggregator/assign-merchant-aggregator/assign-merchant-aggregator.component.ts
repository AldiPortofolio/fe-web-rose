import { Component, OnInit, Input } from '@angular/core';
import { MerchantService } from '../../merchant/merchant.service';
import { Merchant } from '../../merchant/merchant.model';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormGroup, FormBuilder, FormArray, FormControl, Validators } from '@angular/forms';
import { MerchantAggregatorDetailService } from '../merchant-aggregator-detail/merchant-aggregator-detail.service';
import { MerchantAggregatorDetail, MerchantAggregatorDetailTemp } from '../merchant-aggregator-detail/merchant-aggregator-detail.model';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'op-assign-merchant-aggregator',
  templateUrl: './assign-merchant-aggregator.component.html',
  styleUrls: ['./assign-merchant-aggregator.component.css']
})
export class AssignMerchantAggregatorComponent implements OnInit {

  @Input() showDiv: boolean;

  merchantList: Merchant[];
  merchantForm: FormGroup;
  merchantAggregatorDetailTemp: MerchantAggregatorDetailTemp;
  currPage = 1;
  totalRecord = 5;
  totalData = 0;
  totalDataMerchant = 0;
  midAgg: string;

  searchTerm = {
    name: '',
    midMerchant: [],
    mpanMerchant: '',
    nmidMerchant: '',
    midAggregator: '',
    page: 1,
    limit: 5,
  }

   Req = {
      midMerchant: [],
      midAggregator: '',
      action: 0,
    };

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private merchantService: MerchantService,
    private merchantAggregatorDetailService: MerchantAggregatorDetailService,
    private ngxService: NgxUiLoaderService,
  ) { 
    this.merchantForm = this.fb.group({
      checkArray: this.fb.array([], [Validators.required])
    })
  }

  ngOnInit() {
    this.midAgg = this.route.snapshot.paramMap.get('mid');
    this.loadAllMerchant(this.currPage);
  }

  onCheckboxChange(e) {
    const checkArray: FormArray = this.merchantForm.get('checkArray') as FormArray;

    if (e.target.checked) {
      checkArray.push(new FormControl(e.target.value));
    } else {
      let i: number = 0;
      checkArray.controls.forEach((item: FormControl) => {
        if (item.value == e.target.value) {
          checkArray.removeAt(i);
          return;
        }
        i++;
      });
    }
  }

  submitForm() {
    this.Req.midAggregator = this.midAgg
    this.Req.midMerchant = this.merchantForm.value.checkArray
    console.log(this.Req)
    this.ngxService.start();
    this.merchantAggregatorDetailService.save(this.Req)
    .subscribe(
      (res: HttpResponse<MerchantAggregatorDetailTemp>) => this.onSuccessSave(res),
      (res: HttpErrorResponse) => this.onError(res.message),
      // result => {
      //   console.log(result);
      // }
    );
  }

  private onSuccessSave(data) {
    console.log(data);
    this.ngxService.stop();
    if (data.errCode == '00') {
      console.log('success')
      Swal.fire('Success', 'Success Add Merchant', 'success');
    } else {
      Swal.fire('Failed', data.errDesc, 'error');
      console.log('gagal', data.errCode)
    }
  }

  loadAllMerchant(page) {
    // start loader
    this.ngxService.start();

    this.searchTerm.name = this.searchTerm.name.replace(/^0+/, '')

    console.log('search phone ==>', this.searchTerm.name)

    this.merchantService.filter({
      filter: this.searchTerm,
      page: page,
      count: this.totalRecord
    }).subscribe(
      (res: HttpResponse<Merchant[]>) => this.onSuccessMerchant(res.body, res.headers),
      (res: HttpErrorResponse) => this.onError(res.message)
    );
  }

  private onSuccessMerchant(data, headers) {
    // stop loader
    this.ngxService.stop();

    if (data.content.length < 0) {
      return;
    }
    this.merchantList = data.content;
    // this.merchantList.forEach(function (m) {
    //   if (m.merchantGroup == null) {
    //     m.merchantGroup = new MerchantGroup;
    //   }
    // })
    this.totalDataMerchant = data.totalElements;
  }

  private onError(error) {
    this.ngxService.stop();
    console.log('error..', error);
  }

  loadPageMerchant() {
    this.loadAllMerchant(this.currPage);
  }

  onFilterMerchant() {
    this.loadAllMerchant(this.currPage);
  }

  resetFilterMerchant() {
    this.searchTerm = {
      name: '',
      midMerchant: [],
      mpanMerchant: '',
      nmidMerchant: '',
      midAggregator: '',
      page: 1,
      limit: 5,
    };
    this.loadAllMerchant(1);
  }

}
