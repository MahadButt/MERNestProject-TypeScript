import { Controller, Res, HttpCode, Get, Post, Put, Delete, Body, Param, HttpStatus, UsePipes, ValidationPipe, HttpException } from '@nestjs/common';
import { Response } from 'express';
import { User } from '../users.entity';
import { validate } from "class-validator";
import { UsersService } from './users.service';
import * as bcrypt from 'bcryptjs';

@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService) { }
    @Post('create')
    // @HttpCode(201)
    @UsePipes(new ValidationPipe({ skipMissingProperties: true, errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }))
    async index(@Res() res: Response, @Body() userData: User): Promise<any> {
        let AdminId = userData.decoded.id;
        var username = userData.firstName + '_' + userData.lastName
        let user = await this.usersService.find(userData.email);
        if (user) {
            throw new HttpException(
                'User already exists',
                HttpStatus.FORBIDDEN,
            );
        } else {
            userData.password = await this.hashPassword('123123');
            userData.userName = username;
            userData.AdminId = AdminId;
            await this.usersService.create(userData);
            res.status(HttpStatus.CREATED).send({ 'success': true, "successResponse": "User Registered Successfully" });
        }
    }
    @Get('userlist')
    // @HttpCode(201)
    async userlist(@Res() res: Response, @Body() userData: User): Promise<any> {
        let AdminId = userData.decoded.id;
        let users = await this.usersService.findUsersByAdminId(AdminId);
        if (users.length <= 0) {
            throw new HttpException(
                'Records Not Found',
                HttpStatus.FORBIDDEN,
            );
        } else {
            res.status(HttpStatus.OK).send({ 'success': true, "successResponse": users });
        }
    }
    @UsePipes(new ValidationPipe({ skipMissingProperties: true, errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }))
    @Put(':id/update')
    async update(@Res() res: Response, @Param('id') id, @Body() userData: User): Promise<any> {
        let user = await this.usersService.findById(id);
        let username = userData.firstName + '_' + userData.lastName
        if (user) {
            userData.id = Number(id);
            userData.userName = username;
            await this.usersService.update(userData);
            res.status(HttpStatus.OK).send({ 'success': true, "successResponse": "Profile updated Successfully" });
        } else {
            throw new HttpException({
                success: false,
                message: 'user not exist',
            }, HttpStatus.FORBIDDEN);
        }
    }
    @Delete(':id/delete')
    async delete(@Res() res: Response, @Param('id') id): Promise<any> {
        let user = await this.usersService.findById(id);
        if (user) {
            await this.usersService.delete(id);
            res.status(HttpStatus.OK).send({ 'success': true, "successResponse": "User Deleted Successfully" });
        } else {
            throw new HttpException({
                success: false,
                message: 'user not exist',
            }, HttpStatus.FORBIDDEN);
        }
    }
    async hashPassword(password: string) {
        return await bcrypt.hashSync(password, bcrypt.genSaltSync(10));
    }
}
