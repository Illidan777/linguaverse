package com.gorbasenko245.linguaverse_backend.domain.exception.common;

import com.gorbasenko245.linguaverse_backend.domain.exception.BaseApiException;


/**
 * Exception thrown when an unknown error occurs.
 * <p>
 * This custom exception extends {@link BaseApiException} to represent
 * errors that do not fit into predefined categories, allowing for generic
 * error handling when an unexpected issue arises.
 * </p>
 *
 * @see BaseApiException
 */
public class UnknownException extends BaseApiException {

    /**
     * Constructs a new UnknownException with the specified technical message.
     * <p>
     * This constructor is used when an unknown error occurs and provides
     * a detailed technical message for developers to troubleshoot the issue.
     * </p>
     *
     * @param technicalMessage the technical message describing the error in detail
     */
    public UnknownException(String technicalMessage) {
        super(technicalMessage);
    }
}
