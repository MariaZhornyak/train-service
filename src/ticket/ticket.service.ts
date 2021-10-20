import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ISuccess } from '../interface/success.interface';
import { CreateTicketDto } from './dto/createTicket.dto';
import { UpdateTicketDto } from './dto/updateTicket.dto';
import { Ticket } from './entities/ticket.entity';
import { State } from './enums/state.enum';

@Injectable()
export class TicketService {
  constructor(
    @InjectRepository(Ticket) private ticketRepository: Repository<Ticket>,
  ) {}

  async getTicketsList(): Promise<Ticket[]> {
    const tickets = await this.ticketRepository.find();
    if (!tickets || tickets.length === 0) {
      throw new NotFoundException({
        success: false,
        message: 'Tickets list is empty',
      });
    }
    return tickets;
  }

  async getSingleTicket(id: string): Promise<Ticket> {
    const singleTicket = await this.ticketRepository.findOne(id);
    if (!singleTicket) {
      throw new NotFoundException({
        success: false,
        message: `Ticket #${id} not found`,
      });
    }
    return singleTicket;
  }

  async deleteTicket(id: string): Promise<Ticket> {
    const ticket = await this.ticketRepository.findOne(id);

    if (!ticket) {
      throw new NotFoundException({
        success: false,
        message: `Ticket #${id} not found`,
      });
    }

    return await this.ticketRepository.remove(ticket);
  }

  async createTicket(
    createTicketDto: CreateTicketDto,
    state: State,
  ): Promise<Ticket> {
    const ticket = await this.ticketRepository.findOne({
      departureDateTime: createTicketDto.departureDateTime,
      sitting: createTicketDto.sitting,
    });

    if (ticket) {
      throw new BadRequestException({
        success: false,
        message: 'Ticket already exists.',
      });
    }

    const newTicket = new Ticket();

    newTicket.sitting = createTicketDto.sitting;
    newTicket.state = state;
    newTicket.departureDateTime = createTicketDto.departureDateTime;
    // newTicket.userId = createTicketDto.userId;

    return await this.ticketRepository.save(newTicket);
  }

  async updateTicket(
    id: string,
    updateTicketDto: UpdateTicketDto,
  ): Promise<ISuccess> {
    const ticket = await this.ticketRepository.findOne(id);

    if (!ticket) {
      throw new NotFoundException({
        success: false,
        message: `Ticket #${id} not found`,
      });
    }

    const newObj = {};

    for (const key in updateTicketDto) {
      if (updateTicketDto[key] != undefined) {
        newObj[key] = updateTicketDto[key];
      }
    }

    await this.ticketRepository.update({ id }, newObj);
    return { success: true };
  }
}
