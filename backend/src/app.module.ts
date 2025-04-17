import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthModule } from "./auth/auth.module";
import { User } from "./users/user.entity";
import { Event } from "./events/event.entity"; // ✅ AJOUT ICI
import { UsersController } from "./users/user.controller";
import { EventsModule } from "./events/events.module";

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "postgres",
      host: "localhost",
      port: 5432,
      username: "postgres",
      password: "147jours",
      database: "club_networking_app",
      entities: [User, Event],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([User]),
    AuthModule,
    EventsModule,
  ],
  controllers: [UsersController],
})
export class AppModule {}
