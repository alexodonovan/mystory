package com.fsg.genealogy.controllers;

import org.springframework.stereotype.Service;

import com.fsg.genealogy.domain.Event;
import com.fsg.genealogy.domain.Family;


@Service
public class EventController {

	public Event create(com.fsg.genealogy.web.dto.Event dto) {		
		Event entity = dto.toEntity();		
				
		Family family = Family.findFamily(dto.getFamilyId());
		family.addEvent(entity);
		family.merge();
		
		return entity;
	}

	public void update(com.fsg.genealogy.web.dto.Event dto) {		
		Event entity = Event.findEvent(dto.getId());
		entity.update(dto.getTitle(), dto.getDescription(), dto.getCredit(), dto.getCaption());
		entity.merge();		
	}

}
