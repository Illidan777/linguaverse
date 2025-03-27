package com.gorbasenko245.linguaverse_backend.domain.exception;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * Date: 13.05.24
 *
 * @author ilia
 */
@NoArgsConstructor
@AllArgsConstructor(staticName = "of")
@Data(staticConstructor = "of")
public class Error {
    private String field;
    private String messageKey;
}
