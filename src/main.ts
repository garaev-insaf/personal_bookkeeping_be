import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from './pipes/validation.pipe';

async function start() {
  const PORT = process.env.PORT || 3000;
  const app = await NestFactory.create(AppModule);

  const configSwagger = new DocumentBuilder()
    .setTitle('Personal Bookeeping API')
    .setDescription('Documentation of REST API')
    .setVersion('1.0.0')
    .addTag('Scotch')
    .addBearerAuth() // Добавляем поддержку Bearer-токена
    .build();
  const documentation = SwaggerModule.createDocument(app, configSwagger);
  SwaggerModule.setup('/api/docs', app, documentation);

  app.useGlobalPipes(new ValidationPipe());

  await app.listen(PORT, () =>
    console.log(
      `server works on ${process.env.PORT} in ${process.env.NODE_ENV} mode`,
    ),
  );
}

start();
