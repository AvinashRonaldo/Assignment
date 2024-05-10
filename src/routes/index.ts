import { Router } from "express";
import { adminAuthenticate, verifyToken } from "../middlewares/verifyJwt";
import { getCurrentProfile, listAllProfiles, listAllPublicProfiles, login, logout, register, uploadProfilePic } from "../controllers";
import { updateUserProfile } from "../controllers";
export const router = Router();

router.post("/login",login);
router.post("/register",register);
router.post("/logout",logout);

router.get("/user/profile",verifyToken,getCurrentProfile);
router.get("/user/profile/list",verifyToken,listAllPublicProfiles);
router.put("/user/profile",verifyToken,updateUserProfile);
router.post("/user/profile/image",verifyToken,uploadProfilePic);


router.get("/admin/profile/list",verifyToken,adminAuthenticate,listAllProfiles)