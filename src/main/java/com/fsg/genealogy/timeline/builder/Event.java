package com.fsg.genealogy.timeline.builder;

import java.util.Date;

import org.springframework.roo.addon.equals.RooEquals;
import org.springframework.roo.addon.javabean.RooJavaBean;
import org.springframework.roo.addon.tostring.RooToString;

@RooJavaBean
@RooEquals
@RooToString
public class Event {
				
	public Event() {}

	public Event(com.fsg.genealogy.domain.Event event) {
		this.setAsset(new Asset("url of image here", "url of thumbnail here", event.getCaption(), event.getCredit()));
		this.setHeadline(event.getTitle());
		this.setText(event.getDescription());
		this.setStartDate(event.getDate());
		this.setEndDate(event.getDate());
	}

	public Date startDate;
	public Date endDate;
	public String headline = "";
	public String classname = "";
	public String text = "";
	public Asset asset;

}

