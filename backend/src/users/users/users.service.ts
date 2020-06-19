import { Injectable } from '@nestjs/common';
import { Repository, UpdateResult, DeleteResult } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../users.entity';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,
    ) { }
    async find(email: string): Promise<any> {
        return await this.usersRepository.findOne({ where: { email: email } });
        // return await this.usersRepository.findOne({userName:username});
    }
    async findUsersByAdminId(adminId: number): Promise<any> {
        return await this.usersRepository.find({ where: { AdminId: adminId } });
    }
    async findById(id: number): Promise<any> {
        return await this.usersRepository.findOne({ where: { id: id } });
        // return await this.usersRepository.findOne({userName:username});
    }
    async create(users: User): Promise<User> {
        return await this.usersRepository.save(users);
    }

    async update(users: User): Promise<any> {
        return await this.usersRepository.update(users.id, users);
    }

    async delete(id): Promise<DeleteResult> {
        return await this.usersRepository.delete(id);
    }
}
