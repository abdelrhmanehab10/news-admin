import { ChangeDetectorRef, Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { DashboardService } from 'src/app/services/dashboard/dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {
  private unsubscribe: Subscription[] = [];
  hasError: boolean = false;
  constructor(
    private dashboardService: DashboardService,
    private cdr: ChangeDetectorRef
  ) {}
}
