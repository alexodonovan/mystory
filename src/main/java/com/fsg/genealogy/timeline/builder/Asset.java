package com.fsg.genealogy.timeline.builder;

import org.springframework.roo.addon.equals.RooEquals;
import org.springframework.roo.addon.javabean.RooJavaBean;
import org.springframework.roo.addon.json.RooJson;

@RooJson(deepSerialize=true, toJsonMethod="toJsonExcludeNulls") @RooJavaBean @RooEquals 
public class Asset {
			
	public String media;
	public String thumbnail;
	public String caption;
	public String credit;
	
	public Asset(String media, String thumbnail, String caption, String credit) {
		super();
		this.media = media;
		this.thumbnail = thumbnail;
		this.caption = caption;
		this.credit = credit;
	}	
	
	

}
