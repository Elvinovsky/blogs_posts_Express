import {UserAccountDBModel} from "../models/modelsUsersLogin/user-input";
import jwt from 'jsonwebtoken'
import {settings} from "../settings";
import {ObjectId, WithId} from "mongodb";
import {LoginSuccessViewModel} from "../models/modelsUsersLogin/login-view";



export const jwtService = {
    async createJWT(user: WithId<UserAccountDBModel>): Promise<LoginSuccessViewModel> {
        const token = jwt.sign({userId: new ObjectId(user._id)}, settings.JWT_SECRET, {expiresIn: '24h'})
        return {
            accessToken: token
        }
    },
    async getUserIdByToken (token: string) {
       try {
           const result = jwt.verify(token, settings.JWT_SECRET) as {userId: string}
           return new ObjectId(result.userId).toString()
       }
       catch (error) {
           return null;
       }
    }
}