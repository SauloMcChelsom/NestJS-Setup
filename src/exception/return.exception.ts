export class Return {
    public statusCode:number = 0

    public ok = {
      results:[],
      size:0
    }
  
    public info = {
      timestamp: null,
      message: null,
      code: null,
      description: null,
      path: null,
      method: null
    }
  
    public error = {
      timestamp: null,
      message: null,
      code: null,
      description: null,
      path: null,
      method: null
    }
}