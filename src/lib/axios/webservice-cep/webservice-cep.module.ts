import { Module, Global } from '@nestjs/common';
import { HttpModule  } from '@nestjs/axios'
import { WebserviceCepService } from './webservice-cep.service'

@Global()
@Module({
  imports: [
    HttpModule
  ],
  providers: [
    WebserviceCepService
  ],
  exports:[
    WebserviceCepService
  ]
})
export class WebserviceCepModule {}