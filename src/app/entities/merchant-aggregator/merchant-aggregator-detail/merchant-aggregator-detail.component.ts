import { Component, OnInit } from '@angular/core';
import { MerchantAggregatorDetail, MerchantAggregatorDetailTemp, MerchantAggregatorUpload } from './merchant-aggregator-detail.model';
import { TOTAL_RECORD_PER_PAGE } from 'src/app/shared/constants/base-constant';
import { MerchantAggregatorDetailService } from './merchant-aggregator-detail.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, FormArray, Validators, FormControl } from '@angular/forms';
import Swal from 'sweetalert2';
import { MerchantService } from '../../merchant/merchant.service';


@Component({
  selector: 'op-merchant-aggregator-detail',
  templateUrl: './merchant-aggregator-detail.component.html',
  styleUrls: ['./merchant-aggregator-detail.component.css']
})
export class MerchantAggregatorDetailComponent implements OnInit {

  merchantAggregatorDetailList: MerchantAggregatorDetail[];
  // merchantAggregatorDetailTempList: MerchantAggregatorDetailTemp[];
  merchantAggregatorupload: MerchantAggregatorUpload;
  merchantAggForm: FormGroup;
  currPageAgg = 1;
  totalRecordAgg = 5;
  totalDataAgg = 0;
  totalDataMerchant = 0;

  searchTerm = {
    name: '',
    midMerchant: [],
    midFilter: '',
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

  closeResult: string;
  sub: any
  midAgg: string
  uploadForm: FormGroup;
  isShow = false;

  constructor(private route: ActivatedRoute,
    private merchantService: MerchantService,
    private fb: FormBuilder,
    private merchantAggregatorDetailService: MerchantAggregatorDetailService,
    private modalService: NgbModal,
    private formBuilder: FormBuilder,
    private ngxService: NgxUiLoaderService) {
    this.merchantAggForm = this.fb.group({
      checkArray: this.fb.array([], [Validators.required])
    })
     }

  ngOnInit() {
    this.uploadForm = this.formBuilder.group({
      file: ['']
    });
    this.isShow = false;
    this.midAgg = this.route.snapshot.paramMap.get('mid');
    this.loadAll(this.currPageAgg);
    console.log("mid Aggregator ->", this.midAgg)
  }


  onCheckboxAggChange(e) {
    const checkArray: FormArray = this.merchantAggForm.get('checkArray') as FormArray;

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

  removeDuplicate(data) {
    return data.filter((value, index) => data.indexOf(value) === index )
  }

  submitAggForm() {
    this.Req.midAggregator = this.midAgg
    this.Req.midMerchant = this.merchantAggForm.value.checkArray
    this.Req.midMerchant = this.removeDuplicate(this.Req.midMerchant)
    this.Req.action = 4
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
      Swal.fire('Success', "Success Delete Merchant, Waiting for Approval", 'success');
    } else {
      Swal.fire('Failed', data.errDesc, 'error');
      console.log('gagal', data.errCode)
    }
  }

  loadAll(page) {
    this.midAgg = this.route.snapshot.paramMap.get('mid');
    this.ngxService.start(); // start loader
    this.searchTerm.page = page
    this.searchTerm.limit = this.totalRecordAgg
    this.searchTerm.midAggregator = this.midAgg
    this.merchantAggregatorDetailService.filter({
      filter: this.searchTerm,
    })
      .subscribe(
        (res: HttpResponse<MerchantAggregatorDetail[]>) => this.onSuccess(res.body, res.headers),
        (res: HttpErrorResponse) => this.onError(res.message)
      );

    console.log("mid->", this.searchTerm.midMerchant)
  }

  private onSuccess(data, headers) {
    this.ngxService.stop();
    if (data.contents.length < 0) {
      return;
    }
    console.log(data);
    this.merchantAggregatorDetailList = data.contents;
    this.totalDataAgg = data.totalData;
  }

  private onError(error) {
    this.ngxService.stop();
    console.log('error..', error);
  }

  loadPage() {
    this.loadAll(this.currPageAgg);
  }
  onFilter() {
    this.loadAll(this.currPageAgg);
  }

  resetFilter() {
    this.searchTerm = {
      name: '',
      midMerchant: [],
      midFilter: '',
      mpanMerchant: '',
      nmidMerchant: '',
      midAggregator: '',
      page: 1,
      limit: 5,
    };
    this.loadAll(1);
  }

  handleUpload(files: FileList) {
    this.uploadForm.get('file').setValue(files.item(0));
  }

  submitUpload() {
    this.midAgg = this.route.snapshot.paramMap.get('mid');
    if (!this.uploadForm.get('file').value || this.uploadForm.get('file').value == '') {
      Swal.fire('Failed', 'Silahkan masukan file terlebih dahulu', 'error');

    }
    this.ngxService.start();
    const formData = new FormData();
    formData.append('file', this.uploadForm.get('file').value);
    formData.append('mid_aggregator', this.midAgg);
    console.log('formData', formData)
    console.log('formData', this.uploadForm.get('file').value)

    this.merchantAggregatorDetailService.uploadFile(formData)
      .subscribe(
        (res: HttpResponse<MerchantAggregatorUpload>) => this.onSuccessUpload(res),
        (res: HttpErrorResponse) => this.onError(res.message),
      )
  }

  private onSuccessUpload(data) {
    console.log(data);
    this.ngxService.stop();
    if (data.errCode == '00') {
      console.log('success')
      Swal.fire('Success', 'Success upload File', 'success');
    } else {
      Swal.fire('Failed', data.errDesc, 'error');
      console.log('gagal', data.errCode)
    }
  }
  
  toggleDisplay() {
    this.isShow = !this.isShow;
  }

  downloadTemplate(filePath) {
    console.log('File Path:', filePath);

    this.merchantAggregatorDetailService.downloadTemplateFile({
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

}
