package com.fsg.genealogy.domain;

import org.springframework.roo.addon.javabean.RooJavaBean;
import org.springframework.roo.addon.tostring.RooToString;

@RooJavaBean
@RooToString
public class Asset {
	
	private String media;
	private String caption;
	private String credit;
}
