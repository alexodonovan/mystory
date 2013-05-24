package com.fsg.genealogy.controllers.image;

import java.io.IOException;
import java.io.InputStream;
import java.util.List;

import org.apache.commons.collections.CollectionUtils;
import org.apache.commons.fileupload.FileItem;
import org.apache.commons.io.IOUtils;

import com.fsg.genealogy.domain.Image;

public class ImageUpload {

	private List<FileItem> items;
	private FileItem item;
	private InputStream content;

	public ImageUpload(List<FileItem> items) {
		this.items =  items;
	}

	public ImageUpload(FileItem item) {
		this.item = item;
	}

	public ImageUpload() {}

	public ImageUpload(InputStream content) {
		this.content = content;
	}

	public ImageUpload findFileField() {
		if (CollectionUtils.isEmpty(items)) throw new RuntimeException("Programmatic error, must parse incoming request first.");
		
		for (FileItem item : items) {
			if (item.getFieldName().equals("file")) {
				return new ImageUpload(item); 
			}
		}
		return new ImageUpload();
	}

	public ImageUpload content() throws IOException {
		if (item==null) 
			throw new RuntimeException("Programmatic error, No file received in upload");		
		return new ImageUpload(item.getInputStream());						
	}

	public Image asImage() throws IOException {
		Image image = new Image(IOUtils.toByteArray(content));		
		return image;
	}

}
