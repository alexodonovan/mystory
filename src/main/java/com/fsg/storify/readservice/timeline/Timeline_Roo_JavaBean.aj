// WARNING: DO NOT EDIT THIS FILE. THIS FILE IS MANAGED BY SPRING ROO.
// You may push code into the target .java compilation unit if you wish to edit any member(s).

package com.fsg.storify.readservice.timeline;

import com.fsg.storify.readservice.timeline.Family;
import com.fsg.storify.readservice.timeline.Timeline;

privileged aspect Timeline_Roo_JavaBean {
    
    public Family Timeline.getFamily() {
        return this.family;
    }
    
    public void Timeline.setFamily(Family family) {
        this.family = family;
    }
    
    public String Timeline.getData() {
        return this.data;
    }
    
    public void Timeline.setData(String data) {
        this.data = data;
    }
    
}