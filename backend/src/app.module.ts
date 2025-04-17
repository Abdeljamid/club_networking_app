import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthModule } from "./auth/auth.module";
import { User } from "./users/user.entity";
import { UsersController } from "./users/user.controller";

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "postgres",
      host: "localhost",
      port: 5432,
      username: "postgres",
      password: "147jours",
      database: "club_networking_app",
      entities: [User],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([User]),
    AuthModule,
  ],
  controllers: [UsersController], // ✅ bien placé ici
})
export class AppModule {}
