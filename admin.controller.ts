import {
  Controller,
  Get,
  Post,
  Param,
  UseInterceptors,
  UploadedFile,
  Res,
  ValidationPipe,
  UsePipes,
  ParseIntPipe,
} from '@nestjs/common';
import { Body, Delete, Put, Query } from '@nestjs/common/decorators';
import { FileInterceptor } from '@nestjs/platform-express';
import { AdminDTO, AdminUpdateDTO, admincrud } from './admin.dto';
import { AdminService } from './admin.service';
import { MulterError, diskStorage } from 'multer';
@Controller('/admin')
export class AdminController {
  constructor(public readonly adminservice: AdminService) {}
  //done crud
  @Get('/getadmincrud')
  getadmincrud(): any {
    return this.adminservice.getadmincrud();
  }
  //done normal
  @Get('/getIndex')
  getIndex(): any {
    return this.adminservice.getIndex();
  }
  // search done
  @Get('/search')
  getAdminbyIdAndName(@Query() qury: any): object {
    return this.adminservice.getAdminbyIdAndName(qury.id, qury.name);
  }

  //admincrudSearch

  @Get('/admincrudsearch')
  admincrudSearch(@Query() qury: any): object {
    return this.adminservice.admincrudSearch(qury.id, qury.name, qury.password);
  }

  ///Crud database Done
  @Post('/addadmin')
  @UsePipes(new ValidationPipe())
  addadmin(@Body() data: AdminDTO): any {
    return this.adminservice.addadmin(data);
  }

  @Post('/admincrud')
  @UsePipes(new ValidationPipe())
  admincrud(@Body() data: admincrud): any {
    return this.adminservice.admincrud(data);
  }
  //update admin
  @Put('/adminUpdate')
  updateAdmin(@Query() query) {
    return this.adminservice.updateAdmin(query);
  }
  //update crud
  @Put('/adminCrudUpdate')
  updateCrud(@Query() qury) {
    return this.adminservice.updateCrud(qury);
  }

  //delete admin

  @Get('/adminDelete/:id')
  adminDelete(@Param() id: any): any {
    return this.adminservice.adminDelete(id);
  }

  //delete 

  //file Upload

  //@Post('/upload')
  //@UseInterceptors(FileInterceptor('file'))
  //UploadedFile(@UploadedFile() file: Express.Multer.File) {
  //console.log(file);
  //return 'success';
  //}

  @Post('/uploads')
  @UseInterceptors(
    FileInterceptor('myfile', {
      fileFilter: (req, file, cb) => {
        if (file.originalname.match(/^.*\.(jpg|webp|png|jpeg)$/))
          cb(null, true);
        else {
          cb(new MulterError('LIMIT_UNEXPECTED_FILE', 'image'), false);
        }
      },
      limits: { fileSize: 3000000 },
      storage: diskStorage({
        destination: './uploads',
        filename: function (req, file, cb) {
          cb(null, Date.now() + file.originalname);
        },
      }),
    }),
  )
  uploadFile(@UploadedFile() myfileobj: Express.Multer.File): object {
    console.log(myfileobj);
    return { message: 'file uploaded' };
  }

  @Get('/getimage/:name')
  getImages(@Param('name') name, @Res() res) {
    res.sendFile(name, { root: './uploads' });
  }
}
