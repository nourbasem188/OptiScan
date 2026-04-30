import multer from "multer";
import { nanoid } from "nanoid";

export const fileUpload = () => {
    // 1. تحديد مكان التخزين واسم الملف
    const storage = multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, 'uploads/'); // الصور هتتحفظ في فولدر اسمه uploads
        },
        filename: (req, file, cb) => {
            // بنخلي اسم الصورة فريد عشان لو يوزر رفع صورتين بنفس الاسم ميمسحوش بعض
            cb(null, nanoid() + "_" + file.originalname);
        }
    });

    // 2. فلتر عشان نتأكد إن المرفوع "صورة" مش ملف تاني
    const fileFilter = (req, file, cb) => {
        if (file.mimetype.startsWith('image/')) {
            cb(null, true);
        } else {
            cb(new Error("Image only Allowed!"), false);
        }
    };

    return multer({ storage, fileFilter });
};