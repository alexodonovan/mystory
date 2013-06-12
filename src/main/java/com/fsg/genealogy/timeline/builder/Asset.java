package com.fsg.genealogy.timeline.builder;

import org.springframework.roo.addon.equals.RooEquals;
import org.springframework.roo.addon.javabean.RooJavaBean;
import org.springframework.roo.addon.json.RooJson;

@RooJson(deepSerialize=true) @RooJavaBean @RooEquals
public class Asset {
	
	private String media;
	private String thumbnail;
	private String caption;
	private String credit;

}
