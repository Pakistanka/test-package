//@ts-nocheck
import { request } from "./../request";

export async function getTotalStake(deadline = null) {
    const queryParams = !Number.isNaN(deadline) ? `?deadline=${deadline}` : '';

    return await request({
        path: `/get-bs-total-ada-with-apr${queryParams}`,
    });
}
