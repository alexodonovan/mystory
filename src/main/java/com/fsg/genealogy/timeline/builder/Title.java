package com.fsg.genealogy.timeline.builder;

import java.util.ArrayList;
import java.util.List;

import org.springframework.roo.addon.equals.RooEquals;
import org.springframework.roo.addon.javabean.RooJavaBean;

@RooJavaBean @RooEquals
public class Title extends Event {
	
	public String type="timeline";
	public List<Event> date;
	
	public Title(com.fsg.genealogy.domain.Event event, List<com.fsg.genealogy.domain.Event> entities) {
		super.setAsset(new Asset("url of image here", "url of thumbnail here", event.getCaption(), event.getCredit()));
		super.setHeadline(event.getTitle());
		super.setText(event.getDescription());		
		
		List<Event> events = new ArrayList<Event>();
		for (com.fsg.genealogy.domain.Event entity: entities){			
			events.add(new Event(entity));
		}
		this.date = events;
	}

	public Title() {
		super();
		this.date = new ArrayList<Event>();
	}	

}
