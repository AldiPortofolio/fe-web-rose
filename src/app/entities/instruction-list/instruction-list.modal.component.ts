import { Component, OnInit, Input } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import Swal from 'sweetalert2';
import { InstructionList } from './instruction-list.model';
import { InstructionListService } from './instruction-list.service';
import { BUCKET_NAME, SERVER_LOAD_IMAGE } from 'src/app/shared/constants/base-constant';
import { UploadImageService } from 'src/app/shared/upload-image.service';

@Component({
  selector: 'instruction-list-modal',
  templateUrl: './instruction-list.modal.component.html',
  styleUrls: ['./instruction-list.modal.component.css']
})
export class InstructionListModalComponent implements OnInit {

  @Input() statusRec;
  @Input() objEdit: InstructionList;
  @Input() viewMsg;

  instruction: InstructionList;
  
  isFormDirty: Boolean = false;

  imgUrlLogoInstruction;
  imageLogoInstruction: Boolean = false

  constructor(private modalService: NgbModal,
    private instructionListService: InstructionListService,
    private ngxService: NgxUiLoaderService,
    private uploadImageService: UploadImageService,
    ) {
  }

  ngOnInit() {

    if (this.statusRec === 'addnew') {
      this.instruction = {};
      this.instruction.id = 0;
      this.instruction.title = '';
      this.instruction.logo = '';
      this.instruction.description = '';
      this.instruction.sequence = 0;
    } else {
      this.instruction = this.objEdit;
      this.imgUrlLogoInstruction = this.instruction.logo
    }
  }

  private onError(error, name) {
    this.ngxService.stop();
    console.log('error..', error, name);
  }

  save(): void {
    this.ngxService.start();
    this.uploadImageService.uploadImage(this.imgUrlLogoInstruction, "image_logo_instruction", this.instruction.title);
    this.instructionListService.save(this.instruction).subscribe(result => {
      this.isFormDirty = true;
      if (result.body.errCode === '00') {
        Swal.fire('Success', 'Success save to DB', 'success')
          .then( () => this.closeForm() );
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

  processFileLogo(imageInput: any) {
        console.log(imageInput);
        const file: File = imageInput.files[0];
        const reader = new FileReader();

        /* CHECK IMAGE SIZE */
        if (!this.checkSizeImage(file)) {
            return;
        }

        console.log('file.size', (file.size / 1024 / 1024).toFixed(4));

        reader.readAsDataURL(file);
        reader.onload = (_event) => {
            console.log(reader.result);
            this.imgUrlLogoInstruction = reader.result;
            this.imageLogoInstruction = true;
            this.instruction.logo = this.generateUrlImage("image_logo_instruction");
        };
    }

  checkSizeImage(file: File) {
        if (file.size > (1.5 * 1025 * 1024)) {
            Swal.fire('Error', 'Ukuran gambar maksimum 1.5 MB');
            return false;
        }
        return true;
    }

  generateUrlImage (tipe: string) {
        return SERVER_LOAD_IMAGE+ '/' + BUCKET_NAME + '/' + this.instruction.title + '_' + tipe + '.jpeg';
    }

}
