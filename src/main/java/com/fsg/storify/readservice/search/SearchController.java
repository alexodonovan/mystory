package com.fsg.storify.readservice.search;

import java.util.List;

import org.springframework.stereotype.Service;

import com.fsg.storify.readservice.timeline.Family;

@Service
public class SearchController {
	
	
	public SearchResults searchFor(SearchRequest searchRequest) {
		List<Family> families = Family.findFamilysByAltSurnamesLike(searchRequest.getQuery())
										.getResultList();		
		SearchResults results = new SearchResults(families);
		return results;
	}
	
	

}
