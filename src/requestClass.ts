import { rStrings } from 'rev-strings';

export type RequestMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

export interface RequestProps {
    method?: RequestMethod,
    url?: string;

}

export type ExecuteRequestProps<B extends (Object | undefined) = undefined> = {
    query?: Record<string, string>;
    body?: B;
    headers?: Record<string, string>;
    authorization?: false | string;
}

export class Request {
    private _url: string;
    private _method: RequestMethod;
    private _headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
    };

    static createRequest(props?: RequestProps) {
        return new this(props);
    }

    private constructor(props: RequestProps) {
        this._url = props.url || "url-not-defined";
        this._method = props.method || "GET";
    }

    execute(request: ExecuteRequestProps) {
        const requestUrl = request.query
            ? rStrings.toQueryString(request.query, this._url)
            : this._url;

        const requestHeaders = this._headers;

        if (request.authorization) {
            requestHeaders["Authorization"] = request.authorization;
        }

        return fetch(requestUrl, {
            headers: requestHeaders,
            method: this._method,
            body: request.body,
        });
    }
}