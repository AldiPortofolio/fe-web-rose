import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { WorkInProgressService } from './work-in-progress.service';
import { MerchantWipQueue } from './merchant-wip.model';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import Swal from 'sweetalert2';
import { NgbModal, NgbTypeahead, NgbActiveModal, } from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs';

@Component({
  selector: 'op-wip-confirm-modal',
    templateUrl: './wip-detail-confirm-modal.html',
    styleUrls: ['./wip-detail-confirm-modal.css']
})
export class WipDetailConfirmModalComponent implements OnInit {
    @Input() priority;
    @Input() idWipQueue;

    @ViewChild('instance') instance: NgbTypeahead;
    focus$ = new Subject<string>();
    click$ = new Subject<string>();

    merchantWipQueue: MerchantWipQueue;

    constructor(private workInProgressService: WorkInProgressService,
                private modalService: NgbModal) { }

    ngOnInit() {
    }

    onKey() {

    }

    save(): void {
        console.log('idWipQueue --> ', this.idWipQueue);
        console.log("vip", );
        this.workInProgressService.setPriority(this.idWipQueue, this.priority).subscribe(
            result => {
                console.log("resultbody", result);
                this.modalService.dismissAll('close');
            });
        // this.workInProgressService(this.userName, this.credential)
        //     .subscribe(
        //         result => {
        //             if (result.body.errCode === '00') {
        //                 Swal.fire('Success', 'Success change password', 'success');
        //                 this.closeForm('tutup save');
        //                 this.modalService.dismissAll('tutup save');
        //             } else {
        //                 Swal.fire('Failed', result.body.errDesc, 'error');
        //             }
        //         });
    }

    closeForm(reason): void {
        this.modalService.dismissAll(reason);
    }

}
