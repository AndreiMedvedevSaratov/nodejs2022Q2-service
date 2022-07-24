import {
  IsString,
  IsUUID,
  ValidateIf,
  IsNotEmpty,
  IsNumber,
} from 'class-validator';

import { isNull } from 'lodash';

export class CreateAlbumDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @IsNotEmpty()
  year: number;

  @ValidateIf((_, value) => !isNull(value))
  @IsUUID('4')
  artistId: string | null;
}
