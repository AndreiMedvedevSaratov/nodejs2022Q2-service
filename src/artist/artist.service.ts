import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { v4 } from 'uuid';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { Artist } from './entities/artist.entity';
import { Database } from 'src/database/database';

@Injectable()
export class ArtistService {
  private static database: Database<Artist>;

  constructor() {
    ArtistService.database = new Database<Artist>(Artist);
  }

  create(createArtistDto: CreateArtistDto) {
    const data = {
      id: v4(),
      ...createArtistDto,
    };

    return ArtistService.database.create(data);
  }

  async findOne(id: string) {
    return ArtistService.database.findOne(id);
  }

  findAll() {
    return ArtistService.database.findAll();
  }

  async update(id: string, updateArtistDto: UpdateArtistDto) {
    const artist = await this.findOne(id);

    const data = {
      ...artist,
      ...updateArtistDto,
    };

    return ArtistService.database.update(id, data);
  }
}
