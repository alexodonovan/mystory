// WARNING: DO NOT EDIT THIS FILE. THIS FILE IS MANAGED BY SPRING ROO.
// You may push code into the target .java compilation unit if you wish to edit any member(s).

package com.fsg.genealogy.timeline.builder;

import com.fsg.genealogy.timeline.builder.Asset;
import com.fsg.genealogy.timeline.builder.Event;

privileged aspect Event_Roo_JavaBean {
    
    public String Event.getStartDate() {
        return this.startDate;
    }
    
    public void Event.setStartDate(String startDate) {
        this.startDate = startDate;
    }
    
    public String Event.getEndDate() {
        return this.endDate;
    }
    
    public void Event.setEndDate(String endDate) {
        this.endDate = endDate;
    }
    
    public String Event.getHeadline() {
        return this.headline;
    }
    
    public void Event.setHeadline(String headline) {
        this.headline = headline;
    }
    
    public String Event.getClassname() {
        return this.classname;
    }
    
    public void Event.setClassname(String classname) {
        this.classname = classname;
    }
    
    public String Event.getText() {
        return this.text;
    }
    
    public void Event.setText(String text) {
        this.text = text;
    }
    
    public Asset Event.getAsset() {
        return this.asset;
    }
    
    public void Event.setAsset(Asset asset) {
        this.asset = asset;
    }
    
}
