import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { GraphQLUpload, FileUpload } from 'graphql-upload';

import { UseGuards, UnprocessableEntityException } from '@nestjs/common';
import { GqlAuthGuard } from '../auth/guards/gql.guard';
import { RolesGuard } from '../roles/guards/roles.guard';
import { RolesRequired } from '../roles/decorators/roles.decorators';
import { ROLES } from '../roles/enums/roles.enum';

import { createWriteStream, promises } from 'fs';
import { v1 as uuidv1 } from 'uuid';
import { PlatesService } from 'src/modules/plates/plates.service';

const availableExtensions = [
  'jpg',
  'jpeg',
  'png',
  'bmp',
  'webp'
];

@Resolver('Upload')
export class UploadResolver {
  constructor(private readonly _platesService: PlatesService) {}

  @RolesRequired(ROLES.SUPER_ADMIN, ROLES.ADMIN)
  @UseGuards(GqlAuthGuard, RolesGuard)
  @Mutation(() => String)
  async uploadAvatar(
    @Args('avatarType') avatarType: string,
    @Args('plateName') plateName: string,
    @Args({
      name: 'file',
      type: () => GraphQLUpload
    })
      {
        createReadStream,
        mimetype
      }: FileUpload): Promise<string> {

    const plateNameExists = await this._platesService.findByName(plateName);

    if (plateNameExists) {
      throw new UnprocessableEntityException('plate.errors.exists');
    }

    const dirname = './media/' + avatarType;

    await promises.mkdir(dirname, { recursive: true });

    const mimetypeExt = mimetype.split('/')[1];

    if (!availableExtensions.includes(mimetypeExt)) {
      throw new UnprocessableEntityException('file.errors.invalidFormat');
    }

    const imgFullname = uuidv1() + '.' + mimetypeExt; // image/png
    const result = await new Promise(async (resolve, reject) =>
      createReadStream()
        .pipe(createWriteStream(`${dirname}/${imgFullname}`))
        .on('finish', () => resolve(true))
        .on('error', () => reject(false))
    );

    if(!result) {
      throw new UnprocessableEntityException('upload.failed');
    }

    return imgFullname;
  }
}
