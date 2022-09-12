import { PickType } from '@nestjs/swagger';
import { Dashboard } from '../schemas/dashboard.schema';

export class CreateUpdateDashboardDto extends PickType(Dashboard, [
  'promotional_sliders',
  'banners',
]) {}
