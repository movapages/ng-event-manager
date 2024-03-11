import {Component} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {MAT_DATE_FORMATS} from "@angular/material/core";
import {
  MatCalendar,
  MatDatepicker,
  MatDatepickerInput,
  MatDatepickerToggle
} from "@angular/material/datepicker";
import {MatCard, MatCardContent, MatCardHeader, MatCardSubtitle, MatCardTitle} from "@angular/material/card";
import {MatFormFieldModule, MatFormField, MatHint, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatStepper} from "@angular/material/stepper";
import {MatDivider} from "@angular/material/divider";
import {MatButton, MatIconButton} from "@angular/material/button";
import {HandleEventsService} from "../services/handle-events.service";
import {AsyncPipe, DatePipe, JsonPipe} from "@angular/common";
import EventInterface from "../interfaces/eventInterface";
import {MatList, MatListItem} from "@angular/material/list";

export const MY_FORMATS = {
  parse: {
    dateInput: 'MM/YYYY',
  },
  display: {
    dateInput: 'MM/YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@Component({
  selector: 'app-event-calendar',
  standalone: true,
  imports: [
    MatDatepicker,
    MatCalendar,
    MatCard,
    MatLabel,
    MatCardHeader,
    MatCardTitle,
    MatCardSubtitle,
    MatCardContent,
    MatFormField,
    MatDatepickerInput,
    MatInput,
    MatHint,
    MatDatepickerToggle,
    MatFormFieldModule,
    MatStepper,
    MatDivider,
    ReactiveFormsModule,
    MatIconButton,
    MatButton,
    DatePipe,
    AsyncPipe,
    JsonPipe,
    MatList,
    MatListItem
  ],
  templateUrl: './event-calendar.component.html',
  styleUrl: './event-calendar.component.css',
  providers: [
    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
    {provide: HandleEventsService, useClass: HandleEventsService},
    {provide: DatePipe, useClass: DatePipe}
  ]
})
export class EventCalendarComponent {
  pickedDate: Date | string | null = new Date();
  newEventForm: FormGroup;
  selectedEvents!: EventInterface[];

  constructor(public handleEvent: HandleEventsService, private datePipe: DatePipe) {
    this.newEventForm = new FormGroup<any>({
      eventDate: new FormControl(''),
      eventTitle: new FormControl(''),
      eventNotes: new FormControl('')
    });
    this.selectedEvents = [];
  }

  selectedDate(calendarDate: Date | null): void {
    this.pickedDate = this.datePipe.transform(calendarDate);
    const eventList = this.handleEvent.eventBS.getValue() || [];
    this.selectedEvents = eventList.filter(ev => ev.eventDate === this.pickedDate);
  }

  onSubmit() {
    this.newEventForm.value.eventDate = this.datePipe.transform(this.newEventForm.value.eventDate);
    const curEventList = this.handleEvent.eventBS.getValue() || [];
    this.handleEvent.eventBS.next([... curEventList,this.newEventForm.value]);
    this.resetEventForm();
  }

  resetEventForm() {
    this.newEventForm.reset();
  }
}
