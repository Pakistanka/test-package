//@ts-nocheck
import { request } from "./../request";

export async function getLentStake(address: any) {
    return await request({
        path: `/get-bs-lender-active-pools`,
        args: {
            address
        }
    })
}

export async function getLentStakeOffers(address: any) {
    return await request({
        path: `/get-bs-lender-available-pools`,
        args: {
            address
        }
    })
}
