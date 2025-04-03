package com.gorbasenko245.linguaverse_backend.domain.dto.term;

import com.gorbasenko245.linguaverse_backend.domain.dto.IdDto;
import com.gorbasenko245.linguaverse_backend.domain.enums.TermStatus;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

/**
 * Data Transfer Object (DTO) that represents a term with associated properties.
 * <p>
 * This class is used to transfer data related to a term, including its identifier, order number,
 * term text, definition, and status. It extends {@link IdDto} and provides additional fields
 * specific to a term.
 * </p>
 */
@Data
@EqualsAndHashCode(callSuper = false)
@AllArgsConstructor
@NoArgsConstructor
public class TermDto extends IdDto {

    /**
     * The order number of the term in the sequence.
     * <p>
     * This field indicates the position of the term within a sequence or list of terms.
     * It is used to manage the ordering of terms, particularly when displaying or processing terms.
     * </p>
     */
    private Long orderNumber;

    /**
     * The term word.
     * <p>
     * This field holds the actual term (word) that is being defined or practiced.
     * It is a key component of the term entity, representing the word to be learned or studied.
     * </p>
     */
    private String term;

    /**
     * The definition of the term.
     * <p>
     * This field contains the definition or explanation of the term. It provides context or meaning
     * for the term represented by the {@code term} field.
     * </p>
     */
    private String definition;

    /**
     * The status of the term.
     * <p>
     * This field represents the current status of the term, indicating whether the term has been
     * learned, is in progress, or has not started. The {@link TermStatus} enum defines the possible statuses.
     * </p>
     */
    private TermStatus status;
}
