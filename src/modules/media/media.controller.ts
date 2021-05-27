import { Body, Controller, Get, Param, Post, Res, UploadedFile, UseInterceptors, Request, Req, UseGuards, HttpException, HttpStatus } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express/multer/interceptors/file.interceptor';
import { readdir, readdirSync, readFile, rmdirSync, unlinkSync } from 'fs';
import { join, parse } from 'path';
import { diskStorage } from 'multer'
import { baseUrl } from '../../config'
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import * as sharp from 'sharp';
import * as shell from 'shelljs';
import { promisify } from 'util';
import * as fs from 'fs';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

sharp.cache(false);
const readFileAsyc = promisify(readFile);



@Controller('media')
export class MediaController {

    private readonly sizes: string[];
    constructor() {
        this.sizes = ['300X300'];
    }


    //🎁GET all image list and folder list
    @UseGuards(JwtAuthGuard)
    @Get('all')
    async findall(@Request() req, @Res() res) {
        try {
            // //👀 get seller images in admin panel
            // if (req?.query?.sl && !req?.user?.sl) req.user['sl'] = req.query.sl

            let folderAddress = req.query.folderAddress
            let baseImgPath = req.headers['sid']
            if (!baseImgPath) {
                baseImgPath = "adminImages"
            }

            if (folderAddress) {
                baseImgPath += '/' + folderAddress
            }

            var directoryPath = join(process.cwd(), '/upload/' + baseImgPath);
            const path = baseUrl + '/media/images/' + baseImgPath + '/';

            //👀 checking directory validity
            readdir(directoryPath, function (err, files) {
                //handling error
                if (err) {
                    throw new HttpException("Unable to Scan Directory", HttpStatus.BAD_REQUEST)
                }
            });

            //👀 getting all images and folders
            let allFiles = readdirSync(directoryPath, { withFileTypes: true });

            //👀 filtering only images
            let images = allFiles.filter(dirent => dirent.isDirectory() == false).map(dirent => dirent.name)
            //👀 ignoring resized images
            images = images.filter(image => image.search(/_/) < 0);

            //👀 filtering only folders
            let folders = allFiles.filter(dirent => dirent.isDirectory()).map(dirent => dirent.name)
            //👀 ignoring secure folders
            folders = folders.filter(image => image.search(/secure/) < 0);

            //👀preparing image response list
            let imageList = [];
            images.forEach((file, index) => {
                imageList.push({
                    uid: index + 1,
                    name: baseImgPath + '/' + file,
                    status: "done",
                    url: path + file,
                })
            });

            //👀 sorting image list for getting last uploaded images in first
            imageList = imageList.sort((a, b) => {
                let s1 = fs.statSync(process.cwd() + '/upload/' + a.name);
                let s2 = fs.statSync(process.cwd() + '/upload/' + b.name);
                return s2.ctimeMs - s1.ctimeMs;
            })

            //👀preparing folders response list
            let folderList = [];
            folders.forEach((file, index) => {
                folderList.push({
                    uid: index + 1,
                    name: baseImgPath + '/' + file,
                    status: "done",
                    url: baseUrl + '/media/images/adminImages/secure/folder.png',
                })
            });

            let response = {
                imageList,
                folderList
            }

            return res.json(response)
        } catch (err) {
            throw new HttpException(err.response, err.status)
        }
    }

    @Get('images/:restPath(\*+)')
    seeUploadedFile(@Param("restPath") restPath, @Res() res) {
        try {
            console.log("rest path=====", restPath);
            const imgRestPath = '/' + restPath

            if (fs.existsSync(process.cwd() + '/upload' + imgRestPath)) {
                return res.sendFile(imgRestPath, { root: 'upload' }, function (err) {
                    if (err) {
                        // return res.sendFile('/categoryImage/secure/product.png', { root: 'upload' })
                        res.status(err.status).end();
                        throw new HttpException("Something went wrong", HttpStatus.BAD_REQUEST)
                    }
                    else {
                        //   console.log('Sent:', imgPath);
                    }
                });
            } else {
                console.log("img not exit")
                if (imgRestPath.includes('_')) {
                    let [leftPart, RightPart] = imgRestPath?.split('_')
                    let [, ext] = RightPart?.split('.')
                    let baseImgPath = leftPart + '.' + ext
                    return res.sendFile(baseImgPath, { root: 'upload' }, function (err) {
                        if (err) {
                            // console.log(err)
                            // return res.sendFile('/categoryImage/secure/product.png', { root: 'upload' })
                            res.status(err.status).end();
                            throw new HttpException("Something went wrong", HttpStatus.BAD_REQUEST)
                        }
                        else {
                        }
                    });
                }
            }

        } catch (err) {
            throw new HttpException(err.response, err.status)
        }
    }

