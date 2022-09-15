import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import basicAuth from 'express-basic-auth';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  app.setGlobalPrefix('api');
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      // forbidNonWhitelisted: true,
      transform: true,
    }),
  );
  app.use(
    ['/api/docs', '/api/docs-json'],
    basicAuth({
      challenge: true,
      users: {
        teamxmv: 'x0QuyFVCUOY4ldSo9vgBL8T3NDrA51',
      },
    }),
  );
  const config = new DocumentBuilder()
    .setTitle('Nest Multivendor')
    .setDescription('Nest Multivendor API')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'Token',
      },
      'access-token',
    )
    .setVersion('1.0')
    .addTag('teamxmv')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document, {
    customSiteTitle: 'Multivendor',
  });
  const PORT = process.env.PORT || 5000;
  await app.listen(PORT);
  console.log(`Application is running on: ${await app.getUrl()} V: 1.0.2`);
}
bootstrap();
