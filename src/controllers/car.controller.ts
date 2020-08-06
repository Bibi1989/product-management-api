import { Request, Response } from "express";
import { v2 } from "cloudinary";

import Car from "../models/Car.model";

v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

interface CarInterface {
  _id: string;
  name: string;
  model: string;
  description: string;
  price: string;
  distance: string;
  fuel_type: string;
  photo_url: string;
  color: string;
  year: string;
  location: string;
  createdAt: string;
}

export const getCars = async (req: Request, res: Response) => {
  try {
    const cars = await Car.find().sort({ createdAt: -1 });
    res.json({
      status: "success",
      data: cars,
    });
  } catch (error) {
    res.status(404).json({
      status: "error",
      error: error.message,
    });
  }
};

export const getCar = async (req: Request, res: Response) => {
  try {
    const car = await Car.findById(req.params.id);
    res.json({
      status: "success",
      data: car,
    });
  } catch (error) {
    res.status(404).json({
      status: "error",
      error: error.message,
    });
  }
};
export const getMakes = async (req: Request, res: Response) => {
  try {
    const makes = await Car.find({}).select("name model location");
    let obj: any = {};
    makes.forEach((v: any) => {
      if (obj[v.name]) {
        obj[v.name] += 1;
      } else {
        obj[v.name] = 1;
      }
    });

    let key = Object.keys(obj);
    let value = Object.values(obj);

    let data: any[] = [];

    for (let v in key) {
      data.push({ make: key[v], count: value[v] });
    }

    res.json({
      status: "success",
      data,
    });
  } catch (error) {
    res.status(404).json({
      status: "error",
      error: error.message,
    });
  }
};
export const getModels = async (req: Request, res: Response) => {
  try {
    let name = req.params.model.toLowerCase();
    const car = await Car.find({
      name,
    }).select("model name");
    res.json({
      status: "success",
      data: car,
    });
  } catch (error) {
    res.status(404).json({
      status: "error",
      error: error.message,
    });
  }
};
export const getCarBaseOnMake = async (req: Request, res: Response) => {
  try {
    let name = req.params.name.toLowerCase();
    const car = await Car.find({
      name,
    });
    res.json({
      status: "success",
      data: car,
    });
  } catch (error) {
    res.status(404).json({
      status: "error",
      error: error.message,
    });
  }
};
export const getCarBaseOnMakeAndModel = async (req: Request, res: Response) => {
  try {
    let model = req.query.model && req.query.model.toLowerCase();
    let name = req.query.make && req.query.make.toLowerCase();

    if (!model && !name) {
      res.status(404).json({ status: "error", error: "Not found" });
    }
    const car = await Car.find({
      model,
      name,
    });
    res.json({
      status: "success",
      data: car,
    });
  } catch (error) {
    res.status(404).json({
      status: "error",
      error: error.message,
    });
  }
};
export const getCarBaseOnLocation = async (req: Request, res: Response) => {
  try {
    let location = req.params.location.toLowerCase();
    const car = await Car.find({
      location,
    });
    res.json({
      status: "success",
      data: car,
    });
  } catch (error) {
    res.status(404).json({
      status: "error",
      error: error.message,
    });
  }
};

export const filterByPrice = async (req: Request, res: Response) => {
  try {
    let min = req.query.min;
    let max = req.query.max;

    // {
    //   price: {
    //     $gte: min,
    //     $lte: max,
    //   },
    // }

    const price = await Car.find();

    let data = price.filter(
      (p: any) =>
        Number(p.price) >= Number(min) && Number(p.price) <= Number(max)
    );

    res.json({
      status: "success",
      data,
    });
  } catch (error) {
    res.status(404).json({
      status: "error",
      error: error.message,
    });
  }
};

export const createCar = async (req: Request, res: Response) => {
  try {
    const car = new Car(req.body);
    await car.save();
    res.json({
      status: "success",
      data: car,
    });
    // cars.forEach(async (car: any) => {
    //   const saveCar = new Car(car);
    //   await saveCar.save();
    // });
    // res.send("added");
  } catch (error) {
    res.status(404).json({
      status: "error",
      error: error.message,
    });
  }
};
