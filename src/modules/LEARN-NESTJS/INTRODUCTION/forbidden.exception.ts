import { 
    HttpException, 
    BadRequestException,
    UnauthorizedException,
    NotFoundException,
    ForbiddenException,
    NotAcceptableException,
    RequestTimeoutException,
    ConflictException,
    GoneException,
    HttpVersionNotSupportedException,
    PayloadTooLargeException,
    UnsupportedMediaTypeException,
    UnprocessableEntityException,
    InternalServerErrorException,
    NotImplementedException,
    ImATeapotException,
    MethodNotAllowedException,
    BadGatewayException,
    ServiceUnavailableException,
    GatewayTimeoutException,
    PreconditionFailedException,
    HttpStatus 
} from '@nestjs/common';

export class ForbiddenExceptions extends HttpException {
    constructor() {
      super('Forbidden', HttpStatus.FORBIDDEN);
    }
}