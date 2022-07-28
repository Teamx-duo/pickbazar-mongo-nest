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
  UseInterceptors,
  UploadedFiles,
  UseGuards,
  Req,
} from '@nestjs/common';
import { ShopsService } from './shops.service';
import { ApproveShopDto, CreateShopDto } from './dto/create-shop.dto';
import { UpdateShopDto } from './dto/update-shop.dto';
import { GetShopsDto } from './dto/get-shops.dto';
import { GetStaffsDto } from './dto/get-staffs.dto';
import { UserPaginator } from 'src/users/dto/get-users.dto';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { editFileName, imageFileFilter } from 'src/uploads/uploads.utils';
import config from 'src/config';
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
  @UseInterceptors(
    FileFieldsInterceptor(
      [
        { name: 'cover_image', maxCount: 1 },
        { name: 'logo', maxCount: 1 },
      ],
      {
        storage: diskStorage({
          destination: './uploads/images/shop',
          filename: editFileName,
        }),
        fileFilter: imageFileFilter,
      },
    ),
  )
  create(
    @UploadedFiles()
    images: { cover_image: Express.Multer.File[]; logo: Express.Multer.File[] },
    @Body() createShopDto: CreateShopDto,
    @Req() req: Request,
  ) {
    return this.shopsService.create(
      {
        ...createShopDto,
        // @ts-ignore
        owner: req.user?._id,
        cover_image: `${config.app.imageUrl}/shop/${images.logo[0].filename}`,
        logo: `${config.app.imageUrl}/shop/${images.cover_image[0].filename}`,
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

  @Post('approve')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(Role.SUPER_ADMIN)
  approveShop(@Body() approveShopDto: ApproveShopDto) {
    return this.shopsService.approve(approveShopDto);
  }
  @Post('disapprove')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(Role.SUPER_ADMIN)
  disapproveShop(@Body() approveShopDto: ApproveShopDto) {
    return this.shopsService.approve(approveShopDto);
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

  // @Get()
  // async getStaffs(@Query() query: GetStaffsDto): Promise<UserPaginator> {
  //   return this.shopsService.getStaffs(query);
  // }

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
