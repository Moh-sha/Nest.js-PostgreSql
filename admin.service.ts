import { admincrud, AdminDTO, AdminUpdateDTO } from './admin.dto';
import { Injectable } from '@nestjs/common';
import { AdminEntity } from './admin.entity';
import { Repository } from 'typeorm';
import { AdminCrud } from './admin.entity';
import { InjectRepository } from '@nestjs/typeorm';
@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(AdminEntity) private adminRepo: Repository<AdminEntity>,
    @InjectRepository(AdminCrud) private adminrep: Repository<AdminCrud>,
  ) {}

  async getadmincrud(): Promise<AdminCrud[]> {
    return this.adminrep.find();
  }

  async getIndex(): Promise<AdminEntity[]> {
    return this.adminRepo.find();
  }

  async getAdminbyIdAndName(id, name): Promise<AdminEntity> {
    return this.adminRepo.findOneBy({ id: id, name: name });
  }

  async addadmin(data: AdminDTO): Promise<AdminEntity> {
    return this.adminRepo.save(data);
  }

  async admincrud(data: admincrud): Promise<AdminCrud> {
    return this.adminrep.save(data);
  }

  async admincrudSearch(id, name, password): Promise<AdminCrud> {
    return this.adminrep.findOneBy({ id: id, name: name, password: password });
  }

  async updateAdmin(query) {
    const id = query.id;
    const name = query.name;
    const admin = await this.adminRepo.findOneBy({ id: id });
    admin.name = name;

    return this.adminRepo.save(admin);
  }

  async updateCrud(qury) {
    const id = qury.id;
    const name = qury.name;
    const password = qury.password;
    const admincrud = await this.adminrep.findOneBy({ id: id });

    admincrud.name = name;
    admincrud.password = password;

    return this.adminrep.save(admincrud);
  }

  async adminDelete(id: number): Promise<void> {
    await this.adminRepo.delete(id);
    console.log('Sucess');
  }

  updateID(id: number, data: AdminDTO): object {
    console.log(id);
    console.log(data);
    return data;
  }
}
