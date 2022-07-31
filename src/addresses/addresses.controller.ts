import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Role } from 'src/common/constants/roles.enum';
import { Roles } from 'src/common/decorators/roles.decorator';
import { RolesGuard } from 'src/common/guards/roles.guards';
import { AddressesService } from './addresses.service';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';

@Controller('addresses')
@UseGuards(AuthGuard('jwt'), RolesGuard)
export class AddressesController {
  constructor(private readonly addressesService: AddressesService) {}

  @Post()
  @Roles(Role.CUSTOMER, Role.SUPER_ADMIN)
  createAddress(@Body() createAddressDto: CreateAddressDto) {
    return this.addressesService.create(createAddressDto);
  }

  @Get()
  @Roles(Role.SUPER_ADMIN)
  addresses() {
    return this.addressesService.findAll();
  }

  @Get('customer')
  @Roles(Role.CUSTOMER, Role.SUPER_ADMIN)
  getCustomerAddresses(@Req() req) {
    return this.addressesService.findAllByCustomer(req.user._id);
  }

  @Get(':id')
  @Roles(Role.CUSTOMER, Role.SUPER_ADMIN)
  address(@Param('id') id: string) {
    return this.addressesService.findOne(id);
  }

  @Put(':id')
  @Roles(Role.CUSTOMER, Role.SUPER_ADMIN)
  updateAddress(
    @Param('id') id: string,
    @Body() updateAddressDto: UpdateAddressDto,
  ) {
    return this.addressesService.update(id, updateAddressDto);
  }

  @Delete(':id')
  @Roles(Role.CUSTOMER, Role.SUPER_ADMIN)
  deleteAddress(@Param('id') id: string) {
    return this.addressesService.remove(id);
  }
}
