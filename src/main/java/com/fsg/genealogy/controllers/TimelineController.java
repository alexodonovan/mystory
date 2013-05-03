
package com.fsg.genealogy.controllers;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;

import org.apache.http.HttpResponse;
import org.apache.http.client.HttpClient;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.impl.client.DefaultHttpClient;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;


@Controller @RequestMapping("/timeline")
public class TimelineController {
	
	@RequestMapping(value="/{searchString}/data.jsonp", method = RequestMethod.GET, produces="plain/text")
	public @ResponseBody String get(@PathVariable String searchString) throws IOException{
		HttpClient client = new DefaultHttpClient();
		HttpGet request =new HttpGet("http://localhost:8080/genealogy/example_json.json");
		HttpResponse response = client.execute(request);

		// Get the response
		BufferedReader rd = new BufferedReader(new InputStreamReader(response.getEntity().getContent()));
		    		
		StringBuilder jsonP = new StringBuilder("storyjs_jsonp_data = ");
//		StringBuilder jsonP = new StringBuilder("");
		String line = "";
		while ((line = rd.readLine()) != null) {			
			jsonP.append(line);
		}
		
		return jsonP.toString();			
	}
	
	

}
