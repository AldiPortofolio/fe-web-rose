import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { CategoryLevelFeatureComponent } from './category-level-feature.component';
import { CategoryLevelFeatureModalComponent } from './category-level-feature.modal.component';
import { CategoryLevelFeatureService } from './category-level-feature.service';

@NgModule({
    declarations: [
        CategoryLevelFeatureComponent,
        CategoryLevelFeatureModalComponent
    ],
    imports: [
        CommonModule,
        NgbModule,
        FormsModule,
    ],
    entryComponents: [
        CategoryLevelFeatureComponent,
        CategoryLevelFeatureModalComponent
    ],
    providers: [
        CategoryLevelFeatureService,
    ],
    exports: [
        CategoryLevelFeatureModalComponent,
    ]
})
export class CategoryLevelFeatureModule { }
