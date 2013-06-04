package com.fsg.genealogy.config;

import org.springframework.roo.addon.json.RooJson;

@RooJson
public class ReadServiceProperties {
	
	private String url;

	public String getUrl() {
		return url;
	}

	public void setUrl(String url) {
		this.url = url;
	}

}
