package com.fsg.genealogy.domain;

import java.util.Date;

import org.springframework.roo.addon.equals.RooEquals;
import org.springframework.roo.addon.javabean.RooJavaBean;
import org.springframework.roo.addon.jpa.activerecord.RooJpaActiveRecord;
import org.springframework.roo.addon.json.RooJson;
import org.springframework.roo.addon.tostring.RooToString;


@RooJavaBean
@RooToString
@RooJpaActiveRecord
@RooJson
@RooEquals
public class Event {
	
	private String title;
	private String description;
	private String credit;
	private String caption;	
	private Long assetId;
	private Date date;
		
	public Event() {}

	public Event(String title, String description, String credit, String caption, Long assetId, Date date) {
		super();
		this.title = title;
		this.description = description;
		this.credit = credit;
		this.caption = caption;
		this.assetId = assetId;
		this.date = date;
	}

	public void update(String title, String description, 
			String credit, String caption,
			Date date, Long assetId) {
		this.title = title;
		this.description = description;
		this.credit = credit;
		this.caption = caption;
		this.date = date;
		this.assetId = assetId;
	}
	
	
}
