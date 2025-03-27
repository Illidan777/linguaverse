package com.gorbasenko245.linguaverse_backend.utils;

import lombok.AccessLevel;
import lombok.NoArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import java.util.Locale;

@Slf4j
@NoArgsConstructor(access = AccessLevel.PRIVATE)
public class LocalizationUtils {

    public static final Locale DEFAULT_LOCALE = Locale.ENGLISH;

    @NoArgsConstructor(access = AccessLevel.PRIVATE)
    public static class App {
        @NoArgsConstructor(access = AccessLevel.PRIVATE)
        public static class Exception {
            public static final String DEFAULT_API_EXCEPTION_MESSAGE = "app.error.unknown";
        }
    }
}
