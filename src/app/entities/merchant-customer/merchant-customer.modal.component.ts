import { Component, OnInit, Input } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { MerchantCustomer } from './merchant-customer.model';
import { MerchantCustomerService } from './merchant-customer.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'op-merchant-customer-modal',
  templateUrl: './merchant-customer.modal.component.html',
  styleUrls: ['./merchant-customer.modal.component.css']
})
export class MerchantCustomerModalComponent implements OnInit {

  @Input() statusRec;
  @Input() objEdit: MerchantCustomer;
  @Input() viewMsg;

  customer: MerchantCustomer;

  isFormDirty: Boolean = false;

  constructor(private customerService: MerchantCustomerService,
    private modalService: NgbModal,
    private ngxService: NgxUiLoaderService) {
  }

  ngOnInit() {
    if (this.statusRec === 'addnew') {
      this.customer = {};
      this.customer.serviceId = 0;
      this.customer.serviceName = '';
      this.customer.name = '';
      this.customer.phone = '';
      this.customer.typeId = 0;
      this.customer.typeName = '';
      this.customer.citizenIdNo = '';
      this.customer.merchant = '';
      this.customer.pob = '';
      this.customer.dob = '';
      this.customer.gender = '';
      this.customer.address = '';
      this.customer.postalCode = '';
      this.customer.provinceId = 0;
      this.customer.provinceName = '';
      this.customer.cityId = 0;
      this.customer.cityName = '';
      this.customer.districtId = 0;
      this.customer.districtName = '';
      this.customer.villageId = 0;
      this.customer.villageName = '';
      this.customer.rw = '';
      this.customer.rt = '';
      this.customer.occupation = '';
      this.customer.longitude = 0;
      this.customer.latitude = 0;
      this.customer.updatedAt = '';
    } else {
      this.customer = this.objEdit;
    }
  }

  // save(): void {
  //   this.ngxService.start();

  //   this.customerService.save(this.userCategory).subscribe(result => {
  //     this.isFormDirty = true;
  //     if (result.body.errCode === '00') {
  //       this.closeForm();
  //     } else {
  //       console.log('error');
  //       Swal.fire('Failed', result.body.errDesc, 'error').then(
  //       );
  //     }
  //     this.ngxService.stop();
  //   });
  // }

  closeForm(): void {
    if (this.isFormDirty === true) {
      this.modalService.dismissAll('refresh');
    } else {
      this.modalService.dismissAll('close');
    }
  }

}
