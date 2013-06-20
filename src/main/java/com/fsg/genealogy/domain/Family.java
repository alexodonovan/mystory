package com.fsg.genealogy.domain;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.FetchType;
import javax.persistence.JoinTable;
import javax.persistence.OneToMany;

import org.hibernate.annotations.Cascade;
import org.hibernate.annotations.CascadeType;
import org.springframework.roo.addon.javabean.RooJavaBean;
import org.springframework.roo.addon.jpa.activerecord.RooJpaActiveRecord;
import org.springframework.roo.addon.json.RooJson;
import org.springframework.roo.addon.tostring.RooToString;

@RooJson
@RooJavaBean
@RooToString
@RooJpaActiveRecord
public class Family {
	
	private String surname;
	
	@OneToMany(fetch=FetchType.EAGER, orphanRemoval=true) 
	@JoinTable @Cascade({CascadeType.ALL})
	private List<Event> events;

	public void addEvent(Event event) {
		if (events == null) events = new ArrayList<Event>();
		this.events.add(event);		
	}

	public void removeEvent(Event entity) {
		if (events == null) return;
		this.events.remove(entity);		
	}
	
	public List<Event> getAllExceptTitle() {
		return this.events.subList(1, this.events.size());		
	}
}
