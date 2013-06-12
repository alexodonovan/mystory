package com.fsg.genealogy.timeline.builder;

import org.springframework.roo.addon.equals.RooEquals;
import org.springframework.roo.addon.javabean.RooJavaBean;
import org.springframework.roo.addon.json.RooJson;

@RooJson(deepSerialize=true, toJsonMethod="toJsonExcludeNulls") @RooJavaBean @RooEquals
public class Timeline implements JSON {
		
	public Timeline(Title title) {
		this.timeline = title;
	}

	public Title timeline;		
	
	@Override
	public String toJsonExcludeNulls() {
		return new ExcludeNullJsonSerializer().toJson(this.getClass().getDeclaredFields(), this).deepSerialize(this);
	}

}
