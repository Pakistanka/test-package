import axios, { AxiosResponse } from "axios";

interface RequestArgs {
    [key: string]: string | number | boolean | undefined;
}

interface RequestOptions {
    path: string;
    args?: RequestArgs;
    body?: any;
}

interface RequestResponse {
    data: any;
}

export async function request({ path, args, body }: RequestOptions): Promise<any> {
    if (args) {
        let first = true;
        for (const [arg, value] of Object.entries(args)) {
            if (value == undefined) continue;

            if (first) path += "?";
            else path += "&";

            first = false;

            path += `${arg}=${value}`;
        }
    }

    const response: AxiosResponse<RequestResponse> = body
        ? await axios.post(path, body)
        : await axios.get(path);

    if (response.status !== 200) throw new Error(JSON.stringify(response.data));

    return response.data.data ?? response.data;
}
