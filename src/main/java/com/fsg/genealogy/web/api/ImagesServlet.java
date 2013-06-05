package com.fsg.genealogy.web.api;

import java.awt.image.BufferedImage;
import java.io.IOException;

import javax.imageio.ImageIO;
import javax.servlet.ServletException;
import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.HttpRequestHandler;
import org.springframework.web.bind.ServletRequestUtils;

import com.fsg.genealogy.controllers.image.ImagesController;
import com.fsg.genealogy.domain.Image;

@Component("imagesServlet")
public class ImagesServlet implements HttpRequestHandler {

	@Autowired
	private ImagesController images;

	@Override	
	public void handleRequest(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		Integer imageId = ServletRequestUtils.getIntParameter(req, "imgId");
		if (imageId != null) {
			this.handleGetRequest(req, resp);
			return;
		}
		
		Image image = images.upload(req);				
		
		resp.setContentType("application/json");
		resp.setCharacterEncoding("UTF-8");
		resp.getWriter().write("{\"id\":\""+ image.getId() +"\"}");
		return;			
		
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
