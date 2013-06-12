package com.fsg.genealogy.timeline.builder;

import java.util.ArrayList;
import java.util.Collection;

import com.fsg.genealogy.domain.Event;

public class Builder {

	public String toJson(Collection<Event> entities) {
		
		Collection<com.fsg.genealogy.timeline.builder.Event> events = new ArrayList<com.fsg.genealogy.timeline.builder.Event>();
		for (Event entity: entities){			
			events.add(new com.fsg.genealogy.timeline.builder.Event(entity));			
		}
		
		Title title = new Title();
		title.setHeadline("this is the headline");
		title.setText("The strong");
		title.setDate(events);
		
		return new Timeline(title).toJsonExcludeNulls();										
	}

}
