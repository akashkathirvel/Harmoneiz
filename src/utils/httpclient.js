// import { httpError } from "./httperror";
// import Store from "../reducers";

import { localstore } from "./localstore";

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
  image = false,
  type
) {
  let value = null;
  // let requestOptions = {};

  switch (method) {
    case "GET":
      // requestOptions = get(credentials);
      value = localstore.getValue(endpoint);
      break;
    case "PUT":
      // requestOptions = put(payload, credentials);
      value = localstore.updateValue(endpoint, payload, type);
      break;
    case "POST":
      if (image) {
        // requestOptions = postImage(payload);
      } else {
        // requestOptions = post(payload, credentials);
        localstore.addValue(endpoint, payload);
        value = payload;
      }
      break;
    case "DELETE":
      // requestOptions = deleteReq(credentials);
      localstore.deleteValue(endpoint, payload, type);
      value = payload;
      break;
    default:
      console.log("Nothing here");
  }

  return Promise.resolve(value);
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
