import { Component, OnInit, Input } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import Swal from 'sweetalert2';
import { ImageManagement } from './image-management.model';
import { ImageManagementService } from './image-management.service';

@Component({
  selector: 'image-management-modal',
  templateUrl: './image-management.modal.component.html',
  styleUrls: ['./image-management.modal.component.css']
})
export class ImageManagementModalComponent implements OnInit {

  @Input() statusRec;
  @Input() objEdit: ImageManagement;
  @Input() viewMsg;

  imageManagement: ImageManagement;

  isFormDirty: Boolean = false;

  constructor(private modalService: NgbModal,
    private imageManagementService: ImageManagementService,
    private ngxService: NgxUiLoaderService,) {
  }

  ngOnInit() {
    if (this.statusRec === 'addnew') {
      this.imageManagement = {};
      this.imageManagement.id = 0;
      this.imageManagement.name = '';
      this.imageManagement.url = '';
      this.imageManagement.notes = '';
      this.imageManagement.images = '';
    } else {
      this.imageManagement = this.objEdit;
    }
  }

  save(): void {
    this.ngxService.start();

    this.imageManagementService.save(this.imageManagement).subscribe(result => {
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

  // upload image
  processFileImage(imageInput: any) {
    const file: File = imageInput.files[0];
    const reader = new FileReader();

    reader.readAsDataURL(file);
    reader.onload = (_event) => {
      this.imageManagement.images = reader.result;

    };
  }

  downloadFile(filePath) {

    fetch(filePath)
      .then(res => res.blob()) // Gets the response and returns it as a blob
      .then(blob => {
        let url2 = window.URL.createObjectURL(blob)
        let a = document.createElement('a');
        a.href = url2;
        a.download = filePath.slice(30, 100) + '.jpeg'
        a.click();
      });
  }

}
