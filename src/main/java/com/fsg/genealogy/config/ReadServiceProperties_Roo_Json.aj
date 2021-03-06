// WARNING: DO NOT EDIT THIS FILE. THIS FILE IS MANAGED BY SPRING ROO.
// You may push code into the target .java compilation unit if you wish to edit any member(s).

package com.fsg.genealogy.config;

import com.fsg.genealogy.config.ReadServiceProperties;
import flexjson.JSONDeserializer;
import flexjson.JSONSerializer;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

privileged aspect ReadServiceProperties_Roo_Json {
    
    public String ReadServiceProperties.toJson() {
        return new JSONSerializer().exclude("*.class").serialize(this);
    }
    
    public static ReadServiceProperties ReadServiceProperties.fromJsonToReadServiceProperties(String json) {
        return new JSONDeserializer<ReadServiceProperties>().use(null, ReadServiceProperties.class).deserialize(json);
    }
    
    public static String ReadServiceProperties.toJsonArray(Collection<ReadServiceProperties> collection) {
        return new JSONSerializer().exclude("*.class").serialize(collection);
    }
    
    public static Collection<ReadServiceProperties> ReadServiceProperties.fromJsonArrayToReadServicePropertieses(String json) {
        return new JSONDeserializer<List<ReadServiceProperties>>().use(null, ArrayList.class).use("values", ReadServiceProperties.class).deserialize(json);
    }
    
}
