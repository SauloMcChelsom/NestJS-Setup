export class RetornoDto  {
  private id: number;
  private page_description: string;
  private page_name: string;
  private user_id: number;
  private timestamp: Date;
  private number_of_followers: number;

  constructor(values:any) {
    this.id = values.id;
    this.page_description = values.page_description;
    this.page_name = values.page_name;
    this.number_of_followers = values.number_of_followers
    this.user_id = values.user_id;
    this.timestamp = values.timestamp;
  }
}