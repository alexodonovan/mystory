package com.fsg.storify.readservice.api;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.fsg.storify.readservice.search.SearchController;
import com.fsg.storify.readservice.search.SearchRequest;
import com.fsg.storify.readservice.search.SearchResults;

@Controller
@RequestMapping
public class Search {
	
	@Autowired
	private SearchController controller;
	
	@RequestMapping(value="/search.jsonp", method = RequestMethod.POST,  headers = "Accept=application/json")
	public @ResponseBody String searchFor(@RequestBody String json){
		SearchRequest request = SearchRequest.fromJsonToSearchRequest(json);
		SearchResults results = controller.searchFor(request);
		json = results.toJson();
		return json;				
	}

}
