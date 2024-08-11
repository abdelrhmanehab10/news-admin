import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import {
  debounceTime,
  distinctUntilChanged,
  Observable,
  Subscription,
} from 'rxjs';
import {
  FilterOption,
  ListOptions,
  ModalConfig,
} from 'src/app/models/components.model';
import { VoteService } from 'src/app/services/dashboard/vote/vote.service';
import { UtilsService } from 'src/app/services/utils/utils.service';

@Component({
  selector: 'app-all-votes',
  templateUrl: './all-votes.component.html',
  styleUrl: './all-votes.component.scss',
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
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef,
    private toast: ToastrService
  ) {
    this.isLoading$ = this.voteService.isLoading$;
  }

  ngOnInit(): void {
    this.getAllVotes();
  }

  onSearch(e: any) {
    this.search = e.target.value;

    this.getAllVotes(300, this.search, this.filterOptions.categoryId);
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

  getAllVotes(delay: number = 0, search?: string, categoryId?: string) {
    this.hasError = false;

    const getAllVotesSubscr = this.voteService
      .getAllVotes(search, categoryId)
      .pipe(debounceTime(delay), distinctUntilChanged())
      .subscribe({
        next: (data: any[]) => {
          const items = data.map((item) => ({
            name: item.pollBody,
            sectionId: item.pollId,
            active: item.activated,
          }));
          this.items = items;
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
    this.getAllVotes(0, this.search, data.categoryId);
  }

  ngOnDestroy() {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }
}
