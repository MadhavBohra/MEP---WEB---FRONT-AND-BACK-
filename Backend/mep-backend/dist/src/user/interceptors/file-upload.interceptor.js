"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProfilePictureInterceptor = void 0;
const platform_express_1 = require("@nestjs/platform-express");
const multer_1 = require("multer");
const path_1 = require("path");
exports.ProfilePictureInterceptor = (0, platform_express_1.FileInterceptor)('profilePicture', {
    storage: (0, multer_1.diskStorage)({
        destination: './uploads/profile-pictures',
        filename: (req, file, callback) => {
            const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
            const ext = (0, path_1.extname)(file.originalname);
            const filename = `${uniqueSuffix}${ext}`;
            callback(null, filename);
        },
    }),
    fileFilter: (req, file, callback) => {
        if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
            return callback(new Error('Only image files are allowed!'), false);
        }
        callback(null, true);
    },
    limits: {
        fileSize: 1024 * 1024 * 5
    }
});
//# sourceMappingURL=file-upload.interceptor.js.map