import { Ok, Infor, Error } from './response.interface'

export class Responses {

  public statusCode:number = 0

  public ok:Ok = {
    results:[],
    size:0
  }

  public info:Infor = {
    timestamp: null,
    message: null,
    code: null,
    description: null,
    path: null,
    method: null
  }

  public error:Error = {
    timestamp: null,
    message: null,
    code: null,
    description: null,
    path: null,
    method: null
  }
}