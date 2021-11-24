import { Component, OnInit, Input } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { MasterService } from './master-service-and-type.model';
import { MasterServiceService } from './master-service.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'op-master-service-modal',
  templateUrl: './master-service.modal.component.html',
  styleUrls: ['./master-service.modal.component.css']
})
export class MasterServiceModalComponent implements OnInit {

  @Input() statusRec;
  @Input() objEdit: MasterService;
  @Input() viewMsg;

  data: MasterService;

  isFormDirty: Boolean = false;

  constructor(private modalService: NgbModal,
    private ngxService: NgxUiLoaderService,
    private masterServiceService: MasterServiceService) {
  }

  ngOnInit() {

    if (this.statusRec === 'addnew') {
      this.data = {};
      this.data.id = 0;
      this.data.name = '';
    } else {
      this.data = this.objEdit;
    }
  }

  save(): void {
    this.ngxService.start();

    this.masterServiceService.save(this.data).subscribe(result => {
      this.isFormDirty = true;
      if (result.body.errCode === '00') {
        this.closeForm();
      } else {
        console.log('error');
        Swal.fire('Failed', result.body.errDesc, 'error').then(
        );
      }
      this.ngxService.stop();
    });
  }

  closeForm(): void {
    if (this.isFormDirty === true) {
      this.modalService.dismissAll('refresh');
    } else {
      this.modalService.dismissAll('close');
    }
  }

}
