//@ts-nocheck
import { request } from "./../request";

export async function getBorrowedStake(address: any) {
    return await request({
        path: `/get-bs-borrower-active-pools`,
        args: {
            address
        }
    })
}
