package com.fsg.storify.readservice.search;

import org.springframework.roo.addon.javabean.RooJavaBean;
import org.springframework.roo.addon.json.RooJson;


@RooJson 
@RooJavaBean
public class SearchRequest {
	
	private String query;	

}
