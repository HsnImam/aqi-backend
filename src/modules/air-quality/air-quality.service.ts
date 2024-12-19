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
    const queryBuilder =
      this.airQualityRepository.createQueryBuilder('air_quality');

    if(parameter) {
      queryBuilder
        .select(['date', 'time', `air_quality.${parameter} as ${parameter}`]);
    }

    if (startDate) {
      queryBuilder.andWhere('date >= :startDate', {
        startDate,
      });
    }

    if (endDate) {
      queryBuilder.andWhere('date <= :endDate', {
        endDate,
      });
    }

    return await queryBuilder
      .orderBy('air_quality.date', 'ASC')
      .getRawMany();
  }
}
