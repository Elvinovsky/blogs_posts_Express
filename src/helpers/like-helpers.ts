import { LikeModelClass } from "../models/mongoose/models";
import { ObjectId } from "mongodb";

export enum Status { None = 'None', Like = 'Like', Dislike = 'Dislike'}

export const likesAndDisCount = async( id: string | ObjectId ): Promise<{ likes: number; disLikes: number }> => {

    if (typeof id === "string") {

        const likes = await LikeModelClass.countDocuments({
            postOrCommentId: id,
            status: "Like"
        })
        const disLikes = await LikeModelClass.countDocuments({
            postOrCommentId: id,
            status: "Dislike"
        })

        return {
            likes,
            disLikes
        }
    }

    const likes = await LikeModelClass.countDocuments({
        postOrCommentId: id.toString(),
        status: "Like"
    })
    const disLikes = await LikeModelClass.countDocuments({
        postOrCommentId: id.toString(),
        status: "Dislike"
    })
    return {
        likes,
        disLikes
    }
}

