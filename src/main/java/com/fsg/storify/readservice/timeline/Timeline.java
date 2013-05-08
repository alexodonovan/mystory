package com.fsg.storify.readservice.timeline;

import javax.persistence.Column;
import javax.persistence.OneToOne;

import org.springframework.roo.addon.javabean.RooJavaBean;
import org.springframework.roo.addon.jpa.activerecord.RooJpaActiveRecord;
import org.springframework.roo.addon.json.RooJson;
import org.springframework.roo.addon.tostring.RooToString;

@RooJavaBean
@RooToString
@RooJson
@RooJpaActiveRecord(finders = { "findTimelinesByFamily" })
public class Timeline {

	@OneToOne
    private Family family;

	@Column(columnDefinition="LONGTEXT")
    private String data;
}
