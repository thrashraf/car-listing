import {
  Inject,
  Injectable,
  Logger,
  RequestTimeoutException,
  UnauthorizedException,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { JwtService } from '@nestjs/jwt';
import { TimeoutError, catchError, throwError, timeout } from 'rxjs';
import { compareSync } from 'bcrypt';
import { AuthDto } from './dto/auth.dto';

@Injectable()
export class AuthService {
  constructor(
    @Inject('USER_CLIENT')
    private readonly client: ClientProxy,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(authDto: AuthDto): Promise<any> {
    try {
      const user = await this.client
        .send({ cmd: 'get_user' }, { email: authDto.email })
        .pipe(
          timeout(5000),
          catchError((err) => {
            if (err instanceof TimeoutError) {
              return throwError(new RequestTimeoutException());
            }
            return throwError(err);
          }),
        )
        .toPromise();
      if (compareSync(authDto.password, user?.password)) {
        return user;
      }

      throw new UnauthorizedException('Invalid credentials');
    } catch (e) {
      Logger.log(e);
      throw new Error(
        `An error occurred while processing your request: ${e.message}`,
      );
    }
  }

  async login(user) {
    const payload = { user, sub: user.id };

    return {
      userId: user.id,
      accessToken: this.jwtService.sign(payload),
    };
  }

  async authorization(token: string) {
    try {
      const user = this.jwtService.verify(token);
      return user;
    } catch (e) {
      throw new UnauthorizedException('Invalid token');
    }
  }
}
