import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { AdminEntity } from './admin.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminCrud } from './admin.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AdminEntity, AdminCrud])],
  providers: [AdminService],
  controllers: [AdminController],
})
export class AdminModule {}
