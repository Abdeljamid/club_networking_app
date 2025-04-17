import { Controller, Get } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "./user.entity";

@Controller("users")
export class UsersController {
  constructor(
    @InjectRepository(User)
    private userRepo: Repository<User>
  ) {}

  @Get()
  async findAll() {
    const users = await this.userRepo.find({
      select: [
        "id",
        "first_name",
        "last_name",
        "email",
        "company_name",
        "company_sector",
        "bio",
        "profile_picture",
      ],
    });
    return users;
  }
}
