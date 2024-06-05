//@ts-nocheck
import { request } from "./../request";

export async function getActivity(page: any, type = 0) {
    return await request({
        path: `/get-bs-history`,
        args: {
            type,
            page,
        }
    })
}
