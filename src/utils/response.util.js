"use strict";

import { STATUS_CODE } from "../../constants.js";

const response_success = (res, data = {}, message = "") => {
  return api_response(res, STATUS_CODE.SUCCESS, true, data, message);
};

const response_success_created = (res, data = {}, message = "") => {
  return api_response(res, STATUS_CODE.CREATED, true, data, message);
};

const response_error = (res, data = {}, message = "") => {
  return api_response(res, STATUS_CODE.ERROR_CODE, false, data, message);
};

const response_unauthorized = (res, data = {}, message = "") => {
  return api_response(res, STATUS_CODE.UNAUTHORIZED, false, data, message);
};

const response_forbidden = (res, data = {}, message = "") => {
  return api_response(res, STATUS_CODE.FORBIDDEN, false, data, message);
};

const response_not_found = (res, data = {}, message = "") => {
  return api_response(res, STATUS_CODE.NOT_FOUND, false, data, message);
};

const api_response = (res, code, success, data = {}, message = "") => {
  return res.status(code).json({
    success: success,
    data: data,
    message: message,
  });
};

export {
  response_success,
  response_error,
  response_unauthorized,
  response_forbidden,
  response_not_found,
  response_success_created,
};
