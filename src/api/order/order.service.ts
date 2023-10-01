import { Inject, Injectable } from '@nestjs/common';
import { OrderEntity } from './order.entity';
import { EntityManager, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderDTO } from './dto/order.dto';
import { BinaryTree } from '../../binary/binary-tree.service';
import { RedisService } from '../../redis/redis.service';
import { SocketService } from '../../sockets/sockets.service';
/**
 * This is order service which handles all the operations. Creating Binary tree and storeing into redis and loading from redis and viseversa
 */
@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(OrderEntity)
    private readonly orderRepository: Repository<OrderEntity>,
    @Inject(EntityManager) private readonly entityManager: EntityManager,
    @Inject(BinaryTree) private binary: BinaryTree<number>,
    @Inject(RedisService) private readonly redis: RedisService,
    @Inject(SocketService) private readonly socket: SocketService,
  ) {
    Promise.resolve(this.initializeTree()).then((obj) => {
      this.binary = new BinaryTree(obj, this.socket);
    });
  }
  /**
   * This function loads tree from redis
   */
  async initializeTree() {
    return await this.redis.get('key');
  }
  /**
   * creates an order and maintain the binary tree
   */
  async createOrder(order: OrderDTO): Promise<OrderEntity> | undefined {
    try {
      if (order) {
        const { price } = order;
        this.binary.insert(parseInt(price));
      }
      return await this.entityManager.transaction(async () => {
        const result = await this.orderRepository.save(order);
        await this.redis.set('key', this.binary.toJson());
        return result;
      });
    } catch (error) {
      throw error;
    }
  }
  /**
   * This function gets all the orders
   */
  async getOrders() {
    try {
      const result = await this.orderRepository.find();
      return result;
    } catch (error) {
      throw error;
    }
  }
  /**
   * Deletes the order using id
   */
  async deleteOrder(id: number) {
    try {
      return await this.entityManager.transaction(async () => {
        const result = await this.orderRepository.delete(id);
        await this.redis.set('key', this.binary.toJson());
        return result;
      });
    } catch (error) {
      throw error;
    }
  }
}
