package com.gorbasenko245.linguaverse_backend.domain.exception;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


/**
 * Represents an error detail with a field and a message key.
 * This class is used to encapsulate specific error information, such as the field
 * associated with the error and the corresponding message key for localization.
 */
@NoArgsConstructor
@AllArgsConstructor(staticName = "of")
@Data(staticConstructor = "of")
public class Error {

    /**
     * The field associated with the error. This typically represents a form field or a specific part
     * of the object that caused the error.
     */
    private String field;

    /**
     * The message key used to retrieve the localized error message.
     * This key corresponds to an entry in the localization system (e.g., properties file).
     */
    private String messageKey;
}
