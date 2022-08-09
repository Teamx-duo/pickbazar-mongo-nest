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
  UploadedFile,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { Role } from 'src/common/constants/roles.enum';
import { Roles } from 'src/common/decorators/roles.decorator';
import { RolesGuard } from 'src/common/guards/roles.guards';
import config from 'src/config';
import { editFileName, imageFileFilter } from 'src/uploads/uploads.utils';
import { CouponsService } from './coupons.service';
import { CreateCouponDto } from './dto/create-coupon.dto';
import { GetCouponsDto } from './dto/get-coupons.dto';
import { UpdateCouponDto } from './dto/update-coupon.dto';
import { VerifyCouponInput } from './dto/verify-coupon.dto';

@Controller('coupons')
export class CouponsController {
  constructor(private readonly couponsService: CouponsService) {}

  @Post()
  @Roles(Role.SUPER_ADMIN)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  createCoupon(@Body() createCouponDto: CreateCouponDto) {
    return this.couponsService.create({
      ...createCouponDto,
    });
  }

  @Get()
  getCoupons(@Query() query: GetCouponsDto) {
    return this.couponsService.getCoupons(query);
  }

  @Get(':id')
  getCoupon(@Param('id') id: string) {
    return this.couponsService.getCoupon(id);
  }
  @Get(':id/verify')
  verify(@Param('id') id: string) {
    return this.couponsService.getCoupon(id);
  }
  @Post('verify')
  getVerifiedCoupon(@Body() body: VerifyCouponInput) {
    return this.couponsService.verify(body);
  }

  @Put(':id')
  @Roles(Role.SUPER_ADMIN)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './uploads/images/coupon',
        filename: editFileName,
      }),
      fileFilter: imageFileFilter,
    }),
  )
  updateCoupon(
    @UploadedFile() image: Express.Multer.File,
    @Param('id') id: string,
    @Body() updateCouponDto: UpdateCouponDto,
  ) {
    return this.couponsService.update(id, {
      ...updateCouponDto,
      ...(image
        ? { image: `${config.app.imageUrl}/coupon/${image.filename}` }
        : {}),
    });
  }

  @Delete(':id')
  @Roles(Role.SUPER_ADMIN)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  deleteCoupon(@Param('id') id: string) {
    return this.couponsService.remove(id);
  }
}
