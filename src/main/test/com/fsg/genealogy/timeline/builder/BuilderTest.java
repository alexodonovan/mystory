package com.fsg.genealogy.timeline.builder;

import static junit.framework.Assert.assertEquals;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collection;
import java.util.Date;

import org.junit.Before;
import org.junit.Test;

import com.google.gson.Gson;

public class BuilderTest {
	
	private Builder sut;

	@Before
	public void init(){
		this.sut = new Builder();						
	}
	
	@Test
	public void test_serialize(){
		
		Collection<com.fsg.genealogy.domain.Event> entities = new ArrayList<com.fsg.genealogy.domain.Event>();
		Date date = new Date();
		com.fsg.genealogy.domain.Event entity = new com.fsg.genealogy.domain.Event("test", "desc", "credit", "test", 1l, date);
		entities.add(entity);
		
		String json = sut.toJson(entities);
		System.out.println(json);
	}
	
	@Test
	public void test_serialize_just_one_event_entry(){
		Event event = new Event();
		event.setHeadline("this is a headline");
		event.setText("this is some text");
		
		String expected = "{\"headline\":\"this is a headline\",\"text\":\"this is some text\"}";
		String actual = event.toJsonExcludeNulls();
		System.out.println(actual);					
		assertEquals(expected, actual);					
		
	}
	
	@Test
	public void test_serialize_title_with_event(){
		Event event = new Event();
		event.setHeadline("this is a headline");
		event.setText("this is some text");
		
		Title title = new Title();
		title.setHeadline("this is a title headline");
		title.setText("this is some title text");
		title.setDate(Arrays.asList(event));
				
//		String expected = "{\"headline\":\"this is a headline\",\"text\":\"this is some text\"}";		
//		assertEquals(expected, title.toJsonExcludeNulls());
		
		System.out.println("***GSON: " + new Gson().toJson(title));
		
	}	
	 
	
	
	
	
	

}
