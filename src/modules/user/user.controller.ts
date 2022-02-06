import {
  Version,
  Controller,
  Param,
  Get,
  Post,
  Body,
  Put,
  Delete,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { UseGuards } from '@nestjs/common';

import { UseInterceptors, UseFilters } from '@nestjs/common';
import { HttpExceptionFilter } from '@lib/exception/http-exception.filter';
import { OK } from '@lib/exception/http-status-ok';
import { HttpStatusOkInterceptor } from '@lib/exception/http-status-ok.interceptor';
import { JwtAuthGuard } from '@lib/guard/jwt-auth.guard';
import { UID } from '@lib/pipe/uid.pipe';
import { Header } from '@lib/decorator/header.decorator';
import { code } from '@root/src/lib/enum';

import { UserService } from './user.service';
import { UpdateDto } from './dto/update.dto';
import { CreateDto } from './dto/create.dto';
import { UpdateUserUidWithFirebaseUidDto as UpdateUidDto } from './dto/update-user-uid-with-firebase-uid.dto';
import { UpdateUserUidWithFirebaseUidInterface as UpdateUidInterface } from './interface';
import { CreateMapper, AuthFindOneMapper, PublicFindOneMapper } from './mapper';

@Controller('user')
@ApiTags('user')
export class UsuariosController {
  constructor(
    private readonly service: UserService,
    private createMapper: CreateMapper,
    private authFindOneMapper: AuthFindOneMapper,
    private publicFindOneMapper: PublicFindOneMapper,
  ) {}

  @Get('/auth/uid/')
  @Version('1')
  @UseGuards(JwtAuthGuard)
  @UseFilters(HttpExceptionFilter)
  @UseInterceptors(HttpStatusOkInterceptor)
  @ApiOperation({ summary: 'Buscar informação do usuario por uid' })
  public async authFindOneByUid(@Header(new UID()) uid: string) {
    const res = await this.service.authFindOneByUid(uid);
    const dto = this.authFindOneMapper.toMapper(res);
    return new OK([dto], code.SUCCESSFULLY_FOUND);
  }

  @Get('/public/uid/:uid')
  @Version('1')
  @ApiOperation({ summary: 'Buscar informação do usuario por uid' })
  public async publicFindOneByUid(@Param('uid') uid: string) {
    const res = await this.service.publicFindOneByUid(uid);
    const dto = this.publicFindOneMapper.toMapper(res);
    return new OK([dto], code.SUCCESSFULLY_FOUND);
  }

  @Get('/auth/email/:email')
  @Version('1')
  @UseGuards(JwtAuthGuard)
  @UseFilters(HttpExceptionFilter)
  @UseInterceptors(HttpStatusOkInterceptor)
  @ApiOperation({ summary: 'Buscar informação do usuario por email' })
  public async authFindOneByEmail(@Param('email') email: string) {
    const res = await this.service.authFindOneByEmail(email);
    const dto = this.publicFindOneMapper.toMapper(res);
    return new OK([dto], code.SUCCESSFULLY_FOUND);
  }

  @Get('/public/email/:email')
  @Version('1')
  @ApiOperation({ summary: 'Buscar informação do usuario por email' })
  public async publicFindOneByEmail(@Param('email') email: string) {
    const res = await this.service.publicFindOneByEmail(email);
    const dto = this.publicFindOneMapper.toMapper(res);
    return new OK([dto], code.SUCCESSFULLY_FOUND);
  }

  @Post('/public/')
  @Version('1')
  @UseGuards(JwtAuthGuard)
  @UseFilters(HttpExceptionFilter)
  @UseInterceptors(HttpStatusOkInterceptor)
  @ApiOperation({ summary: 'Criar um usuario' })
  public async create(@Body() create: CreateDto) {
    const res = await this.service.create(create);
    const dto = this.createMapper.toMapper(res);
    return new OK([dto], code.USER_REGISTERED);
  }

  @Put('/auth/')
  @Version('1')
  @UseGuards(JwtAuthGuard)
  @UseFilters(HttpExceptionFilter)
  @UseInterceptors(HttpStatusOkInterceptor)
  @ApiOperation({ summary: 'Atualizar usuario por uid' })
  public async update(@Body() body: UpdateDto, @Header(new UID()) uid: string) {
    const res = await this.service.updateByUid(uid, body);
    const dto = this.authFindOneMapper.toMapper(res);
    return new OK([dto], code.USER_UPDATED);
  }

  @Put('/auth/uid')
  @Version('1')
  @UseGuards(JwtAuthGuard)
  @UseFilters(HttpExceptionFilter)
  @UseInterceptors(HttpStatusOkInterceptor)
  @ApiOperation({ summary: 'Atualizar uid usuario com  uid firebase' })
  public async updateUserUidWithFirebaseUid(@Body() body: UpdateUidDto) {
    const updateUid: UpdateUidInterface = {
      uid: body.firebaseUid,
    };
    const res = await this.service.updateUserUidWithFirebaseUid(
      body.userUid,
      updateUid,
    );
    const dto = this.authFindOneMapper.toMapper(res);
    return new OK([dto], code.USER_UPDATED);
  }

  @Delete('/auth/')
  @Version('1')
  @UseGuards(JwtAuthGuard)
  @UseFilters(HttpExceptionFilter)
  @UseInterceptors(HttpStatusOkInterceptor)
  @ApiOperation({ summary: 'Excluir usuario' })
  public async deleteUserByUid(@Header(new UID()) uid: string) {
    await this.service.deleteByUid(uid);
    return new OK([], code.DELETED_SUCCESSFULLY);
  }
}
