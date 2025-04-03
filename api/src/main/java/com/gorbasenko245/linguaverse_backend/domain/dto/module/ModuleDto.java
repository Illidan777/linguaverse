package com.gorbasenko245.linguaverse_backend.domain.dto.module;

import com.gorbasenko245.linguaverse_backend.domain.dto.term.TermDto;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.util.ArrayList;
import java.util.List;

/**
 * Data Transfer Object (DTO) that represents a module, extending from {@link BaseModuleDto}.
 * <p>
 * This class is used to transfer data related to a module, including its terms. It builds upon the
 * {@link BaseModuleDto} by adding the terms associated with the module, providing a more detailed
 * representation of the module's content.
 * </p>
 */
@Data
@EqualsAndHashCode(callSuper = false)
public class ModuleDto extends BaseModuleDto {

    /**
     * A list of terms associated with the module.
     * <p>
     * This field contains a list of {@link TermDto} objects, each representing a term within the module.
     * These terms include details such as their order number, term, definition, and status.
     * </p>
     */
    private List<TermDto> terms = new ArrayList<>();
}
