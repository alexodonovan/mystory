package com.fsg.genealogy.domain;

import java.util.Collection;

import org.springframework.roo.addon.javabean.RooJavaBean;
import org.springframework.roo.addon.tostring.RooToString;

@RooJavaBean
@RooToString
public class Topic {
	
	private String headline = "";
	private String type = "default";
	private String text = "";
	private String startDate;
	private String endDate;
		
	private Collection<DateTopic> date;
}
