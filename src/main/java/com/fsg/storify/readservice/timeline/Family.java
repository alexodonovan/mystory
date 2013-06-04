package com.fsg.storify.readservice.timeline;

import org.springframework.roo.addon.javabean.RooJavaBean;
import org.springframework.roo.addon.jpa.activerecord.RooJpaActiveRecord;
import org.springframework.roo.addon.tostring.RooToString;

@RooJavaBean
@RooToString
@RooJpaActiveRecord(finders = { "findFamilysByAltSurnamesLike", "findFamilysBySurnameLike" })
public class Family {

    private String surname;
   
    private String altSurnames;
}
