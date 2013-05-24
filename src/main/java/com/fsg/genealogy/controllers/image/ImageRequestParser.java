package com.fsg.genealogy.controllers.image;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.apache.commons.fileupload.FileItem;
import org.apache.commons.fileupload.FileUploadException;
import org.apache.commons.fileupload.disk.DiskFileItemFactory;
import org.apache.commons.fileupload.servlet.ServletFileUpload;
import org.springframework.stereotype.Service;

import com.fsg.genealogy.domain.Image;

@Service
public class ImageRequestParser {
	

	

	@SuppressWarnings("unchecked")
	public ImageUpload parse(HttpServletRequest req) throws FileUploadException {
		List<FileItem> items = new ArrayList<FileItem>();			
		items = new ServletFileUpload(new DiskFileItemFactory()).parseRequest(req);		
		return new ImageUpload(items);
	}

	public Image asImage(HttpServletRequest req) {
		try {
			return this.parse(req).findFileField().content().asImage();
		} 
		catch (IOException e) {} 
		catch (FileUploadException e) {		
			throw new RuntimeException(e);		
		}
		
		return null;
	}

}
