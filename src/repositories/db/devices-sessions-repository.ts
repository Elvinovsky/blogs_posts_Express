import {
    DeleteResult,
    InsertOneResult,
    ObjectId,
    WithId,
} from "mongodb";
import {
    sessionsCollection
} from "../../database/runDB";
import { DeviceAuthSessionsDBModel } from "../../models/modelsDevice/device-input";
import {
    devicesSessionsMapping
} from "../../functions/deviceSessionMapping";
import { DeviceView } from "../../models/modelsDevice/device-view";

export const devicesSessionsRepository = {
    async testingDeleteAllSessions (): Promise<DeleteResult> {
        return await sessionsCollection.deleteMany({})
    },
    async findDeviceSessionByIAT ( issuedAt: number ): Promise<boolean> {
       const deviceSession =  await sessionsCollection.findOne({ issuedAt: issuedAt })
        return !!deviceSession
    },
    async findDeviceIdAmongSessions ( deviceID: string ): Promise<WithId<DeviceAuthSessionsDBModel> | null> {
        return  await sessionsCollection.findOne({deviceId: deviceID })
    },
    async findDeviceSessionByUserId ( userId: string): Promise<WithId<DeviceAuthSessionsDBModel>[] | null> {
        return  await sessionsCollection.find({ userId: userId }).toArray()
    },
    async findDevicesSessionsByUserId ( userId: string ): Promise<DeviceView[] | null> {
        const devicesSessions =  await sessionsCollection.find({ userId: userId }).toArray()
        if(!devicesSessions) {
            return null
        }
        return devicesSessionsMapping(devicesSessions)
    },
    async addDeviceSession ( deviceSession:DeviceAuthSessionsDBModel ):  Promise<InsertOneResult<DeviceAuthSessionsDBModel>> {
        return await sessionsCollection.insertOne(deviceSession)
    },
    async updateDeviceSession( newIssuedAt: number, issuedAt: number ):  Promise<boolean>{
        const updateActiveDAte = new Date().toISOString()
        const result = await sessionsCollection.updateOne(
            { issuedAt: issuedAt},
            { $set: {issuedAt: newIssuedAt, lastActiveDate: updateActiveDAte}})
        return result.matchedCount === 1
    },
    async deleteDeviceSessionByIAT (issuedAt: number): Promise<boolean> {
        const result = await sessionsCollection.deleteOne({ issuedAt: issuedAt })
        return result.deletedCount === 1
    },
    async deleteDeviceSessionSpecified (deviceId: string, userId: string): Promise<boolean> {
        const result = await sessionsCollection.deleteOne({ userId: userId, deviceId: deviceId })
        return result.deletedCount === 1
    },
    async deleteDevicesSessionsByUser (issuedAt: number, userId: string): Promise<boolean> {
        const result = await sessionsCollection.deleteMany({
            userId: userId,
            issuedAt: { $ne: issuedAt }, // исключаем документы с определенным значением issuedAt
            status: { $nin: ['closed', 'expired'] } // исключаем документы со статусами 'closed' и 'expired'
        })
        return result.deletedCount === 1
    },
}