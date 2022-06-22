import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { AxiosResponse } from 'axios';
import { Observable } from 'rxjs';

@Injectable()
export class WebserviceCepService {
  constructor(private httpService: HttpService) {}

  public cep(cep: string): Observable<AxiosResponse<any[]>> {
    return this.httpService.get(`https://viacep.com.br/ws/${cep}/json/`);
  }
}
