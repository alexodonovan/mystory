package com.fsg.genealogy.domain;

import org.springframework.roo.addon.javabean.RooJavaBean;
import org.springframework.roo.addon.jpa.activerecord.RooJpaActiveRecord;
import org.springframework.roo.addon.json.RooJson;
import org.springframework.roo.addon.tostring.RooToString;


@RooJavaBean
@RooToString
@RooJpaActiveRecord
@RooJson
public class Event {
	
	private String title;
	private String description;
	private String credit;
	private String caption;	
	private Long assetId;
		
	public Event() {}

	public Event(String title, String description, String credit, String caption, Long assetId) {
		super();
		this.title = title;
		this.description = description;
		this.credit = credit;
		this.caption = caption;
		this.assetId = assetId;
	}

	public void update(String title, String description, String credit, String caption) {
		this.title = title;
		this.description = description;
		this.credit = credit;
		this.caption = caption;
	}
	
	
}
