package com.gorbasenko245.linguaverse_backend.domain.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.EqualsAndHashCode;
import org.hibernate.annotations.CreationTimestamp;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDateTime;

@Data
@EqualsAndHashCode(callSuper = false)
@EntityListeners(AuditingEntityListener.class)
@MappedSuperclass
public class AuditableEntity extends PersistenceObject{

    @CreationTimestamp
    @Basic
    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @CreationTimestamp
    @Basic
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;
}
