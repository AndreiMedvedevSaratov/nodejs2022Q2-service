import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { v4 } from 'uuid';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { Artist } from './entities/artist.entity';
import { Database } from 'src/database/database';
import { AlbumService } from 'src/album/album.service';
import { FavoritesService } from 'src/favorites/favorites.service';
import { TrackService } from 'src/track/track.service';

@Injectable()
export class ArtistService {
  private static database: Database<Artist>;

  constructor(
    @Inject(forwardRef(() => AlbumService))
    private albumService: AlbumService,
    @Inject(forwardRef(() => TrackService))
    private trackService: TrackService,
    @Inject(forwardRef(() => FavoritesService))
    private favoritesService: FavoritesService,
  ) {
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

  async remove(id: string) {
    const albums = await this.albumService.findAll();
    const tracks = await this.trackService.findAll();

    for (const album of albums) {
      if (album.artistId !== id) continue;

      this.albumService.update(album.id, { ...album, artistId: null });
    }

    for (const track of tracks) {
      if (track.artistId !== id) continue;

      this.trackService.update(track.id, { ...track, artistId: null });
    }

    this.favoritesService.removeArtistToFavourites(id);
    return ArtistService.database.remove(id);
  }
}
