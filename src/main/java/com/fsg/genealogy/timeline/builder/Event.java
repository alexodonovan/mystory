package com.fsg.genealogy.timeline.builder;

import java.text.SimpleDateFormat;

import org.springframework.roo.addon.equals.RooEquals;
import org.springframework.roo.addon.javabean.RooJavaBean;
import org.springframework.roo.addon.tostring.RooToString;

@RooJavaBean
@RooEquals
@RooToString
public class Event {
				
	public Event() {}

	public Event(com.fsg.genealogy.domain.Event event) {
		this.setAsset(new Asset("asset-images?imgId=164", "asset-images?imgId=164", event.getCaption(), event.getCredit()));
		this.setHeadline(event.getTitle());
		this.setText(event.getDescription());
		
		SimpleDateFormat df = new SimpleDateFormat("yyyy,MM");		
		if (event.getDate()!=null) this.setStartDate(df.format(event.getDate()));
		if (event.getDate()!=null) this.setEndDate(df.format(event.getDate()));	
	}

	public String startDate;
	public String endDate;
	public String headline = "";
	public String classname;
	public String text = "";
	public Asset asset;

}

