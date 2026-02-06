import {
  Controller,
  Post,
  Get,
  Patch,
  Delete,
  Body,
  Param,
  UseGuards,
  ForbiddenException,
} from '@nestjs/common';
import { ParcelService } from '@/modules/parcel/application/parcel.service';
import { CreateParcelDto, UpdateParcelDto } from '@/modules/parcel/application/dtos/parcel.dto';
import { JwtGuard } from '@/common/guards/jwt.guard';
import { GetUser, AuthUser } from '@/common/decorators/get-user.decorator';

@Controller('parcels')
export class ParcelController {
  constructor(private readonly parcelService: ParcelService) {}

  @UseGuards(JwtGuard)
  @Post()
  async createParcel(@Body() createParcelDto: CreateParcelDto, @GetUser() user: AuthUser) {
    const creatorRole = (user as any).role || 'user';
    return this.parcelService.createParcel(createParcelDto, user.id, creatorRole);
  }

  @UseGuards(JwtGuard)
  @Get('creator/:creatorId')
  async getParcelsByCreatorId(@Param('creatorId') creatorId: string, @GetUser() user: AuthUser) {
    if (user.id !== creatorId && (user as any).role !== 'admin') {
      throw new ForbiddenException('Cannot view other users parcels');
    }
    return this.parcelService.getParcelsByCreatorId(creatorId);
  }

  @UseGuards(JwtGuard)
  @Get('rider/:riderId')
  async getParcelsByRiderId(@Param('riderId') riderId: string, @GetUser() user: AuthUser) {
    if (user.id !== riderId && (user as any).role !== 'admin') {
      throw new ForbiddenException('Cannot view other riders parcels');
    }
    return this.parcelService.getParcelsByRiderId(riderId);
  }

  @Get()
  async getAllParcels() {
    return this.parcelService.getAllParcels();
  }

  @Get(':id')
  async getParcelById(@Param('id') id: string) {
    return this.parcelService.getParcelById(id);
  }

  @UseGuards(JwtGuard)
  @Patch(':id')
  async updateParcel(
    @Param('id') id: string,
    @Body() updateParcelDto: UpdateParcelDto,
    @GetUser() user: AuthUser,
  ) {
    return this.parcelService.updateParcel(id, updateParcelDto, user.id);
  }

  @UseGuards(JwtGuard)
  @Delete(':id')
  async deleteParcel(@Param('id') id: string, @GetUser() user: AuthUser) {
    const parcel = await this.parcelService.getParcelById(id);
    if (parcel.creatorId !== user.id && (user as any).role !== 'admin') {
      throw new ForbiddenException('Cannot delete other users parcels');
    }
    const success = await this.parcelService.deleteParcel(id);
    return { success, message: success ? 'Parcel deleted successfully' : 'Parcel not found' };
  }
}
