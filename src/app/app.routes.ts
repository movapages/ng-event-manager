import { Routes } from '@angular/router';
import {EventCalendarComponent} from "./event-calendar/event-calendar.component";

export const routes: Routes = [
  {path: '**', component: EventCalendarComponent}
];
