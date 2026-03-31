import { Injectable, UnauthorizedException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { JwtService } from '@nestjs/jwt'
import { Repository } from 'typeorm'
import * as bcrypt from 'bcryptjs'
import { User } from './user.entity'
import { LoginDto } from './dto/login.dto'

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly users: Repository<User>,
    private readonly jwt: JwtService,
  ) {}

  async getUsers() {
    const users = await this.users.find({ order: { name: 'ASC' } })
    return users.map(u => ({ email: u.email, name: u.name, color: u.color }))
  }

  async login(dto: LoginDto) {
    const user = await this.users.findOneBy({ email: dto.email.toLowerCase().trim() })
    if (!user) throw new UnauthorizedException('Incorrect email or password.')

    const valid = await bcrypt.compare(dto.password, user.passwordHash)
    if (!valid) throw new UnauthorizedException('Incorrect email or password.')

    const token = this.jwt.sign({ sub: user.id, email: user.email, name: user.name, color: user.color })
    return { token, user: { email: user.email, name: user.name, color: user.color } }
  }
}
