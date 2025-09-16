import * as dotenv from 'dotenv';
dotenv.config();
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";
import helmet from "helmet";
import * as express from "express";
import { resolve } from "path";
import { ExpressAdapter } from "@nestjs/platform-express";

export async function createNestServer(adapter: ExpressAdapter) {
  const app = await NestFactory.create(AppModule, adapter, {
    logger: ["error", "warn", "log", "debug", "verbose"],
  });

  // Enable CORS for frontend access
  app.enableCors({
    origin: [
      "https://alhalabi-website.vercel.app",
      "https://localhost:5173",
      "http://localhost:5173",
      "https://alhalapi.com",
      "https://www.alhalapi.com",
      "https://elhalapi.com",
      "https://www.elhalapi.com",
    ],
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
    allowedHeaders: ["Content-Type", "Authorization", "userType"],
    credentials: true,
  });

  // Security headers
  app.use(helmet());

  // Body parsers
  app.use(express.json({ limit: "10mb" }));
  app.use(express.urlencoded({ extended: true, limit: "10mb" }));

  // Static folders
  const productsDir = resolve(__dirname, "..", "..", "public_html", "products");
  app.use("/products", express.static(productsDir));

  const categoryDir = resolve(__dirname, "..", "..", "public_html", "category");
  app.use("/category", express.static(categoryDir));

  // Swagger setup for API documentation
  const config = new DocumentBuilder()
    .setTitle("Alhalabi API")
    .setDescription("The Alhalabi API description")
    .addServer("https://api.alhalapi.com")
    .addServer(`http://localhost:5173`)
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("swagger", app, document);

  app.enableShutdownHooks();

  return app;
}

// Only listen locally (not on serverless)
if (require.main === module) {
  (async () => {
    const app = await createNestServer(new ExpressAdapter());
    await app.listen(process.env.PORT || 3002, "0.0.0.0");
    console.log(`Application is running on: http://localhost:${process.env.PORT || 3002}`);
  })();
}
