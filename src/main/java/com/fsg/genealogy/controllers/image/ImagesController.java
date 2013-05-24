package com.fsg.genealogy.controllers.image;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.fsg.genealogy.domain.Image;

@Service
public class ImagesController {
	
	@Autowired
	private ImageRequestParser parser;

	public Image upload(HttpServletRequest req) {
		Image image = parser.asImage(req);			
		image.persist();
		return image;
	}
}
