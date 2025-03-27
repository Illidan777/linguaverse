package com.gorbasenko245.linguaverse_backend.api.handler;

import com.gorbasenko245.linguaverse_backend.domain.api.ApiResponse;
import com.gorbasenko245.linguaverse_backend.domain.exception.BaseApiException;
import com.gorbasenko245.linguaverse_backend.domain.exception.common.ResourceNotFoundException;
import com.gorbasenko245.linguaverse_backend.domain.exception.common.ValidationException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

@ControllerAdvice
@ResponseBody
@Slf4j
public class GlobalExceptionHandler {

    @ExceptionHandler(Throwable.class)
    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    public ApiResponse<Void> handleThrowable(final Throwable ex) {
        log.error("Was caught throwable!", ex);
        return new ApiResponse<Void>()
                .status(ApiResponse.ApiStatus.UNKNOWN_ERROR)
                .message(BaseApiException.DEFAULT_API_EXCEPTION_MESSAGE)
                .technicalMessage(ex.getMessage());
    }

    @ExceptionHandler(Exception.class)
    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    public ApiResponse<Void> handleInternalException(final Exception ex) {
        log.error("Was caught exception:", ex);
        return new ApiResponse<Void>()
                .status(ApiResponse.ApiStatus.UNKNOWN_ERROR)
                .message(BaseApiException.DEFAULT_API_EXCEPTION_MESSAGE)
                .technicalMessage(ex.getMessage());
    }

    @ExceptionHandler(ValidationException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public ApiResponse<Void> handleValidationException(final ValidationException ex) {
        log.error("Was caught validation exception:", ex);
        return new ApiResponse<Void>()
                .status(ApiResponse.ApiStatus.VALIDATION_ERROR)
                .message(ex.getLocalizedMessage())
                .errors(ex.getErrors())
                .technicalMessage(ex.getMessage());
    }

    @ExceptionHandler(ResourceNotFoundException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public ApiResponse<Void> handleValidationException(final ResourceNotFoundException ex) {
        log.error("Was caught validation exception:", ex);
        return new ApiResponse<Void>()
                .status(ApiResponse.ApiStatus.VALIDATION_ERROR)
                .message(ex.getLocalizedMessage())
                .technicalMessage(ex.getMessage());
    }
}
