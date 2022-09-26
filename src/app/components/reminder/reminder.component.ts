import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Order } from 'src/app/interfaces/Order';
import { Reminder } from 'src/app/interfaces/Reminder';
import { AuthService } from 'src/app/services/auth.service';
import { ordersService } from 'src/app/services/orders.service';
import { EditReminderComponent } from '../edit-reminder/edit-reminder.component';

@Component({
  selector: 'app-reminder',
  templateUrl: './reminder.component.html',
  styleUrls: ['./reminder.component.css'],
})
export class ReminderComponent implements OnInit {
  reminder: Reminder = { reminder: '', addedBy: '' };
  reminderArr: Reminder[] = [];

  constructor(
    private modal: NgbModal,
    private auth: AuthService,
    private oS: ordersService
  ) {}

  ngOnInit(): void {
    this.auth.getReminder().subscribe((reminderData: Reminder[]) => {
      this.reminderArr = reminderData;
    });
  }

  editReminder(reminder: Reminder) {
    const modalRef = this.modal.open(EditReminderComponent, {
      size: 'lg',
      centered: true,
      windowClass: 'dark-modal',
    });
    modalRef.componentInstance.id = reminder.id;
  }
}
