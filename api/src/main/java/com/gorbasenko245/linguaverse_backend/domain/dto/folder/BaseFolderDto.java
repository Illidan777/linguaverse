package com.gorbasenko245.linguaverse_backend.domain.dto.folder;

import com.gorbasenko245.linguaverse_backend.domain.dto.IdNameDto;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper = false)
public class BaseFolderDto extends IdNameDto {
    private String updatedAt;
    private Integer modulesCount;
}
