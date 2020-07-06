import { Module } from '@nestjs/common';
import { TypesResolver } from './types.resolver';
import { TypesService } from './types.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeRepository } from 'src/modules/types/type.repository';

@Module({
  imports: [TypeOrmModule.forFeature([TypeRepository])],
  providers: [TypesResolver, TypesService],
  exports: [TypesModule]
})
export class TypesModule {}
