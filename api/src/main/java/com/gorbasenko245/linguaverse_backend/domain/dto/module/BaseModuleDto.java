package com.gorbasenko245.linguaverse_backend.domain.dto.module;

import com.gorbasenko245.linguaverse_backend.domain.dto.IdNameDto;
import com.gorbasenko245.linguaverse_backend.domain.enums.ModuleStatus;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.util.ArrayList;
import java.util.List;

@Data
@EqualsAndHashCode(callSuper = false)
public class BaseModuleDto extends IdNameDto {
    private Integer termsCount;
    private String description;
    private String createdAt;
    private ModuleStatus status;
    private Boolean followProgress;
    private List<IdNameDto> folders = new ArrayList<>();
}
