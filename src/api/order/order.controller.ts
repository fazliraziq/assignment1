import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderDTO } from './dto/order.dto';
/**
 * Order Controller for APIS
 */
@Controller('api/order')
export class OrderController {
  constructor(private service: OrderService) {}

  @Post()
  async setOrder(@Body() _order: OrderDTO) {
    return await this.service.createOrder({
      side: _order.side,
      price: _order.price,
    });
  }

  @Get()
  async getOrders(): Promise<OrderDTO[]> {
    return await this.service.getOrders();
  }

  @Delete(':id')
  async deleteOrder(@Param('id') id: number) {
    return await this.service.deleteOrder(id);
  }
}
