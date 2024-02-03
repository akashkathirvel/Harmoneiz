// import { httpError } from "./httperror";
// import Store from "../reducers";

export const httpClient = {
  deleteReq,
  get,
  getImageHeaders,
  callApi,
  handleResponse,
  post,
  postImage,
  put
};

function getHeaders() {
  let headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
    "Access-Control-Allow-Headers": "*", 
  }

  return { headers };
}

function getImageHeaders(uri) {
  return {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Basic `//${base64string}`
    },
    uri: uri,
    method: "GET"
  };
}

function getRequestOption(credentials) {
  let headers = getHeaders(credentials).headers;
  let requestOptions = {
    credentials: "include",
    headers
  };

  if (!credentials) {
    delete requestOptions["credentials"];
  }

  return requestOptions;
}

function get(credentials = true) {
  let requestOptions = getRequestOption(credentials);

  requestOptions["method"] = "GET";
  return requestOptions;
}

function deleteReq(credentials = true) {
  let requestOptions = getRequestOption(credentials);

  requestOptions["method"] = "DELETE";
  return requestOptions;
}

function post(payload, credentials = true) {
  let requestOptions = getRequestOption(credentials);

  requestOptions["method"] = "POST";
  requestOptions["body"] = JSON.stringify(payload);
  return requestOptions;
}

function postImage(payload) {
  let requestOptions = {
    credentials: "include",
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "multipart/form-data",
    },
    body: payload
  };

  return requestOptions;
}

function put(payload, credentials = true) {
  let requestOptions = getRequestOption(credentials);

  requestOptions["method"] = "PUT";
  requestOptions["body"] = JSON.stringify(payload);
  return requestOptions;
}

function callApi(
  method,
  endpoint,
  payload = {},
  credentials = true,
  image = false
) {
  let requestOptions = {};
  // let url = Store.getState().endpoint.service_url;

  switch (method) {
    case "GET":
      requestOptions = get(credentials);
      break;
    case "PUT":
      requestOptions = put(payload, credentials);
      break;
    case "POST":
      if (image) {
        requestOptions = postImage(payload);
      } else {
        requestOptions = post(payload, credentials);
      }
      break;
    case "DELETE":
      requestOptions = deleteReq(credentials);
      break;
    default:
      console.log("Nothing here");
  }
  // return fetch(`${url}${endpoint}`, requestOptions).then(handleResponse);
}

function handleResponse(response) {
  let json = response.json();
  if (!(response.status === 200 || response.status === 201)) {
    return json.then(res => {
      
      // httpError.showError(res);
      return Promise.reject(res);
    });
  }

  return json;
}
