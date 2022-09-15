import { Component, OnInit } from '@angular/core';
import { Contact } from 'src/app/interfaces/Contact';
import { ContactsService } from 'src/app/services/contacts.service';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css'],
})
export class ContactsComponent implements OnInit {
  //Pipe Filter
  term = '';
  contact: Contact[] = [];
  constructor(private contacts: ContactsService) {}

  ngOnInit(): void {
    this.contact = this.contacts.getAll();
    console.log(this.contact);
  }
}
