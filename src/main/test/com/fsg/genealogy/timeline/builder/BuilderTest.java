package com.fsg.genealogy.timeline.builder;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Date;

import org.junit.Before;
import org.junit.Test;

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
	
	
	
	
	

}
