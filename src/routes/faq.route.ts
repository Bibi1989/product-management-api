import { Router } from "express";
import { getFaqs, createFaq, getFaq } from "../controllers/faq.controller";

const router = Router();

router.route("/fags").get(getFaqs);

router.route("/fags/:id").get(getFaq);

router.route("/fags").post(createFaq);

export default router;
