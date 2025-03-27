package com.gorbasenko245.linguaverse_backend.domain.request;

import lombok.Data;

@Data
public class UpdateModuleRequest {
    private String name;
    private String description;
}
