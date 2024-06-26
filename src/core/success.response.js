"use strict";

const StatusCode = {
  OK: 200,
  CREATED: 201,
};

const ReasonPhrases = {
  OK: "OK",
  CREATED: "Created",
};
class SuccessResponse {
  constructor({
    message,
    statusCode = StatusCode.OK,
    reason = ReasonPhrases.OK,
    metadata = {},
  }) {
    this.message = !message ? reason : message;
    this.status = statusCode;
    this.metadata = metadata;
  }

  send(res, headers = {}) {
    return res.status(this.status).json(this);
  }
}

class OK extends SuccessResponse {
  constructor({ message, metadata }) {
    super({ message, metadata});
  }
}

class Created extends SuccessResponse {
    constructor({ message, statusCode = StatusCode.CREATED, reason = ReasonPhrases.CREATED, metadata }) {
        super({ message, statusCode, reason, metadata});
    }
}

module.exports = {
    OK,
    Created,
    SuccessResponse
};
