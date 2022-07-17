import {
  Controller,
  Param,
  Delete,
  ParseUUIDPipe,
  HttpCode,
  Get,
  Post,
  Body,
  Put,
  NotFoundException,
} from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { TrackService } from './track.service';

@Controller('track')
export class TrackController {
  constructor(private readonly trackService: TrackService) {}

  @Post()
  @HttpCode(201)
  create(@Body() createTrackDto: CreateTrackDto) {
    return this.trackService.create(createTrackDto);
  }

  @Get(':id')
  async findOne(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    const track = await this.trackService.findOne(id);

    if (!track)
      throw new NotFoundException({
        statusCode: 404,
        message: `Track with this ID was not found`,
        error: 'Not Found',
      });

    return track;
  }

  @Get()
  findAll() {
    return this.trackService.findAll();
  }

  @Put(':id')
  async update(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Body() updateTrackDto: UpdateTrackDto,
  ) {
    await this.findOne(id);

    return this.trackService.update(id, updateTrackDto);
  }

  @Delete(':id')
  @HttpCode(204)
  async remove(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    await this.findOne(id);
    return this.trackService.remove(id);
  }
}
