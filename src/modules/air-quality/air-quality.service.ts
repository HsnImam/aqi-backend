import { BadRequestException, Injectable } from '@nestjs/common';
import { AirQuality } from '../../database/schemas/air-quality.entity';
import { Between, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class AirQualityService {
  constructor(
    @InjectRepository(AirQuality)
    private readonly airQualityRepository: Repository<AirQuality>,
  ) {}

  async getAll(): Promise<AirQuality> {
    return this.airQualityRepository.findOne({});
  }

  async deleteAll() {
    return this.airQualityRepository.delete({});
  }

  async getDataInDateRange(startDate: string, endDate: string): Promise<any> {
    return await this.airQualityRepository.find({
      where: {
        date: Between(startDate, endDate),
      },
      order: { date: 'ASC', time: 'ASC' },
    });
  }

  async getTimeSeries(
    parameter: string,
    startDate?: string,
    endDate?: string,
  ): Promise<any> {
    const validColumns = [
      'co',
      'benzene',
      'no2',
      'nox',
      'temperature',
      'humidity',
      'ah',
    ];
    if (!validColumns.includes(parameter)) {
      throw new BadRequestException(`Invalid parameter: ${parameter}`);
    }
    const queryBuilder =
      this.airQualityRepository.createQueryBuilder('air_quality');

    queryBuilder.select(['air_quality.timestamp', `air_quality.${parameter}`]);

    if (startDate) {
      queryBuilder.andWhere('air_quality.date >= :startDate', {
        startDate,
      });
    }

    if (endDate) {
      queryBuilder.andWhere('air_quality.timedatestamp <= :endDate', {
        endDate,
      });
    }

    return await queryBuilder
      .orderBy('air_quality.timestamp', 'ASC')
      .getRawMany();
  }
}
