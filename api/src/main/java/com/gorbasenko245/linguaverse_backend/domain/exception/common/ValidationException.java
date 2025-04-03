package com.gorbasenko245.linguaverse_backend.domain.exception.common;

import com.gorbasenko245.linguaverse_backend.domain.exception.ErrorListException;
import com.gorbasenko245.linguaverse_backend.domain.exception.Error;

import java.util.Collection;
import java.util.List;

/**
 * Exception thrown when validation errors occur.
 * <p>
 * This custom exception extends {@link ErrorListException} and is used
 * to represent errors related to invalid input or failed validation checks.
 * It can hold a list of validation errors, allowing for detailed error reporting
 * in cases where multiple issues need to be communicated at once.
 * </p>
 *
 * @see ErrorListException
 */
public class ValidationException extends ErrorListException {

    /**
     * Constructs a new ValidationException with the specified technical message
     * and a list of validation errors.
     * <p>
     * This constructor is typically used when there are multiple validation errors
     * that need to be reported. The technical message provides details about the
     * context of the exception, while the list of errors provides the specific
     * validation failures.
     * </p>
     *
     * @param technicalMessage the technical message describing the context of the exception
     * @param errors a list of {@link Error} objects representing individual validation errors
     */
    public ValidationException(String technicalMessage, List<Error> errors) {
        super(technicalMessage, errors);
    }

    /**
     * Constructs a new ValidationException with the specified technical message.
     * <p>
     * This constructor is used when only a technical message is available,
     * typically for simple validation error reporting without detailed error details.
     * </p>
     *
     * @param technicalMessage the technical message describing the context of the exception
     */
    public ValidationException(String technicalMessage) {
        super(technicalMessage);
    }

    /**
     * Constructs a new ValidationException with the specified technical message
     * and a localized message for end-users.
     * <p>
     * This constructor is used when both a detailed technical message for developers
     * and a user-friendly message for display are needed.
     * </p>
     *
     * @param technicalMessage the technical message describing the context of the exception
     * @param localizedMessage the user-friendly message for display
     */
    public ValidationException(String technicalMessage, String localizedMessage) {
        super(technicalMessage, localizedMessage);
    }
}
