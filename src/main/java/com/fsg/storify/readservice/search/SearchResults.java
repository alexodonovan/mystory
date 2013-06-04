package com.fsg.storify.readservice.search;

import java.util.Collection;
import java.util.List;

import org.springframework.roo.addon.javabean.RooJavaBean;
import org.springframework.roo.addon.json.RooJson;

import com.fsg.storify.readservice.timeline.Family;

@RooJson(deepSerialize=true) @RooJavaBean
public class SearchResults {

	public SearchResults(List<Family> families) {
		this.families = families;
	}

	private Collection<Family> families;	

}
