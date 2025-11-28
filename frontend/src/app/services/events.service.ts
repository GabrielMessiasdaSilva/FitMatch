import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';

interface EventPayload {
  type: string;
  payload?: any;
}

@Injectable({ providedIn: 'root' })
export class EventsService {
  private subject = new Subject<EventPayload>();

  emit(type: string, payload?: any) {
    this.subject.next({ type, payload });
  }

  on(type: string): Observable<any> {
    return this.subject.asObservable().pipe(
      filter((e: EventPayload) => e.type === type),
      map(e => e.payload)
    );
  }
}
