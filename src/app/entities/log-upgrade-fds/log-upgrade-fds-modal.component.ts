import { Component, OnInit, Input } from '@angular/core';
import { LogUpgradeFds } from './log-upgrade-fds.model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { LogUpgradeFdsService } from './log-upgrade-fds.service';
import { WorkInProgressService } from '../work-in-progress/work-in-progress.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'op-log-upgrade-fds-modal',
  templateUrl: './log-upgrade-fds-modal.component.html',
  styleUrls: ['./log-upgrade-fds-modal.component.css']
})
export class LogUpgradeFdsModalComponent implements OnInit {
  
    @Input() statusRec;
    @Input() objEdit: LogUpgradeFds;
    @Input() viewMsg;

    logUpgradeFds: LogUpgradeFds;
    isFormDirty: Boolean = false;


    constructor(private modalService: NgbModal,
        private ngxService: NgxUiLoaderService,
        private logUpgradeFdsService: LogUpgradeFdsService,
        private workInProgressService: WorkInProgressService,
    ) {
    }

    ngOnInit() {
        console.log(this.objEdit);
        this.logUpgradeFds = this.objEdit;
    }
    closeForm(): void {
        if (this.isFormDirty === true) {
            this.modalService.dismissAll('refresh');
        } else {
            this.modalService.dismissAll('close');
        }
    }

    retry(){
        this.ngxService.start();
        console.log(this.logUpgradeFds);
        var obj = JSON.parse(this.logUpgradeFds.req);
        console.log(obj);
        this.workInProgressService.upgradeMerchantRetry(obj).subscribe;
        this.workInProgressService.upgradeMerchantRetry(obj).subscribe(result => {
            this.isFormDirty = true;
            if (result.body.errCode === '00') {
                console.log('save data yaaa');
                this.logUpgradeFdsService.save(this.logUpgradeFds).subscribe(res => {
                    console.log(res);
                });
                this.closeForm();
            } else {
                console.log('error');
                Swal.fire('Failed', result.body.errDesc, 'error').then(
                );
            }
            this.ngxService.stop();
        });
    }

}
