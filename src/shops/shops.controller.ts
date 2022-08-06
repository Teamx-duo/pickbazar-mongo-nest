import { RolesGuard } from 'src/common/guards/roles.guards';
import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  Query,
  UseGuards,
  Req,
} from '@nestjs/common';
import { ShopsService } from './shops.service';
import {
  ApproveShopDto,
  CreateShopDto,
  DisApproveDto,
} from './dto/create-shop.dto';
import { UpdateShopDto } from './dto/update-shop.dto';
import { GetShopsDto } from './dto/get-shops.dto';
import { GetStaffsDto } from './dto/get-staffs.dto';
import { Roles } from 'src/common/decorators/roles.decorator';
import { Role } from 'src/common/constants/roles.enum';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';

@Controller('shops')
export class ShopsController {
  constructor(private readonly shopsService: ShopsService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(Role.CUSTOMER, Role.SUPER_ADMIN)
  create(@Body() createShopDto: CreateShopDto, @Req() req) {
    return this.shopsService.create(
      {
        ...createShopDto,
        owner: req.user?._id,
      },
      req.user,
    );
  }

  @Get()
  async getShops(@Query() query: GetShopsDto) {
    return this.shopsService.getShops(query);
  }

  @Get(':slug')
  async getShop(@Param('slug') slug: string) {
    return this.shopsService.getShop(slug);
  }

  @Put(':id')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(Role.STORE_OWNER, Role.SUPER_ADMIN)
  update(@Param('id') id: string, @Body() updateShopDto: UpdateShopDto) {
    return this.shopsService.update(id, updateShopDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(Role.STORE_OWNER, Role.SUPER_ADMIN)
  remove(@Param('id') id: string) {
    return this.shopsService.remove(id);
  }

  @Post('approve-shop')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(Role.SUPER_ADMIN)
  approveShop(@Body() approveShopDto: ApproveShopDto) {
    return this.shopsService.approve(approveShopDto);
  }
  @Post('disapprove-shop')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(Role.SUPER_ADMIN)
  disapproveShop(@Body() disapproveShopDto: DisApproveDto) {
    return this.shopsService.disApprove(disapproveShopDto);
  }
}
@Controller('staffs')
export class StaffsController {
  constructor(private readonly shopsService: ShopsService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(Role.STAFF, Role.SUPER_ADMIN)
  create(@Body() createShopDto: CreateShopDto, @Req() req: Request) {
    return this.shopsService.create(createShopDto, req.user);
  }

  @Get()
  async getStaffs(@Query() query: GetStaffsDto) {
    return this.shopsService.getStaffs(query);
  }

  @Get(':slug')
  async getShop(@Param('slug') slug: string) {
    return this.shopsService.getShop(slug);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateShopDto: UpdateShopDto) {
    return this.shopsService.update(id, updateShopDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.shopsService.remove(id);
  }
}
