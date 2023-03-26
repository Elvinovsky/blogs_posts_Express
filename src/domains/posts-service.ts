import {PostViewModel} from "../models/modelsPosts/postViewModel";
import {postsRepository} from "../repositories/db/posts-db-repository";
import {BlogViewModel} from "../models/modelsBlogs/blogViewModel";


export const postsService = {
    async searchBlogIdForPost(blogId: string):Promise <BlogViewModel | null > {
        return await postsRepository.searchBlogIdForPost(blogId)

    },
    async findPostById(id: string): Promise <PostViewModel | null> {
        return await postsRepository.findPostById(id)
    },
    async createPost(title: string, shortDescription: string, content: string, blogId: string): Promise <PostViewModel> {
        const outputBlogName: string = postsRepository.searchBlogIdForPost.name
        const newPost: PostViewModel = {
            id: (+(new Date())).toString(),
            title: title,
            shortDescription: shortDescription,
            content: content,
            blogId:	blogId,
            blogName: outputBlogName,
            createdAt: new Date().toISOString()
        }
        return await postsRepository.addNewPost(newPost)
    },
    async updatePostById(id: string, title: string, shortDescription: string, content: string,): Promise <boolean> {
        return postsRepository.updatePostById(id, title, shortDescription, content)
    },
    async postByIdDelete(id: string):Promise <boolean> {
        return  await postsRepository.postByIdDelete(id)
    }
}