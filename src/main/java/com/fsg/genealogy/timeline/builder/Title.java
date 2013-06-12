package com.fsg.genealogy.timeline.builder;

import java.util.Collection;

import org.springframework.roo.addon.equals.RooEquals;
import org.springframework.roo.addon.javabean.RooJavaBean;
import org.springframework.roo.addon.json.RooJson;

@RooJson(deepSerialize=true, toJsonMethod="toJsonExcludeNulls") @RooJavaBean @RooEquals
public class Title extends Event implements com.fsg.genealogy.timeline.builder.JSON {
	
	public String type="timeline";
	public Collection<Event> date;
	
	@Override
	public String toJsonExcludeNulls() {
		return new ExcludeNullJsonSerializer().toJson(this.getClass().getDeclaredFields(), this).deepSerialize(this);
	}
	

}
