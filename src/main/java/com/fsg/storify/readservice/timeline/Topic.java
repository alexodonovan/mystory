package com.fsg.storify.readservice.timeline;

import java.util.Collection;

import javax.persistence.OneToMany;

import org.springframework.roo.addon.javabean.RooJavaBean;
import org.springframework.roo.addon.jpa.activerecord.RooJpaActiveRecord;
import org.springframework.roo.addon.tostring.RooToString;

@RooJavaBean
@RooToString
@RooJpaActiveRecord
public class Topic {
	
	private String headline = "";
	private String type = "default";
	private String text = "";
	private String startDate;
	private String endDate;
	
	@OneToMany
	private Collection<DateTopic> date;
}
