/// <reference types="multer" />
import { Response } from "express";
export declare class UploadController {
    constructor();
    uploadFile(file: Express.Multer.File): string;
    getFile(path: any, response: Response): Promise<void>;
}
