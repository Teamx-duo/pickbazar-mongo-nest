import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Query,
  UseGuards,
} from '@nestjs/common';
import { WithdrawsService } from './withdraws.service';
import { CreateWithdrawDto } from './dto/create-withdraw.dto';
import { ApproveWithdrawDto } from './dto/approve-withdraw.dto';
import { GetWithdrawsDto, WithdrawPaginator } from './dto/get-withdraw.dto';
import { Withdraw, WithdrawSchema } from './schemas/withdraw.schema';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/common/guards/roles.guards';
import { Roles } from 'src/common/decorators/roles.decorator';
import { Role } from 'src/common/constants/roles.enum';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('withdraws')
@ApiBearerAuth('access-token')
export class WithdrawsController {
  constructor(private readonly withdrawsService: WithdrawsService) {}

  @Post()
  @Roles(Role.STORE_OWNER, Role.SUPER_ADMIN)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  createWithdraw(@Body() createWithdrawDto: CreateWithdrawDto) {
    return this.withdrawsService.create(createWithdrawDto);
  }

  @Get()
  @ApiBearerAuth('access-token')
  @Roles(Role.STORE_OWNER, Role.SUPER_ADMIN)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  async withdraws(@Query() query: GetWithdrawsDto): Promise<WithdrawPaginator> {
    return this.withdrawsService.getWithdraws(query);
  }

  @Get(':id')
  @Roles(Role.STORE_OWNER, Role.SUPER_ADMIN)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  withdraw(@Param('id') id: string) {
    return this.withdrawsService.findOne(id);
  }
  @Post('approve')
  @Roles(Role.SUPER_ADMIN)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  approveWithdraw(@Body() updateWithdrawDto: ApproveWithdrawDto) {
    return this.withdrawsService.update(
      updateWithdrawDto.id,
      updateWithdrawDto,
    );
  }

  @Delete(':id')
  @Roles(Role.SUPER_ADMIN)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  deleteWithdraw(@Param('id') id: string) {
    return this.withdrawsService.remove(id);
  }
}
