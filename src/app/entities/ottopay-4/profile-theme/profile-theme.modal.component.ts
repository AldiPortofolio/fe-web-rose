import { Component, OnInit, Input } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { ProfileTheme } from './profile-theme.model';
import { ProfileThemeService } from './profile-theme.service';
import Swal from 'sweetalert2';
import { UserCategoryService } from '../user-category/user-category.service';
import { UserCategory } from '../user-category/user-category.model';
import { ProfileThemeImageModalComponent } from './profile-theme-image.modal.component';
import { LevelMerchantService } from '../../level-merchant/level-merchant.service';
import { LevelMerchant } from '../../level-merchant/level-merchant.model';

@Component({
  selector: 'op-profile-theme-modal',
  templateUrl: './profile-theme.modal.component.html',
  styleUrls: ['./profile-theme.modal.component.css']
})
export class ProfileThemeModalComponent implements OnInit {

  @Input() statusRec;
  @Input() objEdit: ProfileTheme;
  @Input() viewMsg;

  profileTheme: ProfileTheme;
  listUserCategory: UserCategory[] = [];
  listLevelMerchant: LevelMerchant[] = [];

  isFormDirty: Boolean = false;
  closeResult: string;
  toggle: boolean = false;

  searchTerm = {
    id: 0,
    code: '',
    name: '',
    notes: '',
    seq: 0,
    page: 1,
    limit: 999,
  }

  constructor(private modalService: NgbModal,
    private ngxService: NgxUiLoaderService,
    private ProfileThemeService:  ProfileThemeService,
    private userCategoryService: UserCategoryService,
    private levelMerchantService: LevelMerchantService
    ) {
  }

  ngOnInit() {
    this.loadListUserCategory()
    this.loadListLevelMerchant()

    if (this.statusRec === 'addnew') {
      this.profileTheme = {};
      this.profileTheme.id = 0;
      this.profileTheme.userCategoryId = 0;
      this.profileTheme.levelMerchantId = 0;
      this.profileTheme.dashboardTopBackground = '';
      this.profileTheme.themeColor = '#ffffff';
      this.profileTheme.fontColor = '#ffffff';
      this.profileTheme.dashboardLogo = '';
      this.profileTheme.dashboardText = '';
      this.profileTheme.profileBackgroundImage = '';
      this.profileTheme.status = '';
      this.profileTheme.url = '';
    } else {
      this.profileTheme = this.objEdit;
    }
  }

  private loadListUserCategory() {
    this.userCategoryService.filter({
      filter: this.searchTerm,
    })
      .subscribe(
        (res: HttpResponse<UserCategory[]>) => this.onSuccess(res.body, res.headers, 0),
        (res: HttpErrorResponse) => this.onError(res.message, 'Get List User Category')
      );
  }

  private loadListLevelMerchant() {
    this.levelMerchantService.getAllLevelMerchant(100)
      .subscribe(
        (res: HttpResponse<LevelMerchant[]>) => this.onSuccess(res.body, res.headers, 1),
        (res: HttpErrorResponse) => this.onError(res.message, 'Get List Level Merchant')
      );
  }

  private onSuccess(data, headers, code) {
    if (data.contents.length < 0) {
      return;
    }
    console.log(data);

    if (code == 0) {
      this.listUserCategory = data.contents;
    } else {
      this.listLevelMerchant = data.contents
    }
  }

  private onError(error, name) {
    this.ngxService.stop();
    console.log('error..', error, name);
  }

  save(): void {
    this.ngxService.start();

    this.profileTheme.userCategoryId = +this.profileTheme.userCategoryId;
    this.profileTheme.levelMerchantId = +this.profileTheme.levelMerchantId;

    this.ProfileThemeService.save(this.profileTheme).subscribe(result => {
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

  openGallery(nofield) {
    const modalRef = this.modalService.open(ProfileThemeImageModalComponent, { size: 'lg' });
    modalRef.result.then((result) => {
      if (nofield === 1) {
        this.profileTheme.dashboardTopBackground = result;
      } else if (nofield === 2) {
        this.profileTheme.dashboardLogo = result;
      } else {
        this.profileTheme.profileBackgroundImage = result;
      }
    }, (reason) => {
      console.log("close")
    });
  }
  

}
