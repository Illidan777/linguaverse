package com.gorbasenko245.linguaverse_backend.utils;

import com.gorbasenko245.linguaverse_backend.domain.exception.common.ValidationException;
import com.gorbasenko245.linguaverse_backend.domain.exception.Error;
import jakarta.validation.ConstraintViolation;
import jakarta.validation.Validation;
import jakarta.validation.Validator;
import lombok.AccessLevel;
import lombok.NoArgsConstructor;

import java.util.Collection;
import java.util.List;
import java.util.Objects;
import java.util.Set;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
import java.util.stream.Collectors;

/**
 * Utility class for validation operations using Javax Validator.
 * This class is designed to be non-instantiable.
 */
@NoArgsConstructor(access = AccessLevel.PRIVATE)
public class ValidationUtils {

    /**
     * Javax Validator instance for validating objects.
     */
    private static final Validator javaxValidator =
            Validation.buildDefaultValidatorFactory().usingContext().getValidator();

    /**
     * Validates an object using the specified validation groups.
     *
     * @param validationObject The object to validate.
     * @param clazz            The validation groups.
     * @param <T>              The type of the object to validate.
     * @throws ValidationException If validation fails or if the object is null.
     */
    public static <T> void validate(final T validationObject, final Class<?>... clazz) {
        if (Objects.isNull(validationObject)) {
            throw new ValidationException("Validation target can not be null");
        }
        final Set<ConstraintViolation<T>> validationResult = javaxValidator.validate(validationObject, clazz);
        handleValidationResult(validationResult);
    }

    /**
     * Processes validation results and throws an exception if errors are found.
     *
     * @param validationResult The set of validation violations.
     * @param <T>              The type of the validated object.
     * @throws ValidationException If there are validation errors.
     */
    private static <T> void handleValidationResult(final Set<ConstraintViolation<T>> validationResult) {
        if (Objects.nonNull(validationResult) && !validationResult.isEmpty()) {
            final List<Error> errors = validationResult.stream()
                    .map(ValidationUtils::map)
                    .collect(Collectors.toList());
            throw new ValidationException("Invalid object", errors);
        }
    }

    /**
     * Maps a {@link ConstraintViolation} to an {@link Error} object.
     *
     * @param elem The constraint violation to map.
     * @param <T>  The type of the validated object.
     * @return An {@link Error} instance containing the field and message.
     * @throws ValidationException If the constraint violation is null.
     */
    private static <T> Error map(final ConstraintViolation<T> elem) {
        if (elem == null) {
            throw new ValidationException("ConstraintViolation is null");
        }

        String field = elem.getPropertyPath().toString();
        String message = elem.getMessage();

        return Error.of(field, message);
    }
}
