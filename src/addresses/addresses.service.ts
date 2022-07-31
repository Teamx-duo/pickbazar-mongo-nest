import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { PaginateModel } from 'mongoose';
import { PaginationResponse } from 'src/common/middlewares/response.middleware';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';
import { Address, AddressSchema } from './schemas/address.schema';
import { UserAddress, UserAddressSchema } from './schemas/userAddress.schema';

@Injectable()
export class AddressesService {
  constructor(
    @InjectModel(Address.name)
    private addressModel: PaginateModel<AddressSchema>,
    @InjectModel(UserAddress.name)
    private userAddressModel: PaginateModel<UserAddressSchema>,
  ) {}
  async create(createAddressDto: CreateAddressDto) {
    const userAddress = await this.userAddressModel.create(
      createAddressDto.address,
    );
    const address = await this.addressModel.create({
      title: createAddressDto.title,
      default: createAddressDto.default,
      address: userAddress._id,
      type: createAddressDto.type,
      customer: createAddressDto.customer,
    });
    userAddress.address = address._id;
    await userAddress.save();
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
