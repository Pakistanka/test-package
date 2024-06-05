//@ts-nocheck
import { request } from "./../request";

export async function getAvailablePools(amount?: any, page?: any, stakeHash?: any, deadline?: any) {
    return await request({
        path: `/get-bs-available-pools`,
        args: {
            amount,
            page,
            stakeHash,
            deadline
        }
    })
}
