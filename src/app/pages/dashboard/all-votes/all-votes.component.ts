import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { ModalConfig } from 'src/app/models/modal.model';
import { VoteService } from 'src/app/services/dashboard/vote/vote.service';
import { UtilsService } from 'src/app/services/utils/utils.service';

@Component({
  selector: 'app-all-votes',
  templateUrl: './all-votes.component.html',
  styleUrl: './all-votes.component.scss',
})
export class AllVotesComponent {
  private unsubscribe: Subscription[] = [];

  items: {
    sectionId: number;
    secTitle: string;
    hide: boolean;
    weeklySection: boolean;
    keywords: string;
    description: string;
    categoryId: number;
  }[] = [];

  selectedVotes: string[] = [];

  customBtnsOptions: {
    content: string;
    onClick: () => void;
    bgColor: string;
  }[] = [
    {
      content: 'حذف',
      onClick: this.deleteVotes,
      bgColor: 'danger',
    },
  ];

  headerOptions: {
    checkBox: boolean;
    cols: string[];
    actions: string[];
    search: boolean;
    title: string;
  } = {
    cols: ['title', 'date', 'time'],
    checkBox: true,
    actions: [''],
    search: true,
    title: 'أستطلاعات الرأي',
  };

  modalConfig: ModalConfig = {
    modalTitle: 'اختيار صورة',
    dismissButtonLabel: 'تأكيد',
    closeButtonLabel: 'الغاء',
  };

  hasError: boolean = false;
  isLoading$: Observable<boolean>;

  constructor(
    private utilsService: UtilsService,
    private voteService: VoteService,
    private cdr: ChangeDetectorRef
  ) {
    this.isLoading$ = this.voteService.isLoading$;
  }

  ngOnInit(): void {
    this.getAllVotes();
  }

  deleteVotes() {}

  getAllVotes() {
    this.hasError = false;

    const getAllVotesSubscr = this.voteService.getAllVotes().subscribe({
      next: (data: any[]) => {
        this.items = data;
        this.cdr.detectChanges();
      },
      error: (error: any) => {
        console.log('[GET_ALL_VOTES]', error);
        this.hasError = true;
      },
    });
    this.unsubscribe.push(getAllVotesSubscr);
  }

  toggleSelectAll(e: any) {
    this.utilsService.toggleSelectAll(e, this.selectedVotes, this.items);
  }

  recieveIsVoteAdded(data: boolean) {
    if (data) {
      this.getAllVotes();
    }
  }

  recieveSelectedItems(data: string[]) {
    this.selectedVotes = data;
  }

  ngOnDestroy() {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }
}
