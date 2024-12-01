import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as fs from 'fs';
import * as csv from 'csv-parser';
import { AirQuality } from '../database/schemas/air-quality.entity';
import { mapCsvRowToEntity } from '.';

@Injectable()
export class CsvLoaderService {
  constructor(
    @InjectRepository(AirQuality)
    private readonly airQualityRepository: Repository<AirQuality>,
  ) {}

  async loadCsvData(filePath: string): Promise<void> {
    const airQualities: Omit<AirQuality, 'id'>[] = [];
    return new Promise((resolve, reject) => {
      fs.createReadStream(filePath)
        .pipe(csv())
        .on('data', (row) => {
          if (Object.values(row).every((val) => val)) {
            const entity = mapCsvRowToEntity(row);
            airQualities.push(entity);
          }
        })
        .on('end', async () => {
          try {
            const batchSize = 100;
            for (let i = 0; i < airQualities.length; i += batchSize) {
              const batch = airQualities.slice(i, i + batchSize);

              await this.airQualityRepository.insert(batch);
              console.log(`Inserted batch ${Math.floor(i / batchSize) + 1}`);
            }
            console.log('CSV data loaded successfully');
            resolve();
          } catch (error) {
            console.error('Error saving CSV data:', error);
            reject(error);
          }
        })
        .on('error', (error) => {
          console.error('Error reading CSV file:', error);
          reject(error);
        });
    });
  }
}
