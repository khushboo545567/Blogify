import multer from "multer";

const store = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "");
  },
});
