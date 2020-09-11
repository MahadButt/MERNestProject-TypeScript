import { Entity, Column, PrimaryGeneratedColumn, ManyToOne,JoinColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Contains, IsInt, Length, IsEmail, IsFQDN, IsDate, Min, Max, IsNotEmpty } from "class-validator";
import { Admins } from 'src/admins/admins.entity';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id!: number;
 
    @Column()
    userName!: string;

    @Column()
    @IsNotEmpty()
    firstName!: string;

    @Column()
    lastName!: string;

    @Column()
    @IsEmail()
    email!: string;

    @Column()
    @IsNotEmpty()
    // @Length(1)
    password!: string;

    @Column()
    @CreateDateColumn()
    date_created!: Date;

    @Column()
    @UpdateDateColumn()
    date_modified!: Date;

    @ManyToOne(() => Admins, admin => admin.user)
    @JoinColumn({ name: "AdminId" })
    AdminId!: Admins;
    ///

    decoded: any;
}