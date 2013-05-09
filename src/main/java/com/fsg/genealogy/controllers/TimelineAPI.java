package com.fsg.genealogy.controllers;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseStatus;

import com.fsg.genealogy.domain.Timeline;


@Controller
@RequestMapping("/timelines")
public class TimelineAPI {
	
	@RequestMapping(method = RequestMethod.PUT, headers ={"Accept=application/json"})
	@ResponseStatus(HttpStatus.OK)
	public void updateTimelineData(@RequestBody String json){				               
//        timeline.merge();
		
		Timeline timeline = Timeline.fromJsonToTimeline(json);
		timeline.merge();
		System.out.println(json);
	}
	

}
