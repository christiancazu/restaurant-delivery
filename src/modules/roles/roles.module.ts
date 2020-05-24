import { Module } from '@nestjs/common';
import { RolesService } from './roles.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoleRepository } from './role.repository';
import { RolesResolver } from './roles.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([RoleRepository])],
  providers: [RolesService, RolesResolver],
  exports: [RolesModule]
})
export class RolesModule {}
