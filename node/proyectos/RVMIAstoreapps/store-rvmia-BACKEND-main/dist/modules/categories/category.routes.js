"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const category_controller_1 = require("./category.controller");
const router = (0, express_1.Router)();
router.post('/', category_controller_1.createCategory);
router.get('/', category_controller_1.getCategories);
exports.default = router;
