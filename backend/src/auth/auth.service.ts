import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcrypt";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "../users/user.entity";

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepo: Repository<User>,
    private jwtService: JwtService
  ) {}

  async register(data: any, file?: Express.Multer.File) {
    const existing = await this.userRepo.findOne({
      where: { email: data.email },
    });
    if (existing) throw new UnauthorizedException("Email déjà utilisé");

    const hashed = await bcrypt.hash(data.password, 10);

    const user = this.userRepo.create({
      ...data,
      password: hashed,
      profile_picture: file ? file.filename : null, // ← stocke le nom du fichier
    });

    await this.userRepo.save(user);
    delete (user as any).password;
    return user;
  }

  async login(data: any) {
    const user = await this.userRepo.findOne({ where: { email: data.email } });
    if (!user || !(await bcrypt.compare(data.password, user.password))) {
      throw new UnauthorizedException("Invalid credentials");
    }

    const payload = { sub: user.id, email: user.email };
    return {
      access_token: this.jwtService.sign(payload),
      user,
    };
  }
}
