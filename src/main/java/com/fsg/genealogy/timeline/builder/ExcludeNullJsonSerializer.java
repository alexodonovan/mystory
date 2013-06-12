package com.fsg.genealogy.timeline.builder;

import java.lang.reflect.Field;

import org.apache.commons.lang3.StringUtils;

import flexjson.JSONSerializer;

public class ExcludeNullJsonSerializer {
	
	private JSONSerializer serializer = new JSONSerializer();
	private Object obj;

	public JSONSerializer toJson(Field[] fields, Object obj) {
		this.obj = obj;
		serializer.exclude("*.class");
				
		for (Field field : fields) {
				this.excludeIfSerializer(field)
					.excludeIfNulls(field)			
					.excludeIfEmptyString(field);														
		}
		return serializer;	
	}
	
	public ExcludeNullJsonSerializer excludeIfSerializer(Field field) {
		if (this.isSerializer(field)) serializer.exclude(field.getName());
		return this;
	}

	public boolean isSerializer(Field field) {
		return field.getType().isAssignableFrom(ExcludeNullJsonSerializer.class);
	}

	public ExcludeNullJsonSerializer excludeIfEmptyString(Field field) {
		if (field.getType().isAssignableFrom(String.class)){
			if (StringUtils.isEmpty((String)this.getFieldValue(field))) serializer.exclude(field.getName()); 
		}
		return this;
		
	}

	public ExcludeNullJsonSerializer excludeIfNulls(Field field) {
		if (this.getFieldValue(field) == null) serializer.exclude(field.getName());
		return this;
		
	}

	public Object getFieldValue(Field field) {
		try {
			return field.get(this.obj);
		} catch (IllegalArgumentException e) {
		} catch (IllegalAccessException e) {
			throw new RuntimeException("illegal field value");
		}

		return null;

	}
	

}