    //🎁 Delete a single image
    @UseGuards(JwtAuthGuard)
    @Post('deleteImage')
    async deleteImage(@Request() req, @Body() body) {
        try {
            const directoryPath = join(process.cwd(), '/upload/');
            const [originalname, ext] = body.name.split('.');
            if (fs.existsSync(directoryPath + '/' + body.name)) {
                unlinkSync(directoryPath + '/' + body.name)
                for (let i = 0; i < this.sizes.length; i++) {
                    let deleteImage = `${originalname}_${this.sizes[i]}.${ext.toLowerCase()}`
                    unlinkSync(directoryPath + '/' + deleteImage)
                }
                return { message: "successfullyDeleted" }
            } else {
                throw new HttpException('This Image is Not Exit', HttpStatus.BAD_REQUEST)
            }
        } catch (err) {
            throw new HttpException(err.response, err.status)
        }
    }

    //🎁 Creating Folders (nested)
    @UseGuards(JwtAuthGuard)
    @Post('createFolder')
    async createFolder(@Request() req, @Body() body) {
        try {
            // //👀 create folder in seller from admin panel
            // if (req?.query?.sl && !req?.user?.sl) req.user['sl'] = req.query.sl
            let folderAddress = req.query.folderAddress
            let baseFolderPath = req.headers['sid']

            if (!baseFolderPath) {
                baseFolderPath = "adminImages"
            }

            if (folderAddress) {
                baseFolderPath += '/' + folderAddress
            }

            let tmp = `upload/${baseFolderPath}`
            try {
                shell.mkdir('-p', tmp);
                return {
                    msg: "successfullyCreated"
                }
            }
            catch (err) {
                throw new HttpException(err.response, err.status)
            }
        } catch (err) {
            throw new HttpException(err.response, err.status)
        }

    }

    //🎁 Deleting Folders (nested)
    @UseGuards(JwtAuthGuard)
    @Post('deleteFolder')
    async deleteFolder(@Request() req, @Body() body) {
        const directoryPath = join(process.cwd(), '/upload/');
        try {
            if (fs.existsSync(directoryPath + '/' + body.name)) {
                rmdirSync(directoryPath + '/' + body.name, { recursive: true });
                return { msg: "deleted" }
            } else {
                throw new HttpException("This Folder does not exist", HttpStatus.BAD_REQUEST)
            }
        } catch (err) {
            throw new HttpException(err.response, err.status)
        }

    }

    //🎁 Rename Folder (nested)
    @UseGuards(JwtAuthGuard)
    @Post('renameFolder')
    async renameFolder(@Request() req, @Body() body) {
        console.log("req.query================", req.query)
        try {
            // if (req?.query?.sl && !req?.user?.sl) req.user['sl'] = req.query.sl
            let oldFolderAddress = req.query.oldFolderAddress
            let newFolderAddress = req.query.newFolderAddress
            let baseFolderPath = req.headers['sid']
            let currPath
            let newPath

            if (!baseFolderPath) {
                baseFolderPath = "adminImages"
            }

            if (oldFolderAddress) {
                currPath = `upload/${baseFolderPath}/` + oldFolderAddress
            }

            if (newFolderAddress) {
                newPath = `upload/${baseFolderPath}/` + newFolderAddress
            }
            fs.rename(currPath, newPath, function (err) {
                if (err) {
                    throw new HttpException('Something Went Wrong', HttpStatus.BAD_REQUEST)
                } else {
                    console.log("Successfully renamed the directory.")
                }
            })
            return { message: `successfullyRenamed` }
        } catch (err) {
            throw new HttpException(err.response, err.status)
        }

    }


