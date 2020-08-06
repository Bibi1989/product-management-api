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
const cloudinary_1 = require("cloudinary");
const Car_model_1 = __importDefault(require("../models/Car.model"));
cloudinary_1.v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});
exports.getCars = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const cars = yield Car_model_1.default.find().sort({ createdAt: -1 });
        res.json({
            status: "success",
            data: cars,
        });
    }
    catch (error) {
        res.status(404).json({
            status: "error",
            error: error.message,
        });
    }
});
exports.getCar = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const car = yield Car_model_1.default.findById(req.params.id);
        res.json({
            status: "success",
            data: car,
        });
    }
    catch (error) {
        res.status(404).json({
            status: "error",
            error: error.message,
        });
    }
});
exports.getMakes = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const makes = yield Car_model_1.default.find({}).select("name model location");
        let obj = {};
        makes.forEach((v) => {
            if (obj[v.name]) {
                obj[v.name] += 1;
            }
            else {
                obj[v.name] = 1;
            }
        });
        let key = Object.keys(obj);
        let value = Object.values(obj);
        let data = [];
        for (let v in key) {
            data.push({ make: key[v], count: value[v] });
        }
        res.json({
            status: "success",
            data,
        });
    }
    catch (error) {
        res.status(404).json({
            status: "error",
            error: error.message,
        });
    }
});
exports.getModels = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let name = req.params.model.toLowerCase();
        const car = yield Car_model_1.default.find({
            name,
        }).select("model name");
        res.json({
            status: "success",
            data: car,
        });
    }
    catch (error) {
        res.status(404).json({
            status: "error",
            error: error.message,
        });
    }
});
exports.getCarBaseOnMake = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let name = req.params.name.toLowerCase();
        const car = yield Car_model_1.default.find({
            name,
        });
        res.json({
            status: "success",
            data: car,
        });
    }
    catch (error) {
        res.status(404).json({
            status: "error",
            error: error.message,
        });
    }
});
exports.getCarBaseOnMakeAndModel = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let model = req.query.model && req.query.model.toLowerCase();
        let name = req.query.make && req.query.make.toLowerCase();
        if (!model && !name) {
            res.status(404).json({ status: "error", error: "Not found" });
        }
        const car = yield Car_model_1.default.find({
            model,
            name,
        });
        res.json({
            status: "success",
            data: car,
        });
    }
    catch (error) {
        res.status(404).json({
            status: "error",
            error: error.message,
        });
    }
});
exports.getCarBaseOnLocation = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let location = req.params.location.toLowerCase();
        const car = yield Car_model_1.default.find({
            location,
        });
        res.json({
            status: "success",
            data: car,
        });
    }
    catch (error) {
        res.status(404).json({
            status: "error",
            error: error.message,
        });
    }
});
exports.filterByPrice = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let min = req.query.min;
        let max = req.query.max;
        const price = yield Car_model_1.default.find();
        let data = price.filter((p) => Number(p.price) >= Number(min) && Number(p.price) <= Number(max));
        res.json({
            status: "success",
            data,
        });
    }
    catch (error) {
        res.status(404).json({
            status: "error",
            error: error.message,
        });
    }
});
exports.createCar = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const file = req.files;
        if (file) {
            const img = yield cloudinary_1.v2.uploader.upload(file.file.tempFilePath, { folder: "buycar" }, (err, result) => {
                if (err) {
                    console.log(err);
                }
                return result;
            });
            const car = new Car_model_1.default(Object.assign(Object.assign({}, req.body), { photo_url: img.secure_url }));
            yield car.save();
            yield car.save();
            res.json({
                status: "success",
                data: car,
            });
        }
        else {
            const car = new Car_model_1.default(req.body);
            yield car.save();
            res.json({
                status: "success",
                data: car,
            });
        }
        // cars.forEach(async (car: any) => {
        //   const saveCar = new Car(car);
        //   await saveCar.save();
        // });
        // res.send("added");
    }
    catch (error) {
        res.status(404).json({
            status: "error",
            error: error.message,
        });
    }
});
//# sourceMappingURL=car.controller.js.map