import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Role } from 'src/common/constants/roles.enum';
import { Roles } from 'src/common/decorators/roles.decorator';
import { RolesGuard } from 'src/common/guards/roles.guards';
import { DashboardService } from './dashboard.service';
import { CreateUpdateDashboardDto } from './dto/create-dashboard.dto';
import { GetDashboardDataDto } from './dto/get-dashboard.dto';

@Controller('dashboard')
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}

  @Get()
  findAll(@Query() getDashboardFilters: GetDashboardDataDto) {
    return this.dashboardService.getData(getDashboardFilters);
  }

  @Post()
  @Roles(Role.SUPER_ADMIN)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  createOrUpdateDashboard(
    @Body() createUpdateDashboard: CreateUpdateDashboardDto,
  ) {
    return this.dashboardService.createUpdateDashboard(createUpdateDashboard);
  }
}
