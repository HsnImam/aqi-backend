import {
  BadRequestException,
  Controller,
  Get,
  Post,
  Query,
} from '@nestjs/common';
import { CsvLoaderService } from 'src/utils/csv-loader.service';
import { AirQualityService } from './air-quality.service';

@Controller()
export class AirQualityController {
  constructor(
    private readonly csvLoaderService: CsvLoaderService,
    private readonly airQualityService: AirQualityService,
  ) {}

  @Post('air-quality/ingest')
  async ingestCsv() {
    const filePath: string = './src/assets/data.csv';
    await this.airQualityService.deleteAll();
    await this.csvLoaderService.loadCsvData(filePath);
    return { message: 'CSV data ingested successfully' };
  }

  @Get('air-quality/date-range')
  async getDataInDateRange(
    @Query('startDate') startDate: string,
    @Query('endDate') endDate: string,
  ): Promise<any> {
    if (!startDate || !endDate) {
      throw new BadRequestException('Both startDate and endDate are required.');
    }
    return this.airQualityService.getDataInDateRange(startDate, endDate);
  }

  @Get('air-quality/time-series')
  async getTimeSeries(
    @Query('parameter') parameter: string,
    @Query('startDate') startDate?: string,
    @Query('endDate') endDate?: string,
  ): Promise<any> {
    if (!startDate || !endDate) {
      throw new BadRequestException('Both startDate and endDate are required.');
    }

    if (!parameter) {
      throw new BadRequestException('Parameter is required.');
    }

    const validColumns = [
      'coGt',
      'pt08S1Co',
      'nmhcGt',
      'c6h6Gt',
      'pt08S2Nmhc',
      'noxGt',
      'pt08S3Nox',
      'no2Gt',
      'pt08S4No2',
      'pt08S5O3'
    ];
    if (!validColumns.includes(parameter)) {
      throw new BadRequestException(`Invalid parameter: ${parameter}`);
    }

    return this.airQualityService.getTimeSeries(parameter, startDate, endDate);
  }
}
