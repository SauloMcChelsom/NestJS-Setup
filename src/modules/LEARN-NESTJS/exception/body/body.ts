export class  Body {

    public statusCode: number
 
    public body = {
        results:<any>[],
        size:0,
        timestamp: new Date(),
        message: '',
        code: '',
        description: '',
        search: '',
        path: '',
        method: '',
        limit:0,
        offset:0, 
        count:0,
        order:'', 
        column:'',
        start:'',
        end:''
      }
}