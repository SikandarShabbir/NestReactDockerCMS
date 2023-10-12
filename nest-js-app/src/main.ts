import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import {ValidationPipe} from "@nestjs/common";
import * as cookieParser from "cookie-parser";

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.setGlobalPrefix('api');
    app.useGlobalPipes(new ValidationPipe({
        stopAtFirstError: true
    }));
    app.use(cookieParser());
    app.enableCors({
        origin: [
            'http://localhost:3000',
            // 'http://localhost:8000',
            // 'http://localhost:4200'
        ],
        credentials: true
    });
    // app.enableCors();
    await app.listen(3000);
}

bootstrap();
