import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Auth } from '../decorator/auth.decorator';
import { CurrentUser } from '../decorator/current-user.decorator';
import { Roles } from '../enum/roles.enum';
import { AuthGuard } from '../guard/auth.guard';
import { ICurrentUser } from '../interface/current-user.interface';
import { ISuccess } from '../interface/success.interface';
import { CreateTicketDto } from './dto/createTicket.dto';
import { UpdateTicketDto } from './dto/updateTicket.dto';
import { Ticket } from './entities/ticket.entity';
import { State } from './enums/state.enum';
import { TicketService } from './ticket.service';

@Controller('tickets')
@ApiBearerAuth()
export class TicketController {
  constructor(private readonly ticketService: TicketService) {}

  @Get('get/list')
  @ApiTags('tickets')
  @UseGuards(AuthGuard)
  @Auth(Roles.Manager, Roles.Passenger)
  getTicketsList(@CurrentUser() user: ICurrentUser): Promise<Ticket[]> {
    let ticketUserId: string;
    if (user.role !== Roles.Manager) {
      ticketUserId = user.id;
    }

    return this.ticketService.getTicketsList(ticketUserId);
  }

  @Get('get/:id')
  @ApiTags('tickets')
  @UseGuards(AuthGuard)
  @Auth(Roles.Manager)
  getSingleTicket(@Param('id') id: string): Promise<Ticket> {
    return this.ticketService.getSingleTicket(id);
  }

  @Post('book')
  @ApiTags('tickets')
  @UseGuards(AuthGuard)
  @Auth(Roles.Manager)
  bookTicket(
    @Body() createTicketDto: CreateTicketDto,
    @CurrentUser() user: ICurrentUser,
  ): Promise<Ticket> {
    return this.ticketService.createTicket(createTicketDto, State.Booked, user);
  }

  @Post('buy')
  @ApiTags('tickets')
  @UseGuards(AuthGuard)
  @Auth(Roles.Passenger)
  buyTicket(
    @Body() createTicketDto: CreateTicketDto,
    @CurrentUser() user: ICurrentUser,
  ): Promise<Ticket> {
    return this.ticketService.createTicket(createTicketDto, State.Bought, user);
  }

  @Post('create')
  @ApiTags('tickets')
  @UseGuards(AuthGuard)
  @Auth(Roles.Manager)
  createTicket(
    @Body() createTicketDto: CreateTicketDto,
    @CurrentUser() user: ICurrentUser,
  ): Promise<Ticket> {
    return this.ticketService.createTicket(createTicketDto, State.Bought, user);
  }

  @Patch('update/:id')
  @ApiTags('tickets')
  @UseGuards(AuthGuard)
  @Auth(Roles.Manager)
  updateTicket(
    @Param('id') id: string,
    @Body() updateTicketDto: UpdateTicketDto,
  ): Promise<ISuccess> {
    return this.ticketService.updateTicket(id, updateTicketDto);
  }

  @Delete('return/:id')
  @ApiTags('tickets')
  @UseGuards(AuthGuard)
  @Auth(Roles.Manager, Roles.Passenger)
  returnTicket(
    @Param('id') id: string,
    @CurrentUser() user: ICurrentUser,
  ): Promise<ISuccess> {
    let ticketUserId: string;
    if (user.role !== Roles.Manager) {
      ticketUserId = user.id;
    }

    return this.ticketService.returnTicket(id, ticketUserId);
  }
}
