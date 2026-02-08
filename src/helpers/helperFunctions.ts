

export const giveMeStatusCodes = (): globalIterface => {
  return {
    success: { status: 200, api_status: "API-OK" },
    success_no_data: { status: 204, api_status: "API-OK-NO-CONTENT" },
    bad_request: { status: 400, api_status: "API-BAD-REQUEST" },
    un_authorised: { status: 401, api_status: "API-UN-AUTHORISED-ACCESS" },
    forbidden: { status: 403, api_status: "API-FORBIDDEN" },
    not_found: { status: 404, api_status: "API-NOT-FOUND" },
    Conflict: { status: 409, api_status: "API-CONFLICT" },
    error: { status: 500, api_status: "API-ERROR" },
  };
};

export interface ResponseType {
  data?: object | null;
  status: 200 | 204 | 400 | 401 | 403 | 404 | 409 | 500;
  api_status:
    | "API-OK"
    | "API-OK-NO-CONTENT"
    | "API-BAD-REQUEST"
    | "API-UN-AUTHORISED-ACCESS"
    | "API-FORBIDDEN"
    | "API-NOT-FOUND"
    | "API-CONFLICT"
    | "API-ERROR";
  message?: string;
}

export interface globalIterface {
  success: ResponseType;
  success_no_data: ResponseType;
  bad_request: ResponseType;
  un_authorised: ResponseType;
  forbidden: ResponseType;
  not_found: ResponseType;
  Conflict: ResponseType;
  error: ResponseType;
}

