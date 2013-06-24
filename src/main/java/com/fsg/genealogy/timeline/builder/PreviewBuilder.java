package com.fsg.genealogy.timeline.builder;

import java.util.List;

import org.apache.commons.collections.CollectionUtils;
import org.springframework.stereotype.Service;

import com.fsg.genealogy.domain.Event;
import com.fsg.genealogy.domain.Family;
import com.google.gson.Gson;


@Service
public class PreviewBuilder {

	public String toJson(Family family) {
		Event t = this.firstEvent(family.getEvents());							
		Title title = new Title(t, family.getAllExceptTitle());
		Timeline timeline = new Timeline(title);
		return new Gson().toJson(timeline);
	}
	
	public Event firstEvent(List<com.fsg.genealogy.domain.Event> events){
		if (CollectionUtils.isEmpty(events)) return new Event();
		return events.get(0);				
	}
	
	

}
