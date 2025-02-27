import multer from 'multer';
import paths from '../utils/paths.js';
import {generateNameForFile} from './random.js';

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, paths.images);
    },
    filename: (req, file, cb) => {
       const filename =  generateNameForFile(file.originalname);
        cb(null, filename);
    }
});
const uploader = multer({ storage });

export default uploader;