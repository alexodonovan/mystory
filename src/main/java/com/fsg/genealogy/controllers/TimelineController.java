package com.fsg.genealogy.controllers;

import org.springframework.stereotype.Service;

import com.fsg.genealogy.domain.Family;
import com.fsg.genealogy.domain.Timeline;


@Service
public class TimelineController {

	public Timeline buildTimeline(Long familyId) {
		Family family = Family.findFamily(familyId);


		
		
		Timeline timeline = new Timeline();
		
		return null;
	}

}
