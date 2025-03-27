package com.gorbasenko245.linguaverse_backend.domain.dto;

import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@Data
@EqualsAndHashCode(callSuper = false)
@NoArgsConstructor
public class IdNameDto extends IdDto {
    private String name;

    public IdNameDto(Long id, String name) {
        super(id);
        this.name = name;
    }
}
