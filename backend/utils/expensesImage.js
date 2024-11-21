const multer = require('multer');
const path = require('path');

// Configure storage for Multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads'); 
    },
    filename: (req, file, cb) => {

        const originalName = path.basename(file.originalname, path.extname(file.originalname)).replace(/\s+/g, '_');
        const uniqueSuffix = `${Date.now()}`;
        cb(null, `${originalName}-${uniqueSuffix}${path.extname(file.originalname)}`);
    }
});

// Initialize Multer with limits and updated file filter
const upload = multer({
    storage,
    limits: {
        fileSize: 10 * 1024 * 1024 
    },
    fileFilter: (req, file, cb) => {

        const filetypes = /pdf|jpg|jpeg|png|gif/;
        const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
        const mimetype = file.mimetype === 'application/pdf' || file.mimetype.startsWith('image/');

        if (mimetype && extname) {
            cb(null, true);
        } else {
            cb(new Error('Error: Only PDF, JPG, PNG, and GIF files are allowed!')); 
        }
    }
});

// Export the upload middleware for use in routes
module.exports = upload;
