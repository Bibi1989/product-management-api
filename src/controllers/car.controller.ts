import { Request, Response } from "express";

import Car from "../models/Car.model";

const cars = [
  {
    name: "bmw",
    model: "x6",
    description:
      "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quisquam voluptatibus, nemo iusto quos cumque harum nihil fuga pariatur odio ipsa eveniet voluptate corrupti. Nostrum dolorum ratione illum voluptate nulla earum!",
    price: "23000000",
    distance: "65000",
    fuel_type: "petrol",
    photo_url: "",
    color: "black",
    year: "2017",
    location: "Lagos",
  },
  {
    name: "bmw",
    model: "x7",
    description:
      "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quisquam voluptatibus, nemo iusto quos cumque harum nihil fuga pariatur odio ipsa eveniet voluptate corrupti. Nostrum dolorum ratione illum voluptate nulla earum!",
    price: "2000000",
    distance: "40000",
    fuel_type: "petrol",
    photo_url: "",
    color: "grey",
    year: "2018",
    location: "Abuja",
  },
  {
    name: "honda",
    model: "civic",
    description:
      "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quisquam voluptatibus, nemo iusto quos cumque harum nihil fuga pariatur odio ipsa eveniet voluptate corrupti. Nostrum dolorum ratione illum voluptate nulla earum!",
    price: "20000000",
    distance: "11000",
    fuel_type: "petrol",
    photo_url: "",
    color: "dark blue",
    year: "2017",
    location: "Abuja",
  },
  {
    name: "lexus",
    model: "gs 550",
    description:
      "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quisquam voluptatibus, nemo iusto quos cumque harum nihil fuga pariatur odio ipsa eveniet voluptate corrupti. Nostrum dolorum ratione illum voluptate nulla earum!",
    price: "5800000",
    distance: "70230",
    fuel_type: "petrol",
    photo_url: "",
    color: "black",
    year: "2015",
    location: "Lagos",
  },
];

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
    console.log(name);
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
    console.log({ name });
    const car = await Car.find({
      name,
    });
    console.log(car);
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
