package com.fsg.genealogy.web.api;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.roo.addon.web.mvc.controller.json.RooWebJson;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

import com.fsg.genealogy.controllers.EventController;
import com.fsg.genealogy.domain.Event;
import com.fsg.genealogy.domain.Family;

@Controller
@RequestMapping("/events")
@RooWebJson(updateFromJsonMethod = "updateEvent", jsonObject = Event.class)
public class EventAPI {

	@Autowired
	private EventController eventController;

	@RequestMapping(method = RequestMethod.POST, headers = "Accept=application/json")
	public ResponseEntity<java.lang.String> createFromJson(@RequestBody String json) {
		com.fsg.genealogy.web.dto.Event dto = com.fsg.genealogy.web.dto.Event.fromJsonToEvent(json);
		Event event = eventController.create(dto);
		HttpHeaders headers = new HttpHeaders();
		headers.add("Content-Type", "application/json");
		return new ResponseEntity<String>(event.toJson(), headers, HttpStatus.CREATED);
	}

	@RequestMapping(method = RequestMethod.PUT, headers = "Accept=application/json")
	public ResponseEntity<String> updateEvent(@RequestBody String json) {
		com.fsg.genealogy.web.dto.Event dto = com.fsg.genealogy.web.dto.Event.fromJsonToEvent(json);
		eventController.update(dto);
		HttpHeaders headers = new HttpHeaders();
		headers.add("Content-Type", "application/json");
		return new ResponseEntity<String>(headers, HttpStatus.OK);
	}

	@RequestMapping(method = RequestMethod.GET, headers = "Accept=application/json")
	public ResponseEntity<String> list(@RequestParam(value = "family_id") Long familyId) {
		HttpHeaders headers = new HttpHeaders();
		headers.add("Content-Type", "application/json; charset=utf-8");
		Family family = Family.findFamily(familyId);
		return new ResponseEntity<String>(Event.toJsonArray(family.getEvents()), headers, HttpStatus.OK);
	}

	@RequestMapping(method = RequestMethod.DELETE, headers = "Accept=application/json")
	public ResponseEntity<String> deleteEvent(@RequestBody String json) {
		com.fsg.genealogy.web.dto.Event dto = com.fsg.genealogy.web.dto.Event.fromJsonToEvent(json);
		eventController.delete(dto);		
		HttpHeaders headers = new HttpHeaders();
		headers.add("Content-Type", "application/json");		
		return new ResponseEntity<String>(headers, HttpStatus.OK);
	}

}
