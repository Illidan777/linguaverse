package com.gorbasenko245.linguaverse_backend.domain.api;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.gorbasenko245.linguaverse_backend.domain.exception.common.ValidationException;
import com.gorbasenko245.linguaverse_backend.domain.exception.Error;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
@NoArgsConstructor
public class ApiResponse<T> {

    private String technicalMessage;
    private String message;
    private ApiStatus status;
    private T body;
    private List<Error> errors = new ArrayList<>();

    public ApiResponse<T> body(T body) {
        this.body = body;
        return this;
    }

    public ApiResponse<T> errors(List<Error> errors) {
        this.errors = errors;
        return this;
    }

    public ApiResponse<T> message(String message) {
        this.message = message;
        return this;
    }

    public ApiResponse<T> status(ApiStatus status) {
        this.status = status;
        return this;
    }

    public ApiResponse<T> technicalMessage(String technicalMessage) {
        this.technicalMessage = technicalMessage;
        return this;
    }

    public enum ApiStatus {
        OK,
        VALIDATION_ERROR,
        NOT_FOUND,
        UNKNOWN_ERROR,
    }
}
