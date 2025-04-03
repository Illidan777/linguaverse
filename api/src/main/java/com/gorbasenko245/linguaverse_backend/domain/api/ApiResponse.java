package com.gorbasenko245.linguaverse_backend.domain.api;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.gorbasenko245.linguaverse_backend.domain.exception.common.ValidationException;
import com.gorbasenko245.linguaverse_backend.domain.exception.Error;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

/**
 * Represents a standard API response structure with support for various response types.
 * The response includes a message, a technical message, a status, optional body data,
 * and a list of errors if any exist.
 *
 * @param <T> The type of the body data that will be included in the response.
 */
@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
@NoArgsConstructor
public class ApiResponse<T> {

    /**
     * A technical message that provides internal details or specific error codes,
     * useful for debugging purposes.
     */
    private String technicalMessage;

    /**
     * A general message intended for the end user, describing the result of the API call.
     */
    private String message;

    /**
     * The status of the API response, indicating whether the operation was successful
     * or if there were any errors (e.g., validation errors, not found errors).
     */
    private ApiStatus status;

    /**
     * The body of the response, which can contain any type of data (e.g., a list, an object).
     * This field can be null if no body is returned.
     */
    private T body;

    /**
     * A list of errors that may have occurred during the API call. This list is populated
     * only in the case of errors (e.g., validation errors).
     */
    private List<Error> errors = new ArrayList<>();

    /**
     * Sets the body of the response and returns the updated ApiResponse object.
     *
     * @param body The body content to include in the response.
     * @return The ApiResponse instance with the set body.
     */
    public ApiResponse<T> body(T body) {
        this.body = body;
        return this;
    }

    /**
     * Sets the errors for the response and returns the updated ApiResponse object.
     *
     * @param errors A list of errors that occurred during the operation.
     * @return The ApiResponse instance with the set errors.
     */
    public ApiResponse<T> errors(List<Error> errors) {
        this.errors = errors;
        return this;
    }

    /**
     * Sets the message for the response and returns the updated ApiResponse object.
     *
     * @param message The general message to include in the response.
     * @return The ApiResponse instance with the set message.
     */
    public ApiResponse<T> message(String message) {
        this.message = message;
        return this;
    }

    /**
     * Sets the status of the API response and returns the updated ApiResponse object.
     *
     * @param status The status to indicate the outcome of the API call (e.g., OK, ERROR).
     * @return The ApiResponse instance with the set status.
     */
    public ApiResponse<T> status(ApiStatus status) {
        this.status = status;
        return this;
    }

    /**
     * Sets the technical message for the response and returns the updated ApiResponse object.
     *
     * @param technicalMessage The technical message containing details for debugging.
     * @return The ApiResponse instance with the set technical message.
     */
    public ApiResponse<T> technicalMessage(String technicalMessage) {
        this.technicalMessage = technicalMessage;
        return this;
    }

    /**
     * Enum representing the possible statuses of the API response.
     * Includes:
     * - OK: Operation was successful.
     * - VALIDATION_ERROR: There was a validation error in the request.
     * - NOT_FOUND: The requested resource was not found.
     * - UNKNOWN_ERROR: An unexpected error occurred.
     */
    public enum ApiStatus {
        OK,               // Successful operation.
        VALIDATION_ERROR, // Validation error occurred (e.g., invalid input).
        NOT_FOUND,        // Resource not found (e.g., invalid ID).
        UNKNOWN_ERROR,    // An unknown error occurred.
    }
}
