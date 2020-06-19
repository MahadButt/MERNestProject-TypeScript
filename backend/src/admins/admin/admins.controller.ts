import { Controller, Res, UsePipes, Get, Post, Put, Delete, Body, Param, HttpStatus, ValidationPipe, HttpException } from '@nestjs/common';
import { Response } from 'express';
import { Admins } from '../admins.entity';
import { config } from '../../config/secret'
import { AdminService } from './admins.service';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';

@Controller('admin')
export class AdminController {
    constructor(private adminService: AdminService) { }
    @Post('signup')
    // @HttpCode(201)
    @UsePipes(new ValidationPipe({ skipMissingProperties: true, errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }))
    async index(@Res() res: Response, @Body() adminData: Admins): Promise<any> {
        var name = adminData.firstName + '_' + adminData.lastName
        let admin = await this.adminService.find(adminData.email);
        if (admin) {
            throw new HttpException(
                'admin already exists',
                HttpStatus.FORBIDDEN,
            );
        } else {
            adminData.password = await this.hashPassword(adminData.password);
            adminData.name = name;
            await this.adminService.create(adminData);
            res.status(HttpStatus.CREATED).send({ 'success': true, "successResponse": "admin Registered Successfully" });
        }
    }
    @Post('login')
    // @HttpCode(200)
    @UsePipes(new ValidationPipe({ skipMissingProperties: true, errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }))
    async login(@Res() res: Response, @Body() adminData: Admins): Promise<any> {
        let admin = await this.adminService.find(adminData.email);
        if (admin) {
            let password = adminData.password;
            let hashPassword = admin.password;
            var result = await this.comparePassword(password, hashPassword);
            if (result == true) {
                let response = await this.createToken(admin);
                res.status(HttpStatus.OK).send({ 'success': true, "successResponse": response });
            } else {
                throw new HttpException({
                    success: false,
                    message: 'Password Not Correct',
                }, HttpStatus.NOT_ACCEPTABLE);
            }
        } else {
            throw new HttpException({
                success: false,
                message: 'admin not exist',
            }, HttpStatus.FORBIDDEN);
        }
    }
    @Put('update')
    @UsePipes(new ValidationPipe({ skipMissingProperties: true, errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }))
    async update(@Res() res: Response,@Body() adminData: Admins): Promise<any> {
        let AdminId = adminData.decoded.id;
        let admin = await this.adminService.findById(AdminId);
        let name = adminData.firstName + '_' + adminData.lastName
        if (admin) {
            adminData.id = AdminId;
            adminData.name = name;
            delete adminData.decoded;  //To delete the decoded property from the adminData
            await this.adminService.update(adminData);
            res.status(HttpStatus.OK).send({ 'success': true, "successResponse": "Profile updated Successfully" });
        } else {
            throw new HttpException({
                success: false,
                message: 'admin not exist',
            }, HttpStatus.FORBIDDEN);
        }
    }
    @Delete(':id/delete')
    async delete(@Res() res: Response, @Param('id') id): Promise<any> {
        let admin = await this.adminService.findById(id);
        if (admin) {
            await this.adminService.delete(id);
            res.status(HttpStatus.OK).send({ 'success': true, "successResponse": "admin Deleted Successfully" });
        } else {
            throw new HttpException({
                success: false,
                message: 'admin not exist',
            }, HttpStatus.FORBIDDEN);
        }
    }
    async hashPassword(password: string) {
        return await bcrypt.hashSync(password, bcrypt.genSaltSync(10));
    }
    async comparePassword(password: string, hashPassword): Promise<boolean> {
        return await bcrypt.compareSync(password, hashPassword);
    }
    async createToken(admin: Admins) {
        const expiresIn = 1 + 'd';
        let adminObjt = {
            id: admin.id,
            email: admin.email,
            firstname: admin.firstName,
            lastname: admin.lastName,
            name: admin.name,
            dateCreated: admin.date_created,
        };
        let tokendata = { admin: adminObjt };
        const accessToken = jwt.sign(
            tokendata,
            config.secret_key,
            { expiresIn },
        );
        return await {
            id: admin.id,
            email: admin.email,
            firstname: admin.firstName,
            lastname: admin.lastName,
            name: admin.name,
            accessToken,
        };
    }
}
