
export interface CheckInSenior  {
  id?: number;
  add_car?: boolean;
  date_in?: Date;
  date_out?: Date;
  price?: string;
  timestamp?: Date;
  senior_id?: number;
} 

export interface CreateSenior  {
  documents: string
  name: string
  phone: string
}