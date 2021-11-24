import { Component, OnInit, Input } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { MasterType } from './master-service-and-type.model';
import { MasterTypeService } from './master-type.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'op-master-type-modal',
  templateUrl: './master-type.modal.component.html',
  styleUrls: ['./master-type.modal.component.css']
})
export class MasterTypeModalComponent implements OnInit {

  @Input() statusRec;
  @Input() objEdit: MasterType;
  @Input() viewMsg;

  data: MasterType;

  isFormDirty: Boolean = false;

  constructor(private modalService: NgbModal,
    private ngxService: NgxUiLoaderService,
    private masterTypeService: MasterTypeService) {
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

    this.masterTypeService.save(this.data).subscribe(result => {
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