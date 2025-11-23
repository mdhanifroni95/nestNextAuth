import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Request,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { LocalAuthGuard } from './guards/local-auth/local-auth.guard';
// import { JwtAuthGuard } from './guards/jwt-auth/jwt-auth.guard';
import { RefreshAuthGuard } from './guards/refresh-auth/refresh-auth.guard';
import { GoogleAuthGuard } from './guards/google-auth/google-auth.guard';
import type { Response } from 'express';
import { Public } from './decorators/public.decorator';
import { Roles } from './decorators/role.decorator';
import { RolesGuard } from './guards/roles/roles.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('sign-up')
  registerUser(@Body() createUserDto: CreateUserDto) {
    return this.authService.registerUser(createUserDto);
  }

  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('sign-in')
  login(@Request() req) {
    console.log('sign in user:');
    return this.authService.login(req.user.id, req.user.name);
  }

  @UseGuards(RolesGuard)
  @Roles('ADMIN', 'EDITOR')
  @Get('protected')
  getAll(@Request() req) {
    return {
      message: `Now you can access this protected API. this is your user Id: ${req.user.id}`,
    };
  }

  @Public()
  @UseGuards(RefreshAuthGuard)
  @Post('refresh')
  refreshToken(@Request() req) {
    return this.authService.refreshToken(req.user.id, req.user.name);
  }

  @Public()
  @UseGuards(GoogleAuthGuard)
  @Get('google/login')
  googleLogin() {}

  @Public()
  @UseGuards(GoogleAuthGuard)
  @Get('google/callback')
  async googleCallback(@Request() req, @Res() res: Response) {
    const response = await this.authService.login(req.user.id, req.user.name);

    res.redirect(
      `http://localhost:3000/api/auth/google/callback?userId=${response.id}&name=${response.name}&accessToken=${response.accessToken}&refreshToken=${response.refreshToken}`,
    );
  }

  // @UseGuards(JwtAuthGuard)
  @Post('signout')
  signOut(@Req() req) {
    return this.authService.signOut(req.user.id);
  }
}
