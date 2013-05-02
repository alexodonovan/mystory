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
public class Shape {

    private BigDecimal radius;

    private BigDecimal centerX;

    private BigDecimal centerY;
}
