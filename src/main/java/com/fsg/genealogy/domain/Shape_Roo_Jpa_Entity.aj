// WARNING: DO NOT EDIT THIS FILE. THIS FILE IS MANAGED BY SPRING ROO.
// You may push code into the target .java compilation unit if you wish to edit any member(s).

package com.fsg.genealogy.domain;

import com.fsg.genealogy.domain.Shape;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Version;

privileged aspect Shape_Roo_Jpa_Entity {
    
    declare @type: Shape: @Entity;
    
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id")
    private Long Shape.id;
    
    @Version
    @Column(name = "version")
    private Integer Shape.version;
    
    public Long Shape.getId() {
        return this.id;
    }
    
    public void Shape.setId(Long id) {
        this.id = id;
    }
    
    public Integer Shape.getVersion() {
        return this.version;
    }
    
    public void Shape.setVersion(Integer version) {
        this.version = version;
    }
    
}
