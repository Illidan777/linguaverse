package com.gorbasenko245.linguaverse_backend.api.controller;

import com.gorbasenko245.linguaverse_backend.domain.api.ApiResponse;
import com.gorbasenko245.linguaverse_backend.domain.dto.module.BaseModuleDto;
import com.gorbasenko245.linguaverse_backend.domain.dto.module.ModuleDto;
import com.gorbasenko245.linguaverse_backend.domain.dto.practice.UserPracticeDto;
import com.gorbasenko245.linguaverse_backend.domain.dto.term.TermDto;
import com.gorbasenko245.linguaverse_backend.domain.enums.PracticeType;
import com.gorbasenko245.linguaverse_backend.domain.request.UpdateModuleRequest;
import com.gorbasenko245.linguaverse_backend.service.IModuleService;
import com.gorbasenko245.linguaverse_backend.service.IPracticeService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RequiredArgsConstructor
@RequestMapping("/module")
@RestController
public class ModuleController {

    private final IModuleService moduleService;
    private final IPracticeService practiceService;

    @PostMapping
    public ApiResponse<BaseModuleDto> createModule() {
        log.info("[ModuleController] Creating module.");
        final BaseModuleDto result = moduleService.createModule();
        log.info("[ModuleController] Module has been created. Id: {}", result.getId());
        return new ApiResponse<BaseModuleDto>()
                .body(result)
                .status(ApiResponse.ApiStatus.OK)
                .message("OK");
    }

    @GetMapping
    public ApiResponse<List<BaseModuleDto>> getAllModules(@RequestParam(required = false) String name) {
        log.info("[ModuleController] Getting all modules. {}", name);
        final List<BaseModuleDto> result = moduleService.getAllModules(name);
        log.info("[ModuleController] All modules have been received. Size: {}", result.size());
        return new ApiResponse<List<BaseModuleDto>>()
                .body(result)
                .status(ApiResponse.ApiStatus.OK)
                .message("OK");
    }

    @GetMapping("/{id}")
    public ApiResponse<ModuleDto> getModuleById(@PathVariable("id") Long id) {
        log.info("[ModuleController] Getting module by id. {}", id);
        final ModuleDto result = moduleService.getModuleById(id);
        log.info("[ModuleController] Module by id has been received. Id: {}", result.getId());
        return new ApiResponse<ModuleDto>()
                .body(result)
                .status(ApiResponse.ApiStatus.OK)
                .message("OK");
    }

    @DeleteMapping("/{id}")
    public ApiResponse<Void> deleteModuleById(@PathVariable("id") Long id) {
        log.info("[ModuleController] Deleting module by id. {}", id);
        moduleService.deleteById(id);
        log.info("[ModuleController] Module by id has been deleted. Id: {}", id);
        return new ApiResponse<Void>()
                .status(ApiResponse.ApiStatus.OK)
                .message("Ok");
    }

    @PutMapping("/{id}")
    public ApiResponse<ModuleDto> updateModuleById(@PathVariable("id") Long id,
                                                   @RequestBody UpdateModuleRequest request) {
        log.info("[ModuleController] Updating module by id. {}", id);
        final ModuleDto result = moduleService.updateModule(id, request);
        log.info("[ModuleController] Module by id has been updated. Id: {}", id);
        return new ApiResponse<ModuleDto>()
                .body(result)
                .status(ApiResponse.ApiStatus.OK)
                .message("OK");
    }

    @PatchMapping("/{id}/activate")
    public ApiResponse<BaseModuleDto> activateModule(@PathVariable("id") Long id) {
        log.info("[ModuleController] Activating module by id. {}", id);
        final BaseModuleDto result = moduleService.activateModule(id);
        log.info("[ModuleController] Module by id has been activated. Id: {}", id);
        return new ApiResponse<BaseModuleDto>()
                .body(result)
                .status(ApiResponse.ApiStatus.OK)
                .message("OK");
    }

    @GetMapping("/{id}/term")
    public ApiResponse<List<TermDto>> getModuleTerms(@PathVariable("id") Long id) {
        log.info("[ModuleController] Getting terms in module. Id: {}", id);
        final List<TermDto> result = moduleService.getModuleTerms(id);
        log.info("[ModuleController] Term in module {} has been gotten. Size: {}", id, result.size());
        return new ApiResponse<List<TermDto>>()
                .body(result)
                .status(ApiResponse.ApiStatus.OK)
                .message("OK");
    }

