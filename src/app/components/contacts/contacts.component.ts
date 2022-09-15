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
  contactArr: Contact[] = [];
  constructor(private contacts: ContactsService) {}

  getBirthday(timestamp:any):string{
    let months= ["January","February","March","April","May","June","July", "August","September","October","November","December"]

    let day = new Date(timestamp.seconds*1000).getDate()
    let month = new Date(timestamp.seconds*1000).getMonth()
    return `${day}/${months[month]}`
  }

  ngOnInit(): void {
    this.contacts.getAll().subscribe((data)=>{
      this.contactArr = data
    })
  }
}
