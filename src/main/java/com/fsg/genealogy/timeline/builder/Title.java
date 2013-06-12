package com.fsg.genealogy.timeline.builder;

import java.util.Collection;

import org.springframework.roo.addon.equals.RooEquals;
import org.springframework.roo.addon.javabean.RooJavaBean;
import org.springframework.roo.addon.json.RooJson;

@RooJson(deepSerialize=true) @RooJavaBean @RooEquals
public class Title extends Event {
	
	private String type="timeline";
	private Collection<Event> date;
	

}
