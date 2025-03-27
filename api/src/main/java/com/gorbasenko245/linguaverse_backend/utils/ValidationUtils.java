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
 * Date: 02.06.22
 *
 * @author ilia
 */
@NoArgsConstructor(access = AccessLevel.PRIVATE)
public class ValidationUtils {

    private static final Validator javaxValidator =
            Validation.buildDefaultValidatorFactory().usingContext().getValidator();
    private static final String FIELD_PATTERN = "{validatedField}";

    public static <T> void validate(final T validationObject, final Class<?>... clazz) {
        if (Objects.isNull(validationObject)) {
            throw new ValidationException("Validation target can not be null");
        }
        final Set<ConstraintViolation<T>> validationResult = javaxValidator.validate(validationObject, clazz);
        handleValidationResult(validationResult);
    }

    public static <T> void validate(final Collection<T> validationCollection) {
        if (Objects.isNull(validationCollection)) {
            throw new ValidationException("Validation target can not be null");
        }
        validationCollection.forEach(ValidationUtils::validate);
    }

    public static boolean match(final String string, final String regex) {
        final Pattern pattern = Pattern.compile(regex);
        final Matcher matcher = pattern.matcher(string);
        return matcher.matches();
    }

    private static <T> void handleValidationResult(final Set<ConstraintViolation<T>> validationResult) {
        if (Objects.nonNull(validationResult) && !validationResult.isEmpty()) {
            final List<Error> errors = validationResult.stream()
                    .map(ValidationUtils::map)
                    .collect(Collectors.toList());
            throw new ValidationException("Invalid object", errors);
        }
    }

    private static <T> Error map(final ConstraintViolation<T> elem) {
        if (elem == null) {
            throw new ValidationException("ConstraintViolation is null");
        }

        String field = elem.getPropertyPath().toString();
        String message = elem.getMessage();

        return Error.of(field, message);
    }
}
