package com.fsg.genealogy.domain;

import java.awt.image.BufferedImage;
import java.io.ByteArrayInputStream;
import java.io.IOException;

import javax.imageio.ImageIO;
import javax.persistence.Column;
import javax.persistence.Lob;
import javax.persistence.Transient;

import org.apache.commons.codec.binary.Base64;
import org.springframework.roo.addon.javabean.RooJavaBean;
import org.springframework.roo.addon.jpa.activerecord.RooJpaActiveRecord;
import org.springframework.roo.addon.json.RooJson;
import org.springframework.roo.addon.tostring.RooToString;

import flexjson.JSONSerializer;


@RooToString
@RooJson
@RooJpaActiveRecord
@RooJavaBean
public class Image {
	
	public Image(byte[] bytes) {
		this.bytes = bytes;
	}
	
	@Lob @Column(length=Integer.MAX_VALUE, columnDefinition="LONGBLOB NOT NULL")
	private byte[] bytes;
	
	@Transient
	private String data = "";
	
	public String customSerialize() {
		this.data = new Base64().encodeAsString(bytes);
//		this.data = this.bytes;
		
		String json = new JSONSerializer()
							.exclude("*.class")
							.include("data", "id", "version")
							.serialize(this);
		return json;
		
	}



	public BufferedImage asBufferedImage() {
		try {
			return ImageIO.read(new ByteArrayInputStream(this.bytes));
		} catch (IOException e) {
			throw new RuntimeException("error reading image");
		}
	}

}
