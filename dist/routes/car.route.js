"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const car_controller_1 = require("../controllers/car.controller");
const router = express_1.Router();
router.route("/cars").get(car_controller_1.getCars);
router.route("/cars/:id").get(car_controller_1.getCar);
router.route("/cars/make/:name").get(car_controller_1.getCarBaseOnMake);
router.route("/cars/model/make").get(car_controller_1.getCarBaseOnMakeAndModel);
router.route("/cars/location/:location").get(car_controller_1.getCarBaseOnLocation);
router.route("/makes").get(car_controller_1.getMakes);
router.route("/models/:model").get(car_controller_1.getModels);
router.route("/cars").post(car_controller_1.createCar);
exports.default = router;
//# sourceMappingURL=car.route.js.map