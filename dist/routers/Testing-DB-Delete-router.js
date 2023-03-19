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
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteAllDataRouter = void 0;
const express_1 = require("express");
const blogs_inMemory_repository_1 = require("../repositories/in-memory/blogs-inMemory-repository");
const posts_inMemory_repository_1 = require("../repositories/in-memory/posts-inMemory-repository");
exports.deleteAllDataRouter = (0, express_1.Router)();
exports.deleteAllDataRouter.delete('/all-data', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield blogs_inMemory_repository_1.blogsRepository.testingDeleteAllBlogs();
    yield posts_inMemory_repository_1.postsRepository.testingDeleteAllPosts();
    res.send(204);
    return;
}));