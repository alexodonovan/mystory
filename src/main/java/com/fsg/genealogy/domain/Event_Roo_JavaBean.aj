// WARNING: DO NOT EDIT THIS FILE. THIS FILE IS MANAGED BY SPRING ROO.
// You may push code into the target .java compilation unit if you wish to edit any member(s).

package com.fsg.genealogy.domain;

import com.fsg.genealogy.domain.Event;
import java.util.Date;

privileged aspect Event_Roo_JavaBean {
    
    public String Event.getTitle() {
        return this.title;
    }
    
    public void Event.setTitle(String title) {
        this.title = title;
    }
    
    public String Event.getDescription() {
        return this.description;
    }
    
    public void Event.setDescription(String description) {
        this.description = description;
    }
    
    public String Event.getCredit() {
        return this.credit;
    }
    
    public void Event.setCredit(String credit) {
        this.credit = credit;
    }
    
    public String Event.getCaption() {
        return this.caption;
    }
    
    public void Event.setCaption(String caption) {
        this.caption = caption;
    }
    
    public String Event.getUrl() {
        return this.url;
    }
    
    public void Event.setUrl(String url) {
        this.url = url;
    }
    
    public Long Event.getAssetId() {
        return this.assetId;
    }
    
    public void Event.setAssetId(Long assetId) {
        this.assetId = assetId;
    }
    
    public Date Event.getDate() {
        return this.date;
    }
    
    public void Event.setDate(Date date) {
        this.date = date;
    }
    
}
