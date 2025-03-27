package com.gorbasenko245.linguaverse_backend.domain.dto.term;

import com.gorbasenko245.linguaverse_backend.domain.dto.IdDto;
import com.gorbasenko245.linguaverse_backend.domain.enums.TermStatus;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@Data
@EqualsAndHashCode(callSuper = false)
@AllArgsConstructor
@NoArgsConstructor
public class TermDto extends IdDto {
    private Long orderNumber;
    private String term;
    private String definition;
    private TermStatus status;

    public TermDto(String term, String definition) {
        this.term = term;
        this.definition = definition;
    }
}
