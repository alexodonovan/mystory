// WARNING: DO NOT EDIT THIS FILE. THIS FILE IS MANAGED BY SPRING ROO.
// You may push code into the target .java compilation unit if you wish to edit any member(s).

package com.fsg.genealogy.domain;

import com.fsg.genealogy.domain.Marker;
import flexjson.JSONDeserializer;
import flexjson.JSONSerializer;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

privileged aspect Marker_Roo_Json {
    
    public String Marker.toJson() {
        return new JSONSerializer().exclude("*.class").serialize(this);
    }
    
    public static Marker Marker.fromJsonToMarker(String json) {
        return new JSONDeserializer<Marker>().use(null, Marker.class).deserialize(json);
    }
    
    public static String Marker.toJsonArray(Collection<Marker> collection) {
        return new JSONSerializer().exclude("*.class").serialize(collection);
    }
    
    public static Collection<Marker> Marker.fromJsonArrayToMarkers(String json) {
        return new JSONDeserializer<List<Marker>>().use(null, ArrayList.class).use("values", Marker.class).deserialize(json);
    }
    
}
