export interface Customer {
  id?: string;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  note?: string;
  dateAdded?: Date;
  addedBy?: string;
}
