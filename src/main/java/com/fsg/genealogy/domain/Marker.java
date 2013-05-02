package com.fsg.genealogy.domain;

import java.math.BigDecimal;

import org.springframework.roo.addon.javabean.RooJavaBean;
import org.springframework.roo.addon.jpa.activerecord.RooJpaActiveRecord;
import org.springframework.roo.addon.json.RooJson;
import org.springframework.roo.addon.tostring.RooToString;

@RooJavaBean
@RooToString
@RooJpaActiveRecord
@RooJson
public class Marker {

    private BigDecimal lat;

    private BigDecimal lng;
    
    private String narrative;

	public void update(Marker updated) {
		this.lat = updated.getLat();
		this.lng = updated.getLng();
		this.narrative = updated.getNarrative();
		this.setVersion(updated.getVersion());
		
	}
    
}
