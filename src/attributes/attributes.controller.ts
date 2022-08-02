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
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { convertToSlug } from 'src/common/constants/common.function';
import { Role } from 'src/common/constants/roles.enum';
import { Roles } from 'src/common/decorators/roles.decorator';
import { RolesGuard } from 'src/common/guards/roles.guards';
import { AttributesService } from './attributes.service';
import { CreateAttributeDto } from './dto/create-attribute.dto';
import { GetAttributesArgs } from './dto/get-attributes.dto';
import { UpdateAttributeDto } from './dto/update-attribute.dto';

@Controller('attributes')
export class AttributesController {
  constructor(private readonly attributesService: AttributesService) {}

  @Post()
  @Roles(Role.STORE_OWNER, Role.SUPER_ADMIN)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  create(@Body() createAttributeDto: CreateAttributeDto) {
    return this.attributesService.create({
      ...createAttributeDto,
      slug: convertToSlug(createAttributeDto.name),
    });
  }

  @Get()
  findAll(@Query() query: GetAttributesArgs) {
    return this.attributesService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.attributesService.findOne(id);
  }

  @Put(':id')
  @Roles(Role.STORE_OWNER, Role.SUPER_ADMIN)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  update(
    @Param('id') id: string,
    @Body() updateAttributeDto: UpdateAttributeDto,
  ) {
    return this.attributesService.update(id, updateAttributeDto);
  }

  @Delete(':id')
  @Roles(Role.STORE_OWNER, Role.SUPER_ADMIN)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  remove(@Param('id') id: string) {
    return this.attributesService.remove(id);
  }
}
