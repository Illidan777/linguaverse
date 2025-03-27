package com.gorbasenko245.linguaverse_backend.domain.exception.common;

import com.gorbasenko245.linguaverse_backend.domain.exception.BaseApiException;

/**
 * Date: 18.06.24
 *
 * @author ilia
 */
public class UnknownException extends BaseApiException {
    public UnknownException(String technicalMessage) {
        super(technicalMessage);
    }
}