    @PostMapping("/{id}/term")
    public ApiResponse<TermDto> createTerm(@PathVariable("id") Long id,
                                           @RequestParam(required = false) Long orderNumber) {
        log.info("[ModuleController] Creating term in module. Id: {}", id);
        final TermDto result = moduleService.createTermInModule(id, orderNumber);
        log.info("[ModuleController] Term in module {} has been created. Term Id: {}", id, result.getId());
        return new ApiResponse<TermDto>()
                .body(result)
                .status(ApiResponse.ApiStatus.OK)
                .message("OK");
    }

    @PutMapping("/{id}/term/{termId}")
    public ApiResponse<TermDto> updatedTerm(@PathVariable("id") Long id,
                                            @PathVariable("termId") Long termId,
                                            @RequestBody TermDto request) {
        log.info("[ModuleController] Updating term in module. Id: {}, termId: {}", id, termId);
        final TermDto result = moduleService.updateTermInModule(id, termId, request);
        log.info("[ModuleController] Term in module {} has been updated. Term Id: {}", id, result.getId());
        return new ApiResponse<TermDto>()
                .body(result)
                .status(ApiResponse.ApiStatus.OK)
                .message("OK");
    }

    @DeleteMapping("/{id}/term/{termId}")
    public ApiResponse<Void> deleteTerm(@PathVariable("id") Long id,
                                        @PathVariable("termId") Long termId) {
        log.info("[ModuleController] Deleting term in module. Id: {}, termId: {}", id, termId);
        moduleService.deleteTermInModule(id, termId);
        log.info("[ModuleController] Term in module {} has been deleted. Term Id: {}", id, termId);
        return new ApiResponse<Void>()
                .status(ApiResponse.ApiStatus.OK)
                .message("OK");
    }

    @PatchMapping("/{id}/term/shuffle")
    public ApiResponse<Void> shuffleTerms(@PathVariable("id") Long id) {
        log.info("[ModuleController] Shuffling terms in module. Id: {}", id);
        moduleService.shuffleTermsInModule(id);
        log.info("[ModuleController] Term in module {} has been shuffled.", id);
        return new ApiResponse<Void>()
                .status(ApiResponse.ApiStatus.OK)
                .message("OK");
    }

    @GetMapping("/{id}/practice/{type}")
    public ApiResponse<UserPracticeDto> getModuleUserPractice(@PathVariable("id") Long moduleId,
                                                              @PathVariable("type") PracticeType type) {
        log.info("[PracticeController] Getting practice by moduleId. {}", moduleId);
        final UserPracticeDto result = practiceService.getUserPracticeByModuleId(moduleId);
        log.info("[PracticeController] Practice by moduleId has been received. Module id: {}", moduleId);
        return new ApiResponse<UserPracticeDto>()
                .body(result)
                .status(ApiResponse.ApiStatus.OK)
                .message("OK");
    }

    @PatchMapping("/{id}/practice/follow-progress")
    public ApiResponse<Void> toggleFollowProgress(@PathVariable("id") Long moduleId) {
        log.info("[PracticeController] Toggling follow progress by moduleId. {}", moduleId);
        practiceService.toggleFollowProgress(moduleId);
        log.info("[PracticeController] Practice by moduleId has been updated, follow progress toggled. Id: {}", moduleId);
        return new ApiResponse<Void>()
                .status(ApiResponse.ApiStatus.OK)
                .message("OK");
    }

    @PatchMapping("/{id}/practice/term/{termId}")
    public ApiResponse<Void> updateTermStatus(@PathVariable("id") Long id,
                                              @PathVariable("termId") Long termId,
                                              @RequestParam(defaultValue = "false") Boolean learned,
                                              @RequestParam(defaultValue = "0") Long currentIndex) {
        log.info("[PracticeController] Updating term status in module. Id: {}. Term id: {}", id, termId);
        practiceService.updateTermStatus(id, termId, learned, currentIndex);
        log.info("[PracticeController] Term status in module {} has been updated. Term id: {}", id, termId);
        return new ApiResponse<Void>()
                .status(ApiResponse.ApiStatus.OK)
                .message("OK");
    }

    @PatchMapping("/{id}/practice/reset")
    public ApiResponse<Void> resetPractice(@PathVariable("id") Long id) {
        log.info("[PracticeController] Reseting practice in module. Id: {}.", id);
        practiceService.resetPractice(id);
        log.info("[PracticeController] Practice in module {} has been resetted.", id);
        return new ApiResponse<Void>()
                .status(ApiResponse.ApiStatus.OK)
                .message("OK");
    }
}
