package com.gorbasenko245.linguaverse_backend.domain.dto.folder;

import com.gorbasenko245.linguaverse_backend.domain.dto.module.BaseModuleDto;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.util.ArrayList;
import java.util.List;

@Data
@EqualsAndHashCode(callSuper = false)
public class FolderDto extends BaseFolderDto {
    public List<BaseModuleDto> modules = new ArrayList<>();
}
