//@ts-nocheck
import { request } from "./../request";


export async function  BoostedStakeSdk(payload: any) {
    return await request({
        path: `/boosted-stake-sdk`,
        body: {
            signer: payload.signer,
            epochs: payload.epochs,
            borrower: payload.borrower,
            amount: payload.amount,
            partner: payload.partner
        }
    })
}
