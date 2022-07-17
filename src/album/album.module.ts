import { Module } from '@nestjs/common';
import { AlbumService } from './album.service';
import { AlbumController } from './album.controller';
import { ArtistService } from 'src/artist/artist.service';
import { TrackService } from 'src/track/track.service';
import { FavoritesService } from 'src/favorites/favorites.service';

@Module({
  controllers: [AlbumController],
  providers: [AlbumService, ArtistService, TrackService, FavoritesService],
})
export class AlbumModule {}
