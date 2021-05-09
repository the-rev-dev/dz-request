import { rStrings } from 'rev-strings';
export interface RequestProps<B extends (Object | undefined)> {
    method: 'GET' | 'POST' | 'PUT' | 'DELETE',
    uriPath?: string;
    params?: Record<string, string>;
    body?: B;
    headers?: Record<string, string>;
    authorization?: false | string;
}


/**
 * # Async Request
 * Used to fetch or post data.
 * 
 * @type <Body> is the payload of the request
 * @param thunkApi 
 * @param opts 
 */
export const request = async <Body extends (Object | undefined) = undefined>(url: string, opts: RequestProps<Body>) => {

    /* -------------------------------- Build URL ------------------------------- */
    if (opts?.uriPath) {
        url = url + opts.uriPath;
        if (opts?.params) {
        }
        url = rStrings.toQueryString(opts.params, url);
    }

    /* ------------------------------ Build Headers ----------------------------- */
    const headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        ...opts.headers,
    };

    if (!opts?.authorization) {
        headers["Authorization"] = opts.authorization;
    }

    /* ------------------------------ Build Request ----------------------------- */
    let request: RequestInit = {
        headers,
        method: !!opts?.method ? opts.method : "GET",
    };

    if (!!opts.method) {
        request.method = opts.method
    }

    if (!!opts.body) {
        request.body = JSON.stringify(opts.body);
    }

    return fetch(url, request);

};