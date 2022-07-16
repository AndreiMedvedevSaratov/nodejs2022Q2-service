import {
  Body,
  Param,
  Delete,
  HttpCode,
  Controller,
  Get,
  Post,
  ParseUUIDPipe,
  Put,
  NotFoundException,
} from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { AlbumService } from './album.service';

@Controller('album')
export class AlbumController {
  constructor(private readonly albumService: AlbumService) {}

  @Post()
  @HttpCode(201)
  async create(@Body() createAlbumDto: CreateAlbumDto) {
    return this.albumService.create(createAlbumDto);
  }

  @Get(':id')
  async findOne(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    const album = await this.albumService.findOne(id);

    if (!album)
      throw new NotFoundException({
        statusCode: 404,
        message: `Album with this ID was not found`,
        error: 'Not Found',
      });

    return album;
  }

  @Get()
  async findAll() {
    return this.albumService.findAll();
  }

  @Delete(':id')
  @HttpCode(204)
  async remove(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    await this.findOne(id);
  }

  @Put(':id')
  async update(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Body() updateAlbumDto: UpdateAlbumDto,
  ) {
    await this.findOne(id);
    return this.albumService.update(id, updateAlbumDto);
  }
}
