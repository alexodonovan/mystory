package com.fsg.genealogy.controllers;

import org.springframework.stereotype.Service;

import com.fsg.genealogy.domain.Event;
import com.fsg.genealogy.domain.Family;


@Service
public class EventController {

	public Event create(String json) {
		com.fsg.genealogy.web.dto.Event event = com.fsg.genealogy.web.dto.Event.fromJsonToEvent(json);
		Event entity = event.toEntity();		
				
		Family family = Family.findFamily(event.getFamilyId());
		family.addEvent(entity);
		family.merge();
		
		return entity;
	}

}
