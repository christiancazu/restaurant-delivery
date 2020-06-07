import { Injectable } from '@nestjs/common';
import { RoleRepository } from './role.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from './role.entity';

@Injectable()
export class RolesService {

  constructor(
    @InjectRepository(RoleRepository)
    private readonly _roleRepository : RoleRepository
  ) {}

  async findAll(): Promise<Role[]> {
    return await this._roleRepository.find();
  }
}
