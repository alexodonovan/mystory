package com.fsg.storify.readservice.controllers;

import java.util.List;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.fsg.storify.readservice.timeline.Family;
import com.fsg.storify.readservice.timeline.Timeline;

@Controller
@RequestMapping("/timelines")
public class TimelineController {
	
	@RequestMapping(value="/{searchString}/data.jsonp", method = RequestMethod.GET, produces="plain/text")
	public @ResponseBody String getDataJsonp(@PathVariable String searchString){		
		List<Family> resultList = Family.findFamilysByNameLike(searchString).getResultList();
		Family family = resultList.get(0);
		Timeline timeline = Timeline.findTimelinesByFamily(family).getSingleResult();	
		
		StringBuilder jsonP = new StringBuilder("storyjs_jsonp_data = ")
									.append(timeline.getData());		
		
		return jsonP.toString();		
	} 
	
	@RequestMapping(value="/{searchString}/data.jsonpp", method = RequestMethod.GET, produces="text/javascript")
	public @ResponseBody String getDataForEdit(@PathVariable String searchString, @RequestParam(value="callback") String callback){
		List<Family> resultList = Family.findFamilysByNameLike(searchString).getResultList();
		Family family = resultList.get(0);
		Timeline timeline = Timeline.findTimelinesByFamily(family).getSingleResult();
					
		StringBuilder jsonP = new StringBuilder(callback+"(")
									.append(timeline.toJson())
									.append(");");		
		
		return jsonP.toString();		
		
	}
	
	
	
	@RequestMapping(value="/{searchString}/data.json", method = RequestMethod.GET)
	public @ResponseBody String getDataJson(@PathVariable String searchString){		
		List<Family> resultList = Family.findFamilysByNameLike(searchString).getResultList();
		Family family = resultList.get(0);
		Timeline timeline = Timeline.findTimelinesByFamily(family).getSingleResult();						
		return timeline.getData();		
	} 
}
