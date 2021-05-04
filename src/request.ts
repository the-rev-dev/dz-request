
interface RequestOptions<B extends (Object | undefined)> {
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
export const request = async <Body extends (Object | undefined) = undefined>(url: string, opts: RequestOptions<Body>) => {

    /* -------------------------------- Build URL ------------------------------- */

    if (opts?.uriPath) {
        url = url + opts.uriPath;
        if (opts?.params) {
        }
        url = appendQuery(url, opts.params);
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


function updateQueryStringParameter(uri: string, key: string, value: string) {
    var re = new RegExp("([?&])" + key + "=.*?(&|$)", "i");
    var separator = uri.indexOf('?') !== -1 ? "&" : "?";
    if (uri.match(re)) {
        return uri.replace(re, '$1' + key + "=" + value + '$2');
    }
    else {
        return uri + separator + key + "=" + value;
    }
}

/** 
* Appends a query string to `url` based on `query`.
* 
* @param queryString `?field_1=value_1&...&field_n=value_n`
* @returns `{opt_1: val_1,...,opt_n=value_n}`
*/
function appendQuery(url: string, query: Record<string, string>): string {
    const queryKeys = Object.keys(query);

    queryKeys.forEach(k => {
        url = this.updateQueryStringParameter(url, k, query[k])
    });

    return url;
}
