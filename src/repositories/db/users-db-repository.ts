import { UserDBType } from "../../models/modelsUsersLogin/user-input";
import {
    DeleteResult,
    ObjectId,
    WithId
} from "mongodb";
import { UserViewModel } from "../../models/modelsUsersLogin/user-view";
import { UserModelClass } from "../../models/mongoose/models";


export const usersRepository = {
    async testingDeleteAllUsers (): Promise<DeleteResult> {
        return await UserModelClass.deleteMany({})
    },
    async findUserById ( id: string ): Promise<WithId<UserDBType> | null> {
        return await UserModelClass.findOne({ _id: new ObjectId(id) })
    },
    async findUserConfirmCode ( code: string ): Promise<WithId<UserDBType> | null> {
        return await UserModelClass.findOne({ "emailConfirmation.confirmationCode": code })
    },
    async updateConfirmCode ( code: string ): Promise<boolean> {
        const updateResult = await UserModelClass.updateOne(
            { "emailConfirmation.confirmationCode": code },
            { $set: { "emailConfirmation.isConfirmed": true } })
        return updateResult.matchedCount === 1
    },
    async updatePasswordHash (passwordHash: string, code: string):Promise<boolean | null> {

        const updateResult = await UserModelClass.updateOne(
            {"emailConfirmation.confirmationCode": code},
            {$set: { passwordHash: passwordHash}}
        )
        return updateResult.matchedCount === 1
    },
    // проверяем код подверждения на совпадения, чтобы не сменить пароль другому юзеру
    async getUsersByConfirmationCode(code: string) {
        const isOneUser = await UserModelClass. find(
            {"emailConfirmation.confirmationCode": code}
        )
        if (isOneUser.length !== 1) {
            return false
        }
        return true
    },
    async updateConfirmationCodeByEmail ( email: string, code: string ): Promise<boolean> {
        const updateResult = await UserModelClass.updateOne({ email },
            { $set: { "emailConfirmation.confirmationCode": code } })
        return updateResult.matchedCount === 1
    },
    async findUserForComment ( userId: string ): Promise<WithId<UserDBType> | null> {
        return await UserModelClass.findOne({ _id: new ObjectId(userId) })
    },
    async findByLoginOrEmail ( loginOrEmail: string ): Promise<WithId<UserDBType> | null> {
        return await UserModelClass.findOne({ $or: [{ login: loginOrEmail }, { email: loginOrEmail }] })
    },
    async addNewUser ( newUser: UserDBType ): Promise<UserViewModel> {
        const result = await UserModelClass.create(newUser)
        return {
            id: result._id.toString(),
            login: newUser.login,
            email: newUser.email,
            createdAt: newUser.createdAt
        }
    },
    async userByIdDelete ( id: string ): Promise<boolean> {
        const deleteResult = await UserModelClass.deleteOne({ _id: new ObjectId(id) })
        return deleteResult.deletedCount === 1
    },
}