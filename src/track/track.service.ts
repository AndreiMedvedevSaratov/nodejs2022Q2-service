import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { AlbumService } from 'src/album/album.service';
import { ArtistService } from 'src/artist/artist.service';
import { v4 } from 'uuid';
import { Track } from './entities/track.entity';
import { Database } from './../database/database';
import { FavoritesService } from 'src/favorites/favorites.service';

@Injectable()
export class TrackService {
  private static database: Database<Track>;

  constructor(
    @Inject(forwardRef(() => ArtistService))
    private artistService: ArtistService,
    @Inject(forwardRef(() => AlbumService))
    private albumService: AlbumService,
    @Inject(forwardRef(() => FavoritesService))
    private favoritesService: FavoritesService,
  ) {
    TrackService.database = new Database<Track>(Track);
  }

  async create(createTrackDto: CreateTrackDto) {
    const data = {
      id: v4(),
      ...createTrackDto,
    };

    return TrackService.database.create(data);
  }

  async findOne(id: string) {
    return TrackService.database.findOne(id);
  }

  async findAll() {
    return TrackService.database.findAll();
  }

  async update(id: string, updateTrackDto: UpdateTrackDto) {
    const track = await this.findOne(id);

    const data = {
      ...track,
      ...updateTrackDto,
    };

    return TrackService.database.update(id, data);
  }
  async remove(id: string) {
    this.favoritesService.removeTrackToFavourites(id);
    return TrackService.database.remove(id);
  }
}
