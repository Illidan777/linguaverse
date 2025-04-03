package com.gorbasenko245.linguaverse_backend.utils;

import lombok.AccessLevel;
import lombok.NoArgsConstructor;

import java.text.SimpleDateFormat;
import java.time.*;
import java.time.format.DateTimeFormatter;
import java.time.zone.ZoneRulesException;
import java.util.Date;
import java.util.Locale;

/**
 * Utility class for handling date and time conversions.
 * This class provides helper methods for working with {@link LocalDateTime}.
 * It is designed to be non-instantiable.
 */
@NoArgsConstructor(access = AccessLevel.PRIVATE)
public class DateUtils {

    /**
     * Default date-time format pattern: {@code yyyy-MM-dd HH:mm:ss}.
     */
    public static final String DATE_TIME_HOUR_MINUTE_SECOND_FORMAT = "yyyy-MM-dd HH:mm:ss";

    /**
     * Converts a {@link LocalDateTime} to a formatted string using the given {@link DateTimeFormatter}.
     *
     * @param localDateTime The {@link LocalDateTime} instance to format.
     * @param formatter     The {@link DateTimeFormatter} to use for formatting.
     * @return A formatted date-time string.
     * @throws NullPointerException If {@code localDateTime} or {@code formatter} is null.
     */
    public static String convertLocalDateTimeToString(final LocalDateTime localDateTime, final DateTimeFormatter formatter) {
        return localDateTime.format(formatter);
    }
}
