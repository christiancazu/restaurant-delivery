import {
  Resolver, Args, Mutation
} from '@nestjs/graphql';
import { GraphQLUpload, FileUpload } from 'graphql-upload';

import { UseGuards, UnprocessableEntityException } from '@nestjs/common';
import { GqlAuthGuard } from '../auth/guards/gql.guard';
import { RolesGuard } from '../roles/guards/roles.guard';
import { RolesRequired } from '../roles/decorators/roles.decorators';
import { ROLES } from '../roles/enums/roles.enum';

import { createWriteStream, promises } from 'fs';
import { v4 as uuidv4 } from 'uuid';

// TODO: mymetype validations, avatarType validations
@Resolver('Upload')
export class UploadResolver {
  constructor() {}

  @RolesRequired(ROLES.SUPER_ADMIN, ROLES.ADMIN)
  @UseGuards(GqlAuthGuard, RolesGuard)
  @Mutation(() => String)
  async uploadAvatar(
    @Args('avatarType') avatarType: string,
    @Args({
      name: 'file',
      type: () => GraphQLUpload
    })
      {
        createReadStream,
        mimetype
      }: FileUpload): Promise<string> {
    const uuid = uuidv4();

    const mimetypeExt = mimetype.split('/')[1]; // image/png

    const dirname = './media/' + avatarType;

    await promises.mkdir(dirname, { recursive: true });

    const result = await new Promise(async (resolve, reject) =>
      createReadStream()
        .pipe(createWriteStream(`${dirname}/${uuid}.${mimetypeExt}`))
        .on('finish', () => resolve(true))
        .on('error', () => reject(false))
    );

    if(!result) {
      throw new UnprocessableEntityException('upload.failed');
    }

    return uuid;
  }
}
