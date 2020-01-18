import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { CalendarService } from './services/calendar.service';
import { CALENDAR_COMPONENTS } from './components/index';

@NgModule({
  imports: [CommonModule, IonicModule, FormsModule],
  declarations: CALENDAR_COMPONENTS,
  exports: CALENDAR_COMPONENTS,
  entryComponents: CALENDAR_COMPONENTS,
  providers: [
    CalendarService
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class IonCalendarModule {}