    //🎁 upload images with nested folders
    @UseGuards(JwtAuthGuard)
    @Post('upload')
    @UseInterceptors(FileInterceptor('file',
        {
            storage: diskStorage({
                destination: (req, file, callback) => {
                    try {
                        // //👀 upload images in seller from admin panel
                        // if (req?.query?.sl && !req.user['sl']) req.user['sl'] = req.query.sl

                        // //👀 upload image for customer and delivery man
                        // if (!req?.query?.sl && !req.user['sl'] && req.user['role']!='ebhubon-admin') req.user['sl'] = req.user['id']


                        //👀 uploading image from seller panel
                        let baseImgPath = req.headers['sid']

                        //👀 uploading image from admin panel
                        if (!baseImgPath) {
                            baseImgPath = "adminImages"
                        }

                        //👀 uploading confidential which will not be visible
                        if (req.query['secure']) {
                            baseImgPath = baseImgPath + '/secure'
                        }

                        //👀 uploading images in nested folder
                        let folderAddress = req.query.folderAddress
                        if (folderAddress) {
                            baseImgPath = baseImgPath + '/' + folderAddress
                        }

                        let tmp = `upload/${baseImgPath}`
                        console.log('baseImgPath======', tmp);

                        try {
                            shell.mkdir('-p', tmp);
                        }
                        catch (err) {
                            throw new HttpException(err.response, err.status);
                        }
                        callback(null, tmp);
                    } catch (err) {
                        throw new HttpException(err.response, err.status);
                    }
                },
                filename: (req, file, cb) => {
                    try {
                        let [originalname, ext] = (file.originalname).split('.');
                        let [, fileType] = (file.mimetype).split('/');

                        //👀 checking image format valid or not
                        if (['jpeg', 'jpg', 'png'].includes(fileType) && ['jpeg', 'jpg', 'png'].includes(ext)) {

                            //👀 convert jpg image format to jpeg
                            ext == 'jpg' ? ext = 'jpeg' : ext = ext
                            const randomName = parse(file.originalname).name.replace(/[_() ]/g, "-") + Date.now() + `.${ext.toLowerCase()}`;
                            return cb(null, `${randomName}`)
                        } else {
                            console.log("Invalid Image Format")
                            // req.destroy()
                            // throw new HttpException("invalid Image Format", HttpStatus.FORBIDDEN)
                            return { message: "Invalid Image Format" }
                        }
                    } catch (err) {
                        throw new HttpException(err.response, err.status);
                    }
                }
            })
        }))
    uploadFile(@UploadedFile() file, @Request() req) {
        try {
            const root = process.cwd();
            const filepath = join(root, file.path);
            let [, ext] = file.filename.split('.');

            //👀image resizign using sharpjs
            this.saveImages(ext, file, filepath);

            let imagePath = file.path.substring(file.path.indexOf('\\') + 1)
            return imagePath
        } catch (err) {
            throw new HttpException(err.response, err.status)
        }

    }

    //🎁 image resizign using sharpjs
    private async saveImages(
        ext: string,
        file: Express.Multer.File,
        filepath
    ) {
        try {
            if (['jpeg', 'jpg', 'png'].includes(ext)) {
                const [originalname,] = file.filename.split('.');
                let imgWidth
                let imgHight
                const image = sharp(filepath);
                image
                    .metadata()
                    .then(function (metadata) {
                        imgWidth = metadata.width
                        imgHight = metadata.height
                    })

                this.sizes.forEach((s: string) => {
                    const [size] = s.split('X');
                    const newFilePath = join(process.cwd(), file.destination, originalname + `_${size}X${size}` + '.' + ext.toLowerCase())
                    let imgDimantion = parseInt(size)
                    if (imgWidth > imgHight) {

                        sharp(filepath)
                            .resize(imgDimantion, null)
                            .webp({ quality: 80 })
                            .toFormat(ext)
                            .toFile(newFilePath, function (err) {

                            });
                    } else {

                        sharp(filepath)
                            .resize(null, imgDimantion)
                            .webp({ quality: 80 })
                            .toFormat(ext)
                            .toFile(newFilePath, function (err) {
                            });
                    }

                });

                //👀 resize original image quality
                if (imgWidth > imgHight) {
                    let buffer = await sharp(filepath)
                        // .resize(200, 200, {
                        //   fit: sharp.fit.inside,
                        //   withoutEnlargement: true,
                        // })
                        .resize(1000, null)
                        // .webp({ quality: 80 })
                        .toBuffer();
                    sharp(buffer).toFile(filepath);
                } else {
                    let buffer = await sharp(filepath)
                        // .resize(200, 200, {
                        //   fit: sharp.fit.inside,
                        //   withoutEnlargement: true,
                        // })
                        .resize(null, 1000)
                        // .webp({ quality: 80 })
                        .toBuffer();
                    sharp(buffer).toFile(filepath);
                }
            }
        } catch (err) {
            throw new HttpException(err.response, err.status)
        }
    }
















}
