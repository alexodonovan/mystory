package com.fsg.genealogy.web.api;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseStatus;

import com.fsg.genealogy.controllers.TimelineController;
import com.fsg.genealogy.domain.Timeline;

@Controller
@RequestMapping("/timelines")
public class TimelineAPI {
	
	@Autowired
	private TimelineController timelineController;

	@RequestMapping(method = RequestMethod.PUT, headers = { "Accept=application/json" })
	@ResponseStatus(HttpStatus.OK)
	public void updateTimelineData(@RequestBody String json) {
		Timeline timeline = Timeline.fromJsonToTimeline(json);
		timeline.merge();
	}

	@RequestMapping(method = RequestMethod.GET, value = "/{familyId}", headers = "Accept=application/json")
	public ResponseEntity<String> image(@PathVariable Long familyId) {
		String json = timelineController.buildTimeline(familyId); 		
		HttpHeaders headers = new HttpHeaders();
		headers.add("Content-Type", "application/json; charset=utf-8");
		if (json == null) return new ResponseEntity<String>(headers, HttpStatus.NOT_FOUND);		
		return new ResponseEntity<String>(json ,headers, HttpStatus.OK);		
	}

}
