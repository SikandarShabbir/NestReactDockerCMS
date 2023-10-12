import {CanActivate, ExecutionContext, Injectable, Req} from '@nestjs/common';
import {JwtService} from "@nestjs/jwt";

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private jwtService: JwtService) {
    }

    canActivate(
        context: ExecutionContext
    ) {
        // boolean | Promise<boolean> | Observable<boolean>
        try {
            const request = context.switchToHttp().getRequest();
            const jwt = request.cookies.jwt;
            return this.jwtService.verify(jwt);
        } catch (e) {
            console.log('AuthGuard', e);
            return false;
        }
    }
}
