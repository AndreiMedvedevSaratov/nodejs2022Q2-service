import {
  forwardRef,
  Inject,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';

import { Favorite } from './entities/favorite.entity';
import { AlbumService } from 'src/album/album.service';
import { ArtistService } from 'src/artist/artist.service';
import { TrackService } from 'src/track/track.service';

@Injectable()
export class FavoritesService {
  private static database: Favorite = {
    artists: [],
    albums: [],
    tracks: [],
  };

  constructor(
    @Inject(forwardRef(() => ArtistService))
    private artistService: ArtistService,
    @Inject(forwardRef(() => AlbumService))
    private albumService: AlbumService,
    @Inject(forwardRef(() => TrackService))
    private trackService: TrackService,
  ) {}

  removeArtistToFavourites(id: string) {
    const index = FavoritesService.database.artists.findIndex(
      (artistId) => artistId === id,
    );

    return index !== -1 && FavoritesService.database.artists.splice(index, 1);
  }

  async addArtistToFavourites(id: string) {
    const artist = await this.artistService.findOne(id);

    if (!artist) throw new UnprocessableEntityException();

    return FavoritesService.database.artists.push(id);
  }

  async addAlbumToFavourites(id: string) {
    const album = await this.albumService.findOne(id);

    if (!album) throw new UnprocessableEntityException();

    return FavoritesService.database.albums.push(id);
  }

  removeAlbumToFavourites(id: string) {
    const index = FavoritesService.database.albums.findIndex(
      (albumId) => albumId === id,
    );

    return index !== -1 && FavoritesService.database.albums.splice(index, 1);
  }

  removeTrackToFavourites(id: string) {
    const index = FavoritesService.database.tracks.findIndex(
      (trackId) => trackId === id,
    );

    return index !== -1 && FavoritesService.database.tracks.splice(index, 1);
  }

  async addTrackToFavourites(id: string) {
    const track = await this.trackService.findOne(id);

    if (!track) throw new UnprocessableEntityException();

    return FavoritesService.database.tracks.push(id);
  }

  async findAll() {
    return {
      artists: await Promise.all(
        FavoritesService.database.artists.map(async (artistId) =>
          this.artistService.findOne(artistId),
        ),
      ),
      albums: await Promise.all(
        FavoritesService.database.albums.map(async (albumId) =>
          this.albumService.findOne(albumId),
        ),
      ),
      tracks: await Promise.all(
        FavoritesService.database.tracks.map(async (trackId) =>
          this.trackService.findOne(trackId),
        ),
      ),
    };
  }
}
