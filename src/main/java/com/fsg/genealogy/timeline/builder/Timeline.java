package com.fsg.genealogy.timeline.builder;

import org.springframework.roo.addon.equals.RooEquals;
import org.springframework.roo.addon.javabean.RooJavaBean;
import org.springframework.roo.addon.json.RooJson;

@RooJson(deepSerialize=true, toJsonMethod="toJsonExcludeNulls") @RooJavaBean @RooEquals
public class Timeline {
		
	public Timeline(Title title) {
		this.timeline = title;
	}

	public Title timeline;		
	
}
