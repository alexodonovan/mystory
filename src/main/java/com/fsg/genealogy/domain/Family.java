package com.fsg.genealogy.domain;

import java.util.Collection;

import javax.persistence.FetchType;
import javax.persistence.JoinTable;
import javax.persistence.OneToMany;

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
	
	@OneToMany(fetch=FetchType.EAGER) @JoinTable
	private Collection<Event> events;
}
