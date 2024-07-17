import { AfterViewInit, Component, Input } from '@angular/core';
import $ from 'jquery';
import moment from 'moment';
import 'daterangepicker';
@Component({
  selector: 'app-date-input',
  templateUrl: './date-input.component.html',
})
export class DateInputComponent implements AfterViewInit {
  @Input() label = '';

  ngAfterViewInit() {
    $('#kt_daterangepicker_2').daterangepicker({
      timePicker: true,
      singleDatePicker: true,
      parentEl: '.date',

      startDate: moment().startOf('hour'),
      endDate: moment().startOf('hour').add(32, 'hour'),
      locale: {
        format: 'M/DD hh:mm A',
      },
    });
  }
}
