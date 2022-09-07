import { Controller, Get } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { AnalyticsService } from './analytics.service';

@Controller('analytics')
@ApiBearerAuth('access-token')
export class AnalyticsController {
  constructor(private readonly analyticsService: AnalyticsService) {}

  @Get()
  analytics() {
    return this.analyticsService.findAll();
  }
}
