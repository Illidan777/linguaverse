package com.gorbasenko245.linguaverse_backend.domain.exception.common;

import com.gorbasenko245.linguaverse_backend.domain.exception.BaseApiException;

import java.util.Collection;

/**
 * Date: 02.06.22
 *
 * @author ilia
 */
public class AlreadyExistException extends BaseApiException {

    public AlreadyExistException(String technicalMessage, String localizedMessage, Collection<Object> args) {
        super(technicalMessage, localizedMessage, args);
    }

    public AlreadyExistException(String technicalMessage, String localizedMessage, boolean localized) {
        super(technicalMessage, localizedMessage, localized);
    }
}
