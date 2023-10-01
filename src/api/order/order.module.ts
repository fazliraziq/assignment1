import { Module } from '@nestjs/common';
import { OrderController } from './order.controller';
import { OrderEntity } from './order.entity';
import { OrderService } from './order.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BinaryTree, TreeNode } from '../../binary/binary-tree.service';
import { RedisService } from '../../redis/redis.service';
import { SocketService } from '../../sockets/sockets.service';

@Module({
  imports: [TypeOrmModule.forFeature([OrderEntity])],
  providers: [OrderService, BinaryTree, TreeNode, RedisService, SocketService],
  controllers: [OrderController],
  exports: [OrderModule],
})
export class OrderModule {}
