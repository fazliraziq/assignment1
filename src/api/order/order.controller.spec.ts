import { Test, TestingModule } from '@nestjs/testing';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { OrderDTO } from './dto/order.dto';

// Mock the OrderService
const orderServiceMock = {
  createOrder: jest.fn(),
  getOrders: jest.fn(),
  deleteOrder: jest.fn(),
};
/**
 * Order Controller Test Cases
 */

describe('OrderController', () => {
  let controller: OrderController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrderController],
      providers: [
        {
          provide: OrderService,
          useValue: orderServiceMock, // Use the mock service
        },
      ],
    }).compile();

    controller = module.get<OrderController>(OrderController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('setOrder', () => {
    it('should create an order', async () => {
      const orderDTO: OrderDTO = {
        side: 'buy',
        price: '100',
      };

      const expectedResult = {}; // Define your expected result here

      orderServiceMock.createOrder.mockResolvedValue(expectedResult);

      const result = await controller.setOrder(orderDTO);

      expect(result).toBe(expectedResult);
      expect(orderServiceMock.createOrder).toHaveBeenCalledWith(orderDTO);
    });
  });
});
