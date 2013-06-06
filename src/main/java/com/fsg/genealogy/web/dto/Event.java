package com.fsg.genealogy.web.dto;

import java.util.Date;

import org.springframework.roo.addon.javabean.RooJavaBean;
import org.springframework.roo.addon.json.RooJson;

@RooJavaBean @RooJson
public class Event {
	
	private Long id;
	private String title;
	private String description;
	private String credit;
	private String caption;	
	private Long assetId;
	private Long familyId;
	private Date date;
	
	
	public com.fsg.genealogy.domain.Event toEntity() {
		com.fsg.genealogy.domain.Event entity = 
				new com.fsg.genealogy.domain.Event(title, description, credit, caption, assetId, date);				
		return entity;
	}

}
