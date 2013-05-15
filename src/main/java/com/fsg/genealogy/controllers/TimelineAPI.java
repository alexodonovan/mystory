package com.fsg.genealogy.controllers;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

import com.fsg.genealogy.domain.Image;
import com.fsg.genealogy.domain.Timeline;

@Controller
@RequestMapping("/timelines")
public class TimelineAPI {

	@RequestMapping(method = RequestMethod.PUT, headers = { "Accept=application/json" })
	@ResponseStatus(HttpStatus.OK)
	public void updateTimelineData(@RequestBody String json) {
		Timeline timeline = Timeline.fromJsonToTimeline(json);
		timeline.merge();
	}

	@RequestMapping(method = RequestMethod.POST, value = "/upload")
	@ResponseStatus(HttpStatus.OK)
	public void updateImage(@RequestBody String body) {// @RequestParam
														// MultipartFile file) {
		new Image(body.getBytes()).persist();
	}

	@RequestMapping(method = RequestMethod.GET, value = "/images/{imageId}", headers = "Accept=application/json")
	public ResponseEntity<String> image(@PathVariable Long imageId) {
		Image image = Image.findImage(imageId);
		HttpHeaders headers = new HttpHeaders();
		headers.add("Content-Type", "application/json; charset=utf-8");
		if (image == null) {
			return new ResponseEntity<String>(headers, HttpStatus.NOT_FOUND);
		}
		System.out.print(image.toJson());
		return new ResponseEntity<String>(image.customSerialize(), headers, HttpStatus.OK);		
		// final HttpHeaders headers = new HttpHeaders();
		// headers.setContentType(MediaType.IMAGE_JPEG);
		// return new ResponseEntity<byte[]>(image.getData(), headers,
		// HttpStatus.ACCEPTED);
	}

}
