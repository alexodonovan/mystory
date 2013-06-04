package com.fsg.storify.readservice.api;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.fsg.storify.readservice.search.SearchController;
import com.fsg.storify.readservice.search.SearchResults;

@Controller
@RequestMapping
public class Search {
	
	@Autowired
	private SearchController controller;
	
	@RequestMapping(value="/search.jsonp/{query}", method = RequestMethod.GET, produces="text/javascript",  headers = "Accept=application/json")
	public @ResponseBody String searchFor(@PathVariable String query, @RequestParam(value="callback") String callback){
		SearchResults results = controller.searchFor(query);
		
		StringBuilder jsonP = new StringBuilder(callback+"(")
									.append(results.toJson())
									.append(");");	
		return jsonP.toString();				
	}

}
