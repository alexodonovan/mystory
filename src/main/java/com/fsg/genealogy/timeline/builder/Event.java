package com.fsg.genealogy.timeline.builder;

import java.util.Date;

import org.springframework.roo.addon.equals.RooEquals;
import org.springframework.roo.addon.javabean.RooJavaBean;
import org.springframework.roo.addon.json.RooJson;
import org.springframework.roo.addon.tostring.RooToString;

@RooJson(deepSerialize = true, toJsonMethod="toJsonExcludeNulls")
@RooJavaBean
@RooEquals
@RooToString
public class Event implements JSON {
				
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

	public Date startDate;
	public Date endDate;
	public String headline = "";
	public String classname = "";
	public String text = "";
	public Asset asset;

	public String toJsonExcludeNulls() {
		return new ExcludeNullJsonSerializer().toJson(this.getClass().getDeclaredFields(), this).deepSerialize(this);
	}

}
