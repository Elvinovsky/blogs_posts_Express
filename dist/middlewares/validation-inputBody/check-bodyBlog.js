"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkInputDescription = exports.checkInputWebsiteUrl = exports.checkInputName = void 0;
const express_validator_1 = require("express-validator");
exports.checkInputName = (0, express_validator_1.check)('name').exists()
    .trim()
    .isLength({ min: 3, max: 15 })
    .withMessage({ message: "length should be no more than 15 characters", field: "name" })
    .isString()
    .withMessage({ message: "is not a string", field: "name" });
exports.checkInputWebsiteUrl = (0, express_validator_1.check)('websiteUrl').exists()
    .matches(/^(http(s)?:\/\/)[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/)
    .withMessage({ message: "is not a link to the site", field: "websiteUrl" })
    .isString()
    .withMessage({ message: "is not a string", field: "websiteUrl" })
    .isLength({ min: 10, max: 100 })
    .withMessage({ message: "must be at least 100 chars long", field: "websiteUrl" });
exports.checkInputDescription = (0, express_validator_1.check)('description').exists()
    .trim()
    .isLength({ min: 10, max: 500 })
    .withMessage({ message: "length should be no more than 500 characters", field: "description" })
    .isString()
    .withMessage({ message: "is not a string", field: "description" });