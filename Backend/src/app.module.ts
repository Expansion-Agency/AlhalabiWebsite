import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { AuthModule } from "./auth/auth.module";
import { UsersModule } from "./users/users.module";
import { CategoryModule } from "./categories/category.module";
import { ProductImagesModule } from "./product-images/product-images.module";
import { MailModule } from "./mail/mail.module";
import { ProductsController } from "./products/products.controller";
import { ProductsService } from "./products/products.service";
import { ProductsModule } from "./products/products.module";
import { ConfigModule } from "@nestjs/config";
import { AdminsModule } from "./admins/admins.module";
import { ReviewsModule } from './reviews/reviews.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AuthModule,
    UsersModule,
    CategoryModule,
    ProductImagesModule,
    MailModule,
    ProductsModule,
    AdminsModule,
    ReviewsModule,
  ],
  controllers: [AppController, ProductsController],
  providers: [AppService, ProductsService],
})
export class AppModule {}
