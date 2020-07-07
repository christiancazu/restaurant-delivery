import { Module } from '@nestjs/common';
import { CategoriesResolver } from './categories.resolver';
import { CategoriesService } from './categories.service';
import { CategoryRepository } from './category.repository';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([CategoryRepository])],
  providers: [CategoriesResolver, CategoriesService],
  exports: [CategoriesModule]
})
export class CategoriesModule {}
