import multer from "multer";


/* FILE STORAGE */
const storage = multer.memoryStorage();

const singleUpload = multer({ 
  storage,
  }).single('file');

export default singleUpload