
export interface CheckInSenior  {
  id?: number;
  add_car?: boolean;
  dateIn?: Date;
  dateOut?: Date;
  price?: string;
  timestamp?: Date;
  senior_id?: number;
} 

export interface CreateSenior  {
  documents: string
  name: string
  phone: string
}