import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { PaginateModel } from 'mongoose';
import { PaginationResponse } from 'src/common/middlewares/response.middleware';
import { UsersService } from 'src/users/users.service';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';
import { Address, AddressSchema } from './schemas/address.schema';

@Injectable()
export class AddressesService {
  constructor(
    @InjectModel(Address.name)
    private addressModel: PaginateModel<AddressSchema>,
    private readonly userService: UsersService,
  ) {}
  async create(createAddressDto: CreateAddressDto) {
    const address = await this.addressModel.create(createAddressDto);
    await this.userService.addUserAddress(
      createAddressDto.customer,
      address._id,
    );
    return address;
  }

  async findAll() {
    const response = await this.addressModel.paginate(
      {},
      { populate: [{ path: 'customer' }, { path: 'address' }] },
    );
    return PaginationResponse(response);
  }

  async findAllByCustomer(customer: string) {
    const response = await this.addressModel.paginate(
      { customer },
      { populate: [{ path: 'customer' }, { path: 'address' }] },
    );
    return PaginationResponse(response);
  }

  async findOne(id: string) {
    return await this.addressModel
      .findById(id)
      .populate(['address', 'customer']);
  }

  async update(id: string, updateAddressDto: UpdateAddressDto) {
    return await this.addressModel.findByIdAndUpdate(
      id,
      {
        $set: updateAddressDto,
      },
      { new: true },
    );
  }

  async remove(id: string) {
    return await this.addressModel.findByIdAndRemove(id, { new: true });
  }
}
