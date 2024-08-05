import { Component, ElementRef, ViewChild } from '@angular/core';
import { ModalComponent } from 'src/app/components/shared/modal/modal.component';
import { ModalConfig } from 'src/app/models/modal.model';

@Component({
  selector: 'app-news-category-add-orupdate',
  templateUrl: './news-category-add-orupdate.component.html',
  styleUrls: ['./news-category-add-orupdate.component.scss'],
})
export class NewsCategoryAddOrupdateComponent {
  @ViewChild('addcategory') private modalComponent: ModalComponent;

  modalConfig: ModalConfig = {
    modalTitle: 'اضافة باب رئيسى',
    dismissButtonLabel: 'حفظ',
    closeButtonLabel: 'الغاء',
  };

  async openModal() {
    return await this.modalComponent.open();
  }
  async closeModal() {
    return await this.modalComponent.dismiss();
  }
}
