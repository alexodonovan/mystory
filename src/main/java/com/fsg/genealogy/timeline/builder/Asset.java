package com.fsg.genealogy.timeline.builder;

import org.springframework.roo.addon.equals.RooEquals;
import org.springframework.roo.addon.javabean.RooJavaBean;
import org.springframework.roo.addon.json.RooJson;

@RooJson(deepSerialize=true, toJsonMethod="toJsonExcludeNulls") @RooJavaBean @RooEquals
public class Asset implements JSON {
	
	public ExcludeNullJsonSerializer serializer = new ExcludeNullJsonSerializer();
		
	public String media;
	public String thumbnail;
	public String caption;
	public String credit;
	
	@Override
	public String toJsonExcludeNulls() {
		return this.serializer.toJson(this.getClass().getDeclaredFields(), this).deepSerialize(this);
	}

}
