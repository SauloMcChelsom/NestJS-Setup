import { Injectable } from '@nestjs/common';


import {  HttpService } from './http.service'

@Injectable()
export class CatsService {
  private readonly cats: any[] = [];

  create(cat: any) {
    this.cats.push(cat);
  }

  findAll(): any[] {
    return this.cats;
  }

  findOne(id){
    return [{cats:"miau"}]
  }
}