import {Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs";
import EventInterface from "../interfaces/eventInterface";

@Injectable({providedIn: 'root'})
export class HandleEventsService {
  private eventList!: EventInterface[];
  eventBS = new BehaviorSubject(this.eventList);
}
