import {CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import {Cache} from 'cache-manager';

@Injectable()
export class CacheService {

  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

  async add(key: string, item: string) {
    await this.cacheManager.set(key, item);
  }

  async get(key: string) {
    const value = await this.cacheManager.get(key);
    return value;
  }

  async del(key: string) {
    await this.cacheManager.del(key);
  }

  async reset() {
    await this.cacheManager.reset()
  }
}