import { Body, Controller, Post, Res } from '@nestjs/common';
import enums from 'src/helper/enums';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';

@Controller(enums.routes.auth)
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Post('/login')
    async login(@Body() loginDto: LoginDto): Promise<Response> {
        return this.authService.login(loginDto);
    }
}