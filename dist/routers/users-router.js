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
exports.usersRouter = void 0;
const express_1 = require("express");
const users_service_1 = require("../domains/users-service");
const check_bodyUser_1 = require("../middlewares/body-validator/check-bodyUser");
const users_query_repository_1 = require("../repositories/queryRepository/users-query-repository");
const super_admin_authentication_1 = require("../middlewares/guard-authentication/super-admin-authentication");
const ip_1 = __importDefault(require("ip"));
exports.usersRouter = (0, express_1.Router)();
exports.usersRouter.get('/', super_admin_authentication_1.superAdminAuthentication, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const getAllUsers = yield users_query_repository_1.usersQueryRepository.returnOfAllUsers(req.query.searchEmailTerm, req.query.searchLoginTerm, Number(req.query.pageNumber), Number(req.query.pageSize), req.query.sortBy, req.query.sortDirection);
    res.send(getAllUsers);
}));
exports.usersRouter.post('/', check_bodyUser_1.validatorUserBodyRegistrationForSuperAdmin, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const ipAddress = ip_1.default.address();
    const newUser = yield users_service_1.usersService.userByAnAdminRegistration(req.body.login, req.body.password, req.body.email, ipAddress);
    res.status(201).send(newUser);
    return;
}));
exports.usersRouter.get('/:id', super_admin_authentication_1.superAdminAuthentication, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const getByIdUser = yield users_service_1.usersService.findUserById(req.params.id);
    return getByIdUser === null
        ? res.sendStatus(404)
        : res.send(getByIdUser);
}));
exports.usersRouter.delete('/:id', super_admin_authentication_1.superAdminAuthentication, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const foundUserDelete = yield users_service_1.usersService.userByIdDelete(req.params.id);
    if (!foundUserDelete) {
        res.sendStatus(404);
        return;
    }
    res.sendStatus(204);
    return;
}));
