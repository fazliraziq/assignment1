import { Injectable } from '@nestjs/common';
import Redis from 'ioredis';
/**
 * Class for reading and writing to Redis
 */
@Injectable()
export class RedisService {
  private client = new Redis();

  async set(key: string, value: any): Promise<void> {
    await this.client.set(key, JSON.stringify(value));
  }

  async get(key: string): Promise<any> {
    const value = await this.client.get(key);
    return JSON.parse(value);
  }
}
