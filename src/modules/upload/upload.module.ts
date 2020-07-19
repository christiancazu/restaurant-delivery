import { Module } from '@nestjs/common';
import { UploadResolver } from './upload.resolver';
import { PlatesService } from 'src/modules/plates/plates.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlateRepository } from 'src/modules/plates/plate.repository';

@Module({
  imports: [TypeOrmModule.forFeature([PlateRepository])],
  providers: [
    UploadResolver,
    PlatesService
  ]
})
export class UploadModule {}
