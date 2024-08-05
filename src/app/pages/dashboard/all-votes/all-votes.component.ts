import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import {
  debounceTime,
  distinctUntilChanged,
  Observable,
  Subscription,
} from 'rxjs';
import { FilterOption, ListOptions } from 'src/app/models/components.model';
import { ModalConfig } from 'src/app/models/modal.model';
import { VoteService } from 'src/app/services/dashboard/vote/vote.service';
import { UtilsService } from 'src/app/services/utils/utils.service';

@Component({
  selector: 'app-all-votes',
  templateUrl: './all-votes.component.html',
})
export class AllVotesComponent {
  private unsubscribe: Subscription[] = [];

  items: any[] = [];
  search = '';

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

  listOptions: ListOptions = {
    isCheckList: true,
    isEdit: false,
    isEnable: true,
    isDelete: false,
    edit: () => {},
    enable: (id: string) => {
      this.activeVote(id);
    },
    delete: () => {},
  };

  filterOptions: FilterOption = {
    isCategories: true,
    categoryId: '',
  };

  hasError: boolean = false;
  isLoading$: Observable<boolean>;

  constructor(
    private utilsService: UtilsService,
    private voteService: VoteService,
    private cdr: ChangeDetectorRef,
    private toast: ToastrService
  ) {
    this.isLoading$ = this.voteService.isLoading$;
  }

  ngOnInit(): void {
    this.getAllVotes();
  }

  deleteVotes() {
    this.hasError = false;

    const deleteVotesSubscr = this.voteService
      .deleteVotes(this.selectedVotes)
      .subscribe({
        next: (data: string) => {
          if (data) {
            this.toast.error(data);
            this.getAllVotes();
          }
        },
        error: (error: any) => {
          console.log('[DELETE_VOTES]', error);
          this.hasError = true;
        },
      });
    this.unsubscribe.push(deleteVotesSubscr);
  }

  getAllVotes(delay: number = 0) {
    this.hasError = false;

    const getAllVotesSubscr = this.voteService
      .getAllVotes(this.search, this.filterOptions.categoryId)
      .pipe(debounceTime(delay), distinctUntilChanged())
      .subscribe({
        next: (data: any[]) => {
          if (data) {
            const items = data.map((item) => ({
              name: item.pollBody,
              id: item.pollId,
              active: item.activated,
            }));
            this.items = items;
            this.cdr.detectChanges();
          } else {
            this.items = [];
          }
        },
        error: (error: any) => {
          console.log('[GET_ALL_VOTES]', error);
          this.hasError = true;
        },
      });
    this.unsubscribe.push(getAllVotesSubscr);
  }

  toggleSelectAll(e: any) {
    this.selectedVotes = this.utilsService.toggleSelectAll(e, this.items);
  }

  activeVote(id: string) {
    this.hasError = false;

    const activeVoteSubscr = this.voteService.activeVote(id).subscribe({
      next: (data: string) => {
        if (data) {
          this.toast.success(data);
          this.getAllVotes();
        }
      },
      error: (error: any) => {
        console.log('[ACTIVE_VOTES]', error);
        this.hasError = true;
      },
    });
    this.unsubscribe.push(activeVoteSubscr);
  }

  recieveIsVoteAdded(data: boolean) {
    if (data) {
      this.getAllVotes();
    }
  }

  recieveSelectedItems(data: string[]) {
    this.selectedVotes = data;
  }

  recieveFilterOptions(data: FilterOption) {
    this.filterOptions = data;
    this.getAllVotes(0);
  }

  ngOnDestroy() {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }
}
