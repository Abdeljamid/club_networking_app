import {
  Controller,
  Post,
  Body,
  UploadedFile,
  UseInterceptors,
} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { diskStorage } from "multer";
import { AuthService } from "./auth.service";
import { extname } from "path";

@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post("register")
  @UseInterceptors(
    FileInterceptor("profile_picture", {
      storage: diskStorage({
        destination: "./uploads", // ← dossier de destination
        filename: (req, file, cb) => {
          const uniqueSuffix =
            Date.now() + "-" + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname);
          cb(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
        },
      }),
    })
  )
  async register(@Body() body: any, @UploadedFile() file: Express.Multer.File) {
    return this.authService.register(body, file);
  }
}
