import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { Role } from 'generated/prisma';
import { Observable } from 'rxjs';
import { ROLES_KEY } from 'src/auth/decorators/role.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requiredRoles) return true;
    const req = context
      .switchToHttp()
      .getRequest<Request & { user?: { role: string } }>();
    const user = req.user;

    // If no user is attached, deny access (or throw UnauthorizedException if you prefer)
    if (!user) return false;

    // safe to access user.role now
    const hasRequiredRole = requiredRoles.includes(user.role as Role);
    return hasRequiredRole;
  }
}
