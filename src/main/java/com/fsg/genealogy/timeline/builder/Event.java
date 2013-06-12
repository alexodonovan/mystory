package com.fsg.genealogy.timeline.builder;

import java.util.Date;

import org.springframework.roo.addon.equals.RooEquals;
import org.springframework.roo.addon.javabean.RooJavaBean;
import org.springframework.roo.addon.json.RooJson;
import org.springframework.roo.addon.tostring.RooToString;

@RooJson(deepSerialize=true) @RooJavaBean @RooEquals @RooToString
public class Event {
	
	public Event() {	
	}
	
	public Event(com.fsg.genealogy.domain.Event entity) {
		this.startDate = entity.getDate();
		this.endDate = entity.getDate();
		this.headline = entity.getTitle();
		this.text = entity.getDescription();
		this.classname = "";
		Asset asset = new Asset();
		asset.setMedia("test");
		this.asset = asset;
	}
	private Date startDate;
	private Date endDate;
	private String headline = "";
	private String classname = "";
	private String text = "";
	private Asset asset;

}
