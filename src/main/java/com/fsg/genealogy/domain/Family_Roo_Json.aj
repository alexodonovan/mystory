// WARNING: DO NOT EDIT THIS FILE. THIS FILE IS MANAGED BY SPRING ROO.
// You may push code into the target .java compilation unit if you wish to edit any member(s).

package com.fsg.genealogy.domain;

import com.fsg.genealogy.domain.Family;
import flexjson.JSONDeserializer;
import flexjson.JSONSerializer;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

privileged aspect Family_Roo_Json {
    
    public String Family.toJson() {
        return new JSONSerializer().exclude("*.class").serialize(this);
    }
    
    public static Family Family.fromJsonToFamily(String json) {
        return new JSONDeserializer<Family>().use(null, Family.class).deserialize(json);
    }
    
    public static String Family.toJsonArray(Collection<Family> collection) {
        return new JSONSerializer().exclude("*.class").serialize(collection);
    }
    
    public static Collection<Family> Family.fromJsonArrayToFamilys(String json) {
        return new JSONDeserializer<List<Family>>().use(null, ArrayList.class).use("values", Family.class).deserialize(json);
    }
    
}
