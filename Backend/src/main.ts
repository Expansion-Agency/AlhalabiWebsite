import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";
import helmet from "helmet";
import * as express from "express";
import { join, resolve } from "path";

async function bootstrap() {
  console.log("DATABASE_URL:", process.env.DATABASE_URL);

  const app = await NestFactory.create(AppModule, {
    logger: ["error", "warn", "log", "debug", "verbose"],
  });

  const port = process.env.PORT || 3005;

  //  Enable CORS for frontend access
  app.enableCors({
    origin: [
      "https://alhalabi-website.vercel.app", // Production frontend
      "http://localhost:5173", // Local dev frontend
      "https://alhalapi.com",
      "https://www.alhalapi.com",
      "https://elhalapi.com",
      "https://www.elhalapi.com",
    ],
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
    allowedHeaders: ["Content-Type", "Authorization", "userType"],
    credentials: true,
  });

  //  Security headers
  app.use(helmet());

  // Body parsers
  app.use(express.json({ limit: "10mb" }));
  app.use(express.urlencoded({ extended: true, limit: "10mb" }));

  // Products folder
  const productsDir = resolve(__dirname, "..", "..", "public_html", "products");
  app.use("/products", express.static(productsDir));

  // Category folder
  const categoryDir = resolve(__dirname, "..", "..", "public_html", "category");
  app.use("/category", express.static(categoryDir));

  // Swagger setup for API documentation
  const config = new DocumentBuilder()
    .setTitle("Alhalabi API")
    .setDescription("The Alhalabi API description")
    .addServer("https://api.alhalapi.com")
    .addServer(`http://localhost:5173`)
    .addServer(`http://localhost:${port}`)
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("swagger", app, document);

  app.enableShutdownHooks();

  //  Use 0.0.0.0 to work on Hostinger/public server
  await app.listen(port, "0.0.0.0");
  console.log(`Application is running on: http://localhost:${port}`);
}

bootstrap().catch((error) =>
  console.error("Error during application startup:", error)
);
