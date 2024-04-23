import {Controller, Get, Param, Post, Res, UploadedFile, UseInterceptors} from '@nestjs/common';
import {FileInterceptor} from "@nestjs/platform-express";
import {diskStorage} from "multer";
import {Response} from "express";

@Controller()
export class UploadController {
    constructor() {
    }

    @UseInterceptors(FileInterceptor('file', {
        storage: diskStorage({
            destination: './uploads',
            filename: (req, file, cb) => {
                const fileNameSplit = file.originalname.split('.');
                const fileExt = fileNameSplit[fileNameSplit.length - 1];
                cb(null, `${Date.now()}${file.originalname}`);
            }
        })
    }))
    @Post('upload')
    uploadFile(@UploadedFile() file: Express.Multer.File) {
        return `http://localhost:8000/api/${file.path}`;
    }

    @Get('uploads/:path')
    async getFile(@Param('path') path, @Res() response: Response) {
        response.sendFile(path, {root: 'uploads'});
    }
}
