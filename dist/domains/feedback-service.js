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
exports.feedbacksService = void 0;
const feedbacks_db_repository_1 = require("../repositories/db/feedbacks-db-repository");
const users_db_repository_1 = require("../repositories/db/users-db-repository");
const usersMapping_1 = require("../functions/usersMapping");
exports.feedbacksService = {
    getComment(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield feedbacks_db_repository_1.feedBacksRepository.getCommentById(id);
        });
    },
    searchUserForComment(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield users_db_repository_1.usersRepository.findUserForComment(userId);
            if (!user)
                return null;
            return (0, usersMapping_1.userMapping)(user);
        });
    },
    searchPostIdForComments(postId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield feedbacks_db_repository_1.feedBacksRepository.searchPostIdForComments(postId);
        });
    },
    createComment(postId, userId, content) {
        return __awaiter(this, void 0, void 0, function* () {
            const outputUserLogin = yield this.searchUserForComment(userId);
            const newComment = {
                postId: postId,
                content: content,
                commentatorInfo: {
                    userId: userId,
                    userLogin: outputUserLogin.login
                },
                createdAt: new Date().toISOString()
            };
            return yield feedbacks_db_repository_1.feedBacksRepository.addNewComment(newComment);
        });
    },
    updateCommentById(id, content) {
        return __awaiter(this, void 0, void 0, function* () {
            return feedbacks_db_repository_1.feedBacksRepository.updateCommentById(id, content);
        });
    },
    deletedCountComment(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield feedbacks_db_repository_1.feedBacksRepository.deleteComment(id);
        });
    }
};
