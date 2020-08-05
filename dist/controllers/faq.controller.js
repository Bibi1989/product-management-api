"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Faq_model_1 = __importDefault(require("../models/Faq.model"));
const lists = [
    {
        questions: "Do you have any insurance",
        answers: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur, mollitia?",
    },
    {
        questions: "How to be safe buying online",
        answers: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur, mollitia?",
    },
    {
        questions: "How many kilometer one car have in a car",
        answers: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur, mollitia?",
    },
    {
        questions: "When is the best time to buy a car",
        answers: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur, mollitia?",
    },
    {
        questions: "How to know if a car is durable",
        answers: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur, mollitia?",
    },
    {
        questions: "Is there quarantee for a car bought",
        answers: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur, mollitia?",
    },
];
exports.getFaqs = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const faqs = yield Faq_model_1.default.find();
        res.json({
            status: "success",
            data: faqs,
        });
    }
    catch (error) {
        res.status(404).json({
            status: "error",
            error: error.message,
        });
    }
});
exports.getFaq = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const faq = yield Faq_model_1.default.findById(req.params.id);
        res.json({
            status: "success",
            data: faq,
        });
    }
    catch (error) {
        res.status(404).json({
            status: "error",
            error: error.message,
        });
    }
});
exports.createFaq = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const faq = new Faq_model_1.default(req.body);
        yield faq.save();
        res.json({
            status: "success",
            data: faq,
        });
    }
    catch (error) {
        res.status(404).json({
            status: "error",
            error: error.message,
        });
    }
});
//# sourceMappingURL=faq.controller.js.map