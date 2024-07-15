import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { FilterOption } from 'src/app/models/new.model';
import { DashboardService } from 'src/app/services/dashboard/dashboard.service';
import { SectionsService } from 'src/app/services/dashboard/sections/sections.service';

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

  isLoading$: Observable<boolean>;
  hasError: boolean = false;

  constructor(
    private sectionsService: SectionsService,
    private cdr: ChangeDetectorRef
  ) {
    this.isLoading$ = this.sectionsService.isLoading$;
  }

  ngOnInit(): void {
    this.getAllSection();
  }

  getAllSection() {
    this.hasError = false;
    const getAllSectionSubscr = this.sectionsService
      .getAllSections()
      .subscribe({
        next: (data: any[]) => {
          this.items = data;
          this.cdr.detectChanges();
        },
        error: (error: any) => {
          console.log('[DELETE]', error);
          this.hasError = true;
        },
      });
    this.unsubscribe.push(getAllSectionSubscr);
  }

  ngOnDestroy() {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }
}
