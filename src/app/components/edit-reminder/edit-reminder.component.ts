import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Reminder } from 'src/app/interfaces/Reminder';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-edit-reminder',
  templateUrl: './edit-reminder.component.html',
  styleUrls: ['./edit-reminder.component.css'],
})
export class EditReminderComponent implements OnInit {
  @Input() id?: string;
  reminder: Reminder = { reminder: '' };

  constructor(
    private auth: AuthService,
    private activeModal: NgbActiveModal,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    if (this.id) {
      this.auth.getReminderId(this.id).subscribe((reminderData: Reminder) => {
        this.reminder = reminderData;
      });
    }
  }

  onSubmit(): void {
    this.auth
      .editReminder(this.reminder)
      .then(() => {
        this.toastr.success('Note Edited Successfuly!', '', {
          progressBar: true,
          closeButton: true,
          timeOut: 1800,
        });
        this.activeModal.close();
      })
      .catch(() => {
        this.toastr.error('Something went Wrong..', '', {
          progressBar: true,
          closeButton: true,
          timeOut: 1800,
        });
      });
  }
}
