import { Injectable } from '@nestjs/common';
import { Repository, UpdateResult, DeleteResult } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Admins } from '../admins.entity';

@Injectable()
export class AdminService {
    constructor(
        @InjectRepository(Admins)
        private adminRepository: Repository<Admins>,
    ) { }
    async find(email: string): Promise<any> {
        return await this.adminRepository.findOne({ where: { email: email } });
        // return await this.adminRepository.findOne({userName:username});
    }
    async findById(id: number): Promise<any> {
        return await this.adminRepository.findOne({ where: { id: id } });
        // return await this.adminRepository.findOne({userName:username});
    }
    async create(Admins: Admins): Promise<Admins> {
        return await this.adminRepository.save(Admins);
    }

    async update(Admins: Admins): Promise<any> {
        return await this.adminRepository.update(Admins.id, Admins);
    }

    async delete(id): Promise<DeleteResult> {
        return await this.adminRepository.delete(id);
    }
}
