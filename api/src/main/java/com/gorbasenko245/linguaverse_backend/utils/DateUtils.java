package com.gorbasenko245.linguaverse_backend.utils;

import lombok.AccessLevel;
import lombok.NoArgsConstructor;

import java.text.SimpleDateFormat;
import java.time.*;
import java.time.format.DateTimeFormatter;
import java.time.zone.ZoneRulesException;
import java.util.Date;
import java.util.Locale;

@NoArgsConstructor(access = AccessLevel.PRIVATE)
public class DateUtils {

    public static final String ISO8601_DATE_TIME_FORMAT = "yyyy-MM-dd HH:mm Z";
    public static final String DEFAULT_DATE_TIME_FORMAT_WITH_TIME_ZONE = "yyyy-MM-dd'T'HH:mm:ss.SSSSSS";
    public static final String DATE_TIME_HOUR_MINUTE_FORMAT = "yyyy-MM-dd HH:mm";
    public static final String DATE_TIME_HOUR_MINUTE_SECOND_FORMAT = "yyyy-MM-dd HH:mm:ss";
    public static final String ISO_OFFSET_DATE_TIME = "yyyy-MM-dd'T'HH:mm:ssXXX";
    public static final String ISO_LOCAL_DATE_TIME = "yyyy-MM-dd'T'HH:mm:ss";
    public static final String DOT_DATE_FORMAT = "dd.MM.yyyy";
    public static final String HYPHEN_DATE_FORMAT = "yyyy-MM-dd";
    public static final String WORD_DATE_FORMAT = "dd MMMM yyyy";

    public static Date convertLocalDateTimeToDate(final LocalDateTime localDateTime) {
        return Date.from(localDateTime.atZone(ZoneId.systemDefault()).toInstant());
    }

    public static Date convertLocalDateToDate(final LocalDate localDate) {
        return Date.from(localDate.atStartOfDay(ZoneId.systemDefault()).toInstant());
    }

    public static LocalDate convertLocalDateTimeToLocalDate(final LocalDateTime localDateTime) {
        return localDateTime.toLocalDate();
    }

    public static String convertLocalDateToWordDateFormat(final LocalDate localDate, final Locale locale) {
        final DateTimeFormatter formatter = DateTimeFormatter.ofPattern(WORD_DATE_FORMAT, locale);
        return localDate.format(formatter);
    }

    public static LocalDateTime convertDateToLocalDateTime(final Date date) {
        return LocalDateTime.ofInstant(date.toInstant(), ZoneId.systemDefault());
    }

    public static LocalDateTime convertStringToLocalDateTimeWithZone(final String date) {
        final ZonedDateTime zdtWithZoneOffset = ZonedDateTime
                .parse(date, DateTimeFormatter.ofPattern(ISO8601_DATE_TIME_FORMAT));
        final ZonedDateTime zdtInLocalTimeline = zdtWithZoneOffset
                .withZoneSameInstant(ZoneId.systemDefault());
        return zdtInLocalTimeline.toLocalDateTime();
    }

    public static String convertLocalDateTimeToZonedDateTimeString(final LocalDateTime localDateTime) {
        final ZoneId zoneId = ZoneId.of(ZoneId.systemDefault().toString());
        final ZonedDateTime zdt = localDateTime.atZone(zoneId);
        return zdt.format(DateTimeFormatter.ofPattern(ISO8601_DATE_TIME_FORMAT));
    }

    public static String convertLocalDateTimeToZonedDateTimeString(final LocalDateTime localDateTime, final DateTimeFormatter formatter) {
        final ZoneId zoneId = ZoneId.of(ZoneId.systemDefault().toString());
        final ZonedDateTime zdt = localDateTime.atZone(zoneId);
        return zdt.format(formatter);
    }

    public static String convertLocalDateTimeToString(final LocalDateTime localDateTime, final DateTimeFormatter formatter) {
        return localDateTime.format(formatter);
    }

    public static String convertOffsetDateTimeToString(final OffsetDateTime localDateTime, final DateTimeFormatter formatter) {
        return localDateTime.format(formatter);
    }

    public static LocalDateTime convertStringToLocalDateTime(final String localDateTime, final DateTimeFormatter formatter) {
        return LocalDateTime.parse(localDateTime, formatter);
    }

    public static String convertFormattedDateToString(final Date date, final String pattern) {
        return new SimpleDateFormat(pattern).format(date);
    }


    public static String convertLocalDateTimeToZonedDateTimeStringInUTC(final LocalDateTime localDateTime,
                                                                        final DateTimeFormatter formatter,
                                                                        final ZoneId zoneId) {
        final ZonedDateTime zonedDateTime = localDateTime.atZone(zoneId);
        return zonedDateTime.withZoneSameInstant(ZoneId.of("UTC")).format(formatter.withZone(zoneId));
    }
}
