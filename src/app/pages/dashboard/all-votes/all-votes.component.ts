import { Component, ViewChild } from '@angular/core';
import { ModalComponent } from 'src/app/components/shared/modal/modal.component';
import { ModalConfig } from 'src/app/models/modal.model';

@Component({
  selector: 'app-all-votes',
  templateUrl: './all-votes.component.html',
  styleUrl: './all-votes.component.scss',
})
export class AllVotesComponent {
  @ViewChild('modal') private modalComponent: ModalComponent;

  customBtnsOptions: {
    content: string;
    onClick: () => void;
    bgColor: string;
  }[] = [
    {
      content: 'اضافة',
      onClick: this.openModal,
      bgColor: 'primary',
    },
    {
      content: 'حذف',
      onClick: this.deleteVotes,
      bgColor: 'danger',
    },
  ];

  modalConfig: ModalConfig = {
    modalTitle: 'اختيار صورة',
    dismissButtonLabel: 'تأكيد',
    closeButtonLabel: 'الغاء',
  };

  async openModal() {
    return await this.modalComponent.open();
  }

  deleteVotes() {}
}
