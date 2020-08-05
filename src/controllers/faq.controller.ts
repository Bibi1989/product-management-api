import { Request, Response } from "express";

import Faq from "../models/Faq.model";

const lists = [
  {
    questions: "Do you have any insurance",
    answers:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur, mollitia?",
  },
  {
    questions: "How to be safe buying online",
    answers:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur, mollitia?",
  },
  {
    questions: "How many kilometer one car have in a car",
    answers:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur, mollitia?",
  },
  {
    questions: "When is the best time to buy a car",
    answers:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur, mollitia?",
  },
  {
    questions: "How to know if a car is durable",
    answers:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur, mollitia?",
  },
  {
    questions: "Is there quarantee for a car bought",
    answers:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur, mollitia?",
  },
];

interface FaqInterface {
  _id: string;
  questions: string;
  answers: string;
}

export const getFaqs = async (req: Request, res: Response) => {
  try {
    const faqs = await Faq.find();
    res.json({
      status: "success",
      data: faqs,
    });
  } catch (error) {
    res.status(404).json({
      status: "error",
      error: error.message,
    });
  }
};

export const getFaq = async (req: Request, res: Response) => {
  try {
    const faq = await Faq.findById(req.params.id);
    res.json({
      status: "success",
      data: faq,
    });
  } catch (error) {
    res.status(404).json({
      status: "error",
      error: error.message,
    });
  }
};

export const createFaq = async (req: Request, res: Response) => {
  try {
    const faq = new Faq(req.body);
    await faq.save();
    res.json({
      status: "success",
      data: faq,
    });
  } catch (error) {
    res.status(404).json({
      status: "error",
      error: error.message,
    });
  }
};
