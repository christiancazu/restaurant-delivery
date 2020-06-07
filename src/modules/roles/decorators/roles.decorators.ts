import { SetMetadata } from '@nestjs/common';

export const RolesRequired = (...roles: string[]) => SetMetadata('roles', roles);
