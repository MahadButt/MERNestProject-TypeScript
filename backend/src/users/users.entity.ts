import { Entity, Column, PrimaryGeneratedColumn, BeforeInsert, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Contains, IsInt, Length, IsEmail, IsFQDN, IsDate, Min, Max, IsNotEmpty } from "class-validator";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    userName: string;

    @Column()
    @IsNotEmpty()
    firstName: string;

    @Column()
    lastName: string;

    @Column()
    @IsEmail()
    email: string;

    @Column()
    @IsNotEmpty()
    // @Length(1)
    password: string;

    @Column()
    @CreateDateColumn()
    date_created: Date;

    @Column()
    @UpdateDateColumn()
    date_modified: Date;
    
    @Column()
    AdminId: number;
    ///
    
    decoded: any;
}