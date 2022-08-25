import { Controller, Get, Query } from '@nestjs/common';
import { DashboardService } from './dashboard.service';
import { GetDashboardDataDto } from './dto/get-dashboard.dto';

@Controller('dashboard')
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}

  @Get()
  findAll(@Query() getDashboardFilters: GetDashboardDataDto) {
    return this.dashboardService.getData(getDashboardFilters);
  }
}
