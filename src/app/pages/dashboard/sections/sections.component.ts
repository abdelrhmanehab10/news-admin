import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { FilterOption } from 'src/app/models/components.model';
import { SectionsService } from 'src/app/services/dashboard/sections/sections.service';
import { UtilsService } from 'src/app/services/utils/utils.service';

@Component({
  selector: 'app-sections',
  templateUrl: './sections.component.html',
  styleUrl: './sections.component.scss',
})
export class SectionsComponent implements OnInit {
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

  filterOptions: FilterOption = { isCategories: true };
  selectedSections: string[] = [];
  pageNumber: number = 1;

  isLoading$: Observable<boolean>;
  hasError: boolean = false;

  constructor(
    private sectionsService: SectionsService,
    private utilsService: UtilsService,
    private cdr: ChangeDetectorRef
  ) {
    this.isLoading$ = this.sectionsService.isLoading$;
  }

  toggleSelectAll(e: any) {
    this.selectedSections = this.utilsService.toggleSelectAll(e, this.items);
  }

  ngOnInit(): void {
    this.getAllSections();
  }

  getAllSections() {
    this.hasError = false;

    const getAllSectionSubscr = this.sectionsService
      .getAllSections(this.pageNumber, 2)
      .subscribe({
        next: (data: any[]) => {
          this.items = data;
          this.cdr.detectChanges();
        },
        error: (error: any) => {
          console.log('[GET_ALL_SECTIONS]', error);
          this.hasError = true;
        },
      });
    this.unsubscribe.push(getAllSectionSubscr);
  }

  // deleteSections() {
  //   this.hasError = false;
  //   const deleteSectionsSubscr = this.sectionsService
  //     .deleteSections()
  //     .subscribe({
  //       next: (data: any[]) => {
  //         this.items = data;
  //         this.cdr.detectChanges();
  //       },
  //       error: (error: any) => {
  //         console.log('[DELETE]', error);
  //         this.hasError = true;
  //       },
  //     });
  //   this.unsubscribe.push(deleteSectionsSubscr);
  // }

  recieveSelectedItems(data: string[]) {
    this.selectedSections = data;
  }

  recieveIsNewSectionAdded(data: boolean) {
    if (data) {
      this.getAllSections();
    }
  }

  ngOnDestroy() {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }
}
