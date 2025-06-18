import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { Model } from 'mongoose';
import { UserDetail } from 'src/models/userModel';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
    constructor(
        @InjectModel(UserDetail.name) private userModel: Model<UserDetail>,
        private readonly jwtService: JwtService
    ) { }

    async login(loginDto: LoginDto): Promise<any> {
        const user = await this.userModel.findOne({ email: loginDto.email });
        if (!user) {
            throw new UnauthorizedException(`User not found: ${loginDto.email}`);
        }

        const isValidPassword = await bcrypt.compare(loginDto.password, user.password);
        if (!isValidPassword) {
            throw new UnauthorizedException('Password is invalid.');
        }

        const token = this.jwtService.sign({
            id: user._id,
            email: user.email
        });

        return {
            token,
            user
        };
    }
}
