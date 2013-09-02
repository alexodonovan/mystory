package com.fsg.genealogy.controllers;

import org.springframework.stereotype.Service;

import com.fsg.genealogy.domain.Event;
import com.fsg.genealogy.domain.Family;
import com.fsg.genealogy.domain.Image;


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
		entity.update(dto.getTitle(), dto.getDescription(), 
				dto.getCredit(), dto.getCaption(), dto.getUrl(),
				dto.getDate(), dto.getAssetId());
		entity.merge();		
	}

	public void delete(com.fsg.genealogy.web.dto.Event dto) {
		Family family = Family.findFamily(dto.getFamilyId());		
		Event entity = Event.findEvent(dto.getId());
		
		Image image = Image.findImage(entity.getAssetId());
		if (image!=null) image.remove();
						
		family.removeEvent(entity);
		family.merge();
	}
}
