export class ResponseHandler {
  constructor(public data: any, public error: any = null) {}
}

export class MessageHandler {
  constructor(public statusCode: number, public message: any) {}
}
