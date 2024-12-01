import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from './database/typeorm.module';
import { AirQualityModule } from './modules/air-quality/air-quality.module';

@Module({
  imports: [ConfigModule.forRoot(), TypeOrmModule, AirQualityModule],
  controllers: [AppController],
  providers: [AppService],
  exports: [],
})
export class AppModule {}
