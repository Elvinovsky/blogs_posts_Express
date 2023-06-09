import {
    RequestInputBody,
    RequestParamsAndInputBody,
    RequestParamsAndInputQuery,
    RequestParamsId,
    RequestQuery,
    ResponseViewBody
} from "../types/req-res-types";
import {
    QueryInputParams,
    SearchNameTerm
} from "../models/query-input-params";
import { Response } from "express";
import { blogsQueryRepository } from "../repositories/queryRepository/blogs-query-repository";
import { BlogView } from "../models/modelsBlogs/blog-view";
import { blogsService } from "../domains/blogs-service";
import { PaginatorType } from "../helpers/pagination-helpers";
import { PostView } from "../models/modelsPosts/post-view";
import { BlogPostInputModel } from "../models/modelsPosts/post-input";
import { postsService } from "../domains/posts-service";
import { BlogInput } from "../models/modelsBlogs/blog-input";

export class BlogsController {
    async getBlogs(req: RequestQuery<QueryInputParams&SearchNameTerm>,
                   res: Response) {
        const getAllBlogs = await blogsQueryRepository.returnOfAllBlogs(
            req.query.searchNameTerm,
            Number(req.query.pageNumber),
            Number(req.query.pageSize),
            req.query.sortBy,
            req.query.sortDirection)

        res.send(getAllBlogs)

    }
    async getBlog (req: RequestParamsId<{ id: string }>,
                   res: ResponseViewBody<BlogView>) {
        const getByIdBlog = await blogsService.findBlogById(req.params.id)
        if (!getByIdBlog) {
            res.sendStatus(404)
            return;
        }
        res.send(getByIdBlog)
        return;
    }
    async getPostsByBlog(req: RequestParamsAndInputQuery<{blogId: string }, QueryInputParams>,
                         res: ResponseViewBody<PaginatorType<PostView[]>>) {
        const getByBlogIdPosts = await blogsQueryRepository.searchPostByBlogId(
            req.params.blogId,
            Number(req.query.pageNumber),
            Number(req.query.pageSize),
            req.query.sortBy,
            req.query.sortDirection,)

        if (!getByBlogIdPosts) {
            res.sendStatus(404)
            return;
        }
        res.send(getByBlogIdPosts)
    }
    async createPostForBlog(req: RequestParamsAndInputBody<{ blogId: string }, BlogPostInputModel>,
                            res: ResponseViewBody<PostView>) {
        const validatorBlogIdForCreatePost = await postsService.searchBlogIdForPost(req.params.blogId)
        if (!validatorBlogIdForCreatePost) {
            res.sendStatus(404)
            return;
        }
        const createdNewPost = await postsService.createPost
                                                 (req.body.title, req.body.shortDescription, req.body.content, req.params.blogId)
        res.status(201).send(createdNewPost)
        return;
    }
    async createBlog(req: RequestInputBody<BlogInput>,
                     res: ResponseViewBody<BlogView>) {

        const createdBlog = await blogsService
            .createBlog(req.body.name, req.body.description, req.body.websiteUrl)

        res.status(201).send(createdBlog)
        return;
    }
    async updateBlog(req: RequestParamsAndInputBody<{ id: string }, BlogInput>,
                     res: Response) {
        const searchBlogByIdForUpdate = await blogsService.findBlogById(req.params.id)
        if (!searchBlogByIdForUpdate) {
            res.sendStatus(404)
            return;
        }
        const foundBlogForUpdate = await blogsService
            .updateBlogById(req.params.id, req.body.name, req.body.description, req.body.websiteUrl)
        if (foundBlogForUpdate) {
            res.sendStatus(204)
            return;
        }
    }
    async deleteBlog(req: RequestParamsId<{ id: string }>,
                     res: Response) {
        const foundBlogDelete = await blogsService.BlogByIdDelete(req.params.id)
        if (!foundBlogDelete) {
            res.sendStatus(404)
            return;
        }
        res.sendStatus(204)
        return;
    }
}

export const blogsControllerInstance = new BlogsController()