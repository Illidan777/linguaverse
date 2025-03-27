package com.gorbasenko245.linguaverse_backend.domain.dto.module;

import com.gorbasenko245.linguaverse_backend.domain.dto.term.TermDto;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.util.ArrayList;
import java.util.List;

@Data
@EqualsAndHashCode(callSuper = false)
public class ModuleDto extends BaseModuleDto {
    private List<TermDto> terms = new ArrayList<>();
}
