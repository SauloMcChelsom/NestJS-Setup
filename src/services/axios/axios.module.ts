import { Module } from '@nestjs/common';
import { WebserviceCepModule } from './webservice-cep/webservice-cep.module';

@Module({
  imports: [WebserviceCepModule],
  providers: [],
  exports: [],
})
export class AxiosModule {}
