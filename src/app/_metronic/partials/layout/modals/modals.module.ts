import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { InlineSVGModule } from 'ng-inline-svg-2';
import { InviteUsersModalComponent } from './invite-users-modal/invite-users-modal.component';
import { MainModalComponent } from './main-modal/main-modal.component';
import { UpgradePlanModalComponent } from './upgrade-plan-modal/upgrade-plan-modal.component';
import { ModalComponent } from './modal/modal.component';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from '../../../shared/shared.module';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  declarations: [
    InviteUsersModalComponent,
    MainModalComponent,
    UpgradePlanModalComponent,
    ModalComponent,
  ],
  imports: [
    CommonModule,
    InlineSVGModule,
    RouterModule,
    NgbModalModule,
    SharedModule,
    ComponentsModule,
  ],
  exports: [
    InviteUsersModalComponent,
    MainModalComponent,
    UpgradePlanModalComponent,
    ModalComponent,
  ],
})
export class ModalsModule {}
