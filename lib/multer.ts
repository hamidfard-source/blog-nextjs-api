import multer from "multer";
import path from 'path';

// Configure storage for uploaded files
const storage  = multer.diskStorage({
  destination: (req:any, file:any, cb:any) => {
    cb(null, path.join(process.cwd(), 'public/uploads')); // Save files in the `public/uploads` folder
  },
  filename: (req:any, file:any, cb:any) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  },
});

// Initialize Multer
const upload = multer({ storage });

export default upload;
