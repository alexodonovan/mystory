package com.fsg.genealogy.web.api;

import javax.annotation.Resource;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.fsg.genealogy.config.ReadServiceProperties;


@Controller
@RequestMapping("/config")
public class ConfigAPI {
	
	@Resource(name="readServiceProperties")
	private ReadServiceProperties readServiceProperties;	

	
	@RequestMapping(value = "/readservice.json", method = RequestMethod.GET)
	public @ResponseBody String readService(){
		return readServiceProperties.toJson();		
	}

}
