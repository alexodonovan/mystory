package com.fsg.genealogy.controllers;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.roo.addon.web.mvc.controller.json.RooWebJson;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.fsg.genealogy.domain.Event;

@Controller
@RequestMapping("/events")
@RooWebJson(jsonObject = Event.class)
public class EventAPI {
	
	@RequestMapping(method = RequestMethod.POST, headers = "Accept=application/json")
	public ResponseEntity<java.lang.String> createFromJson(@RequestBody String json) {
		Event event = Event.fromJsonToEvent(json);
		HttpHeaders headers = new HttpHeaders();
		headers.add("Content-Type", "application/json");
		event.persist();
		return new ResponseEntity<String>(event.toJson(), headers, HttpStatus.CREATED);
	}

	
}
