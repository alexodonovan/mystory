package com.fsg.genealogy.controllers;

import java.awt.image.BufferedImage;
import java.io.IOException;
import java.io.InputStream;
import java.util.List;

import javax.imageio.ImageIO;
import javax.servlet.ServletException;
import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.fileupload.FileItem;
import org.apache.commons.fileupload.FileUploadException;
import org.apache.commons.fileupload.disk.DiskFileItemFactory;
import org.apache.commons.fileupload.servlet.ServletFileUpload;
import org.apache.commons.io.FilenameUtils;
import org.apache.commons.io.IOUtils;
import org.springframework.stereotype.Component;
import org.springframework.web.HttpRequestHandler;
import org.springframework.web.bind.ServletRequestUtils;

import com.fsg.genealogy.domain.Image;

@Component("images")
public class Images implements HttpRequestHandler {

	@Override
	@SuppressWarnings("unchecked")
	public void handleRequest(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		Integer imageId = ServletRequestUtils.getIntParameter(req, "imgId");
		if (imageId != null) {
			this.handleGetRequest(req, resp);
			return;
		}

		try {
			List<FileItem> items = new ServletFileUpload(new DiskFileItemFactory()).parseRequest(req);
			for (FileItem item : items) {
				if (item.getFieldName().equals("file")) {
					String filename = FilenameUtils.getName(item.getName());
					InputStream content = item.getInputStream();

					Image image = new Image(IOUtils.toByteArray(content));
					image.persist();

					resp.setContentType("text/plain");
					resp.setCharacterEncoding("UTF-8");
					resp.getWriter().write("File " + filename + " successfully uploaded");
					return;
				}
			}
		} catch (FileUploadException e) {
			throw new ServletException("Parsing file upload failed.", e);
		}

		// try {
		// FileItemFactory factory = new DiskFileItemFactory();
		// ServletFileUpload upload = new ServletFileUpload(factory);
		// List<FileItem> fileItems = upload.parseRequest(req);
		//
		// Image image = new Image();;
		// for (FileItem item: fileItems){
		// if (!item.isFormField()) image = new Image(item.get());
		// }
		// image.persist();
		// } catch (FileUploadException e) {
		// throw new RuntimeException("error uploading file.");
		// }

		// BufferedImage image = Image.findImage(1l)
		// .asBufferedImage();
		//
		// resp.setHeader("Cache-Control", "no-cache");
		// resp.setDateHeader("Expires", 0);
		// resp.setHeader("Pragma", "no-cache");
		// resp.setDateHeader("Max-Age", 0);
		// resp.setContentType("image/jpeg");
		//
		// ServletOutputStream outputStream = resp.getOutputStream();
		// ImageIO.write(image, "jpeg", outputStream);
		// outputStream.close();
	}

	public void handleGetRequest(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		Integer imageId = ServletRequestUtils.getIntParameter(req, "imgId");
		BufferedImage image = Image.findImage(imageId.longValue()).asBufferedImage();

		resp.setHeader("Cache-Control", "no-cache");
		resp.setDateHeader("Expires", 0);
		resp.setHeader("Pragma", "no-cache");
		resp.setDateHeader("Max-Age", 0);
		resp.setContentType("image/jpeg");

		ServletOutputStream outputStream = resp.getOutputStream();
		ImageIO.write(image, "jpeg", outputStream);
		outputStream.close();
	}

}
