
import { message, code as codes } from '@root/src/lib/enum'

export class HttpStatusCodes {

  private results
  private size
  private description 
  private message 
  private code
  private timestamp
  private count

  constructor(results:any[]=[], code:codes, description:string = '', count:number = 0){
    this.results = results
    this.size = results.length
    this.description = description 
    this.message = message[code]
    this.code = code
    this.timestamp = new Date()
    this.count = count
  }
}