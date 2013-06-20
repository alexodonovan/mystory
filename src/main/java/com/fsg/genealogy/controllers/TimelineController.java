package com.fsg.genealogy.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.fsg.genealogy.domain.Family;
import com.fsg.genealogy.timeline.builder.PreviewBuilder;


@Service
public class TimelineController {
	
	@Autowired
	private PreviewBuilder builder;

	public String buildTimeline(Long familyId) {
		Family family = Family.findFamily(familyId);						
		String json = builder.toJson(family);						
		return json;
	}

}
