import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { AirQuality } from '../../database/schemas/air-quality.entity';
import { AirQualityController } from './air-quality.controller';
import { AirQualityService } from './air-quality.service';
import { CsvLoaderService } from 'src/utils/csv-loader.service';

@Module({
  imports: [TypeOrmModule.forFeature([AirQuality])],
  controllers: [AirQualityController],
  providers: [AirQualityService, CsvLoaderService],
  exports: [CsvLoaderService],
})
export class AirQualityModule {}
