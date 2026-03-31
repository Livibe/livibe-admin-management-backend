import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { LoginDto } from './dto/login.dto';
export declare class AuthService {
    private readonly users;
    private readonly jwt;
    constructor(users: Repository<User>, jwt: JwtService);
    getUsers(): Promise<{
        email: string;
        name: string;
        color: string;
    }[]>;
    login(dto: LoginDto): Promise<{
        token: string;
        user: {
            email: string;
            name: string;
            color: string;
        };
    }>;
}
