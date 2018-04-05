export declare class BaseError {
    constructor();
}
export declare class TypedError extends BaseError {
    name: string;
    message: string;
    stack: string;
    constructor(err?: Error | string);
}
