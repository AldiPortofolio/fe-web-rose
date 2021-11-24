import { Component, OnInit, Input } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { UserCategory } from './user-category.model';
import { UserCategoryService } from './user-category.service';
import Swal from 'sweetalert2';
import { FeatureImageModalComponent } from '../feature/feature-image.modal.component';

@Component({
  selector: 'op-user-category-modal',
  templateUrl: './user-category.modal.component.html',
  styleUrls: ['./user-category.modal.component.css']
})
export class UserCategoryModalComponent implements OnInit {

  @Input() statusRec;
  @Input() objEdit: UserCategory;
  @Input() viewMsg;

  userCategory: UserCategory;

  isFormDirty: Boolean = false;

  listAppID = [
    { code: "1", name: "Ottopay" },
    { code: "2", name: "Indomarco" },
    { code: "3", name: "SFA" },
  ]

  constructor( private userCategoryService: UserCategoryService,
    private modalService: NgbModal,
    private ngxService: NgxUiLoaderService) {
  }

  ngOnInit() {
    if (this.statusRec === 'addnew') {
      this.userCategory = {};
      this.userCategory.id = 0;
      this.userCategory.code = '';
      this.userCategory.name = '';
      this.userCategory.notes = '';
      this.userCategory.appId = '';
      this.userCategory.logo = '';
      this.userCategory.seq = 0
    } else {
      this.userCategory = this.objEdit;
    }
  }

  save(): void {
    this.ngxService.start();

    this.userCategoryService.save(this.userCategory).subscribe(result => {
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

  openGallery() {
    const modalRef = this.modalService.open(FeatureImageModalComponent, { size: 'lg' });
    modalRef.result.then((result) => {
      this.userCategory.logo = result;
      
    }, (reason) => {
      console.log("close")
    });
  }

}
