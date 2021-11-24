import { Component, OnInit, OnDestroy } from '@angular/core';
import { LookupDto } from '../lookup/lookup-dto.model';
import { LookupService } from '../lookup/lookup.service';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { LOOKUP_TIPE_MERCHANT } from 'src/app/shared/constants/base-constant';
import { Router } from '@angular/router';
import { WorkInProgressService } from './work-in-progress.service';
// import { Subscription, Observable } from 'rxjs';
import 'rxjs/add/observable/interval';


@Component({
  selector: 'op-work-in-progress',
  templateUrl: './work-in-progress.component.html',
  styleUrls: ['./work-in-progress.component.css']
})
export class WorkInProgressComponent implements OnInit, OnDestroy {

    constructor(private router: Router,
        private workInProgressService: WorkInProgressService) { }

    pieChartLabels: string[] = ['On Progress', 'Pending'];
    pieChartOptions: any = {
        legend: {
            display: true
        },
        responsive: true,
        maintainAspectRatio: false,
        tooltips: {
            displayColors: false,
        }
    };


    // pieChartData: number[] = [4, 3];
    pieChartType = 'pie';

    jmlDataV: number;
    jmlDataA: number;
    jmlDataE: number;
    jmlDataV2: number;
    jmlDataA2: number;
    jmlDataE2: number;

    // onprogress, pending
    dataVerification: number[] = [0, 0];
    dataApprove: number[] = [0, 0];
    dataEdd: number[] = [0, 0];
    // subscription: Subscription;

    ngOnInit() {
        this.getData();
        // this.subscription = Observable.interval(10000)
        //     .subscribe((val) => {
        //         this.getData();
        //     });
    }

    ngOnDestroy(): void {
        // this.subscription.unsubscribe();
    }

    getData() {
        this.workInProgressService.getDataDashboard()
            .subscribe(
                (res: HttpResponse<Map<string, number>>) => this.onSuccess(res.body, res.headers),
                (res: HttpErrorResponse) => console.log(res.message),
                () => {  }
            );
    }

    private onSuccess(data, headers) {
        if (data === null) {
            return;
        }
        console.log('dataaaaa Dashboard ---> ', data);
        // this.dataVerification = [];
        // this.dataApprove = [];
        // this.dataEdd = [];

        data = this.validationValue(data);

        this.jmlDataV = data.VERIFIER_START_VIEW + data.VVIP_VERIFIER_START_VIEW + data.VIP_VERIFIER_START_VIEW;
        this.jmlDataV2 = data.VIP_REGISTERED + data.VVIP_REGISTERED + data.REGISTERED;

        this.jmlDataA = data.APPROVER_START_VIEW + data.VVIP_APPROVER_START_VIEW + data.VIP_APPROVER_START_VIEW;
        this.jmlDataA2 = data.VERIFIED + data.VIP_VERIFIED + data.VVIP_VERIFIED;

        this.jmlDataE = data.EDD_START_VIEW + data.VVIP_EDD_START_VIEW + data.VIP_EDD_START_VIEW;
        this.jmlDataE2 = data.EDD+ data.VIP_EDD+ data.VVIP_EDD;

        console.log('data.VIP_REGISTERED -> ', data.VIP_REGISTERED);
        console.log('data.VVIP_REGISTERED -> ', data.VVIP_REGISTERED);
        console.log('data.REGISTERED -> ', data.REGISTERED);

        this.dataVerification = [this.jmlDataV, this.jmlDataV2];
        console.log("data ver:", this.dataVerification);
        
        this.dataApprove = [this.jmlDataA, this.jmlDataA2];
        console.log("data app:", this.dataApprove);

        this.dataEdd = [this.jmlDataE, this.jmlDataE2];
        console.log("data edd:", this.dataEdd);

    }

    validationValue(data) {
        if (!data.VERIFIER_START_VIEW) {
            data.VERIFIER_START_VIEW = 0;
        }
        if (!data.VVIP_VERIFIER_START_VIEW) {
            data.VVIP_VERIFIER_START_VIEW = 0;
        }
        if (!data.VIP_VERIFIER_START_VIEW) {
            data.VIP_VERIFIER_START_VIEW = 0;
        }
        if (!data.VIP_REGISTERED) {
            data.VIP_REGISTERED = 0;
        }
        if (!data.VVIP_REGISTERED) {
            data.VVIP_REGISTERED = 0;
        }
        if (!data.REGISTERED) {
            data.REGISTERED = 0;
        }
        if (!data.APPROVER_START_VIEW) {
            data.APPROVER_START_VIEW = 0;
        }
        if (!data.VVIP_APPROVER_START_VIEW) {
            data.VVIP_APPROVER_START_VIEW = 0;
        }
        if (!data.VIP_APPROVER_START_VIEW) {
            data.VIP_APPROVER_START_VIEW = 0;
        }
        if (!data.VERIFIED) {
            data.VERIFIED = 0;
        }
        if (!data.VIP_VERIFIED) {
            data.VIP_VERIFIED = 0;
        }
        if (!data.VVIP_VERIFIED) {
            data.VVIP_VERIFIED = 0;
        }
        if (!data.EDD_START_VIEW) {
            data.EDD_START_VIEW = 0;
        }
        if (!data.VVIP_EDD_START_VIEW) {
            data.VVIP_EDD_START_VIEW = 0;
        }
        if (!data.VIP_EDD_START_VIEW) {
            data.VIP_EDD_START_VIEW = 0;
        }
        if (!data.EDD) {
            data.EDD = 0;
        }
        if (!data.VIP_EDD) {
            data.VIP_EDD = 0;
        }
        if (!data.VVIP_EDD) {
            data.VVIP_EDD = 0;
        }
        return data;
    }

    // events
    chartClickedVerification(e:any): void {
    
        // if (e.active.length > 0) {
        //     const datasetIndex = e.active[0]._datasetIndex;
        //     const dataIndex = e.active[0]._index;
        //     const dataObject = this.pieChartLabels[dataIndex];
        //     if (dataObject === 'Pending') {
        //         console.log('Pending');
        //     } else if (dataObject === 'On Progress') {
        //         console.log('On Progress');
        //     }
        //     console.log(dataObject);
        this.router.navigate(['/main/work-in-progress/detail']);
        // }
    }

    // events
    chartClickedApprove(e: any): void {
        // console.log(e);
        // if (e.active.length > 0) {
        //     const datasetIndex = e.active[0]._datasetIndex;
        //     const dataIndex = e.active[0]._index;
        //     const dataObject = this.pieChartLabels[dataIndex];
        //     if (dataObject === 'Pending') {
        //         console.log('Pending');
        //     } else if (dataObject === 'On Progress') {
        //         console.log('On Progress');
        //     }
        //     console.log(dataObject);
        this.router.navigate(['/main/work-in-progress/detail-approve']);
        // }
    }

    // events
    chartClickedEdd(e: any): void {
        // console.log(e);
        // if (e.active.length > 0) {
        //     const datasetIndex = e.active[0]._datasetIndex;
        //     const dataIndex = e.active[0]._index;
        //     const dataObject = this.pieChartLabels[dataIndex];
        //     if (dataObject === 'Pending') {
        //         console.log('Pending');
        //     } else if (dataObject === 'On Progress') {
        //         console.log('On Progress');
        //     }
        //     console.log(dataObject);
        this.router.navigate(['/main/work-in-progress/detail-edd']);
        // }
    }

    chartHovered(e: any): void {
        console.log(e);
    }

}
