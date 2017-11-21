import * as ifs from "./interfaces";
import {Arr} from "./arr";
import {Geom, GeomPath} from "./geom";
import {Vertex, Edge, Wire, Face} from "./topos";
import {Attrib} from "./attribs";
import {Group} from "./groups";

//Ent, superclass of points and objects

/**
 * A set of classes for working with entities (points, objects)
 */
abstract class Ent {
    protected geom:ifs.IGeom;
    protected id:number;
    protected path:GeomPath;
    /**
    * Creates an instance of the class Entity.
    * @param geom The constructor requires a preliminary geometry to create the instance
    * @param id Required identity number which allows to further on identify the entity
    * @return An instance of the class Ent is created
    */
    constructor(geom:ifs.IGeom, id:number) {
        this.geom = geom;
        this.id = id;
        this.path = new GeomPath(this.id);
    }
    /**
    * Public method that allows to access the geometry
    * @return ifs.IGeom Returns the geometry
    */
    public getGeom():ifs.IGeom {
        return this.geom;
    }
    /**
    * Public method that allows to access the ID number
    * @return number Returns the ID number
    */
    public getID():number {
        return this.id;
    }
    /**
    * Public method that allows to access the Model
    * @return ifs.IModel Returns the model
    */    
    public getModel():ifs.IModel {
        return this.geom.getModel();
    }
    /**
    * Public method that allows to access the geometry type
    * @return EGeomType Returns the geometry type of the Entity
    */    
    public getGeomType():ifs.EGeomType {
        //Do not implement this method.
        throw new Error ("Method to be overridden by subclass.");
    }
    //attribs
    /**
    * Public method that allows to access names of the attributes
    * @return string[] Returns the attribute names
    */    
    public getAttribNames():string[] {
        return this.getModel().getAttribs(this.getGeomType()).map(attrib=>attrib.getName());
    }
    /**
    * Public method that allows to access the attributes value
    * @param name Specifies the name of the attribute to access
    * @return any Returns the attribute value
    */
    public getAttribValue(name:string):any {
        return this.getModel().getAttrib(name, this.getGeomType()).getValue(this.path);
    }
    /**
    * Public method that allows to modify an attribute value
    * @param name Specifies the name of the attribute to access
    * @param value New value to which the attribute will be set
    * @return any Sets the attribute value to the new value
    */
    public setAttribValue(name:string, value:any):any {
        return this.getModel().getAttrib(name, this.getGeomType()).setValue(this.path, value);
    }
    //groups
    /**
    * Public method which enable to access groups names
    * @return string[] Arrays containg the group names
    */
    public getGroupNames():string[] {
        throw new Error ("Method not implemented.");
    }
}
// Point class

    /**
    * The Point class is designed to manipulate points by setting their positions, obtaining their positions,
    * or obtaining the vertices to which they are linked.
    */
export class Point extends Ent implements ifs.IPoint{
    /**
    * A public method designed to obtain the point list
    * @return ifs.EGeomType Returns the points in EGeomType interface format
    */
    public getGeomType():ifs.EGeomType {
        return ifs.EGeomType.points;
    }
    /**
    * A public method that allows to set the cartesian coordinates x,y,z of a point.
    * @param xyz Cartesian coordinates
    * @return number[] Arrays of pre-defined coordinates
    */
    public setPosition(xyz:number[]):number[] {
        return this.geom.setPointPosition(this.id, xyz);
    }
    /**
    * Public method for obtaining the position
    * @return number[] Returns an array that contains the x,y,z coordinates
    */
    public getPosition():number[] {
        return this.geom.getPointPosition(this.id);
    }
    /**
    * Public method for obtaining the vertices linked to a point or a set of points
    * @return ifs.IVertex[] Returns the array of vertices in the interface format IVertex[]
    */    
    public getVertices():ifs.IVertex[] {
        let objs_data:any = this.geom.getData();
        let vertices:ifs.IVertex[] = [];
        for (let obj_data of objs_data) {
            //loop through all wires and extract verts that have same point_id
            obj_data[0].forEach((w,w_i)=>w.forEach((v,v_i)=>(v == this.id) && 
                vertices.push(new Vertex(this.geom, 
                    new GeomPath(this.path.id,ifs.EGeomType.wires,w_i,this.path.st,v_i)))));
            //loop through all faces and extract verts that have same point_id
            obj_data[1].forEach((f,f_i)=>w.forEach((v,v_i)=>(v == this.id) && 
                vertices.push(new Vertex(this.geom, 
                    new GeomPath(this.path.id,ifs.EGeomType.faces,f_i,this.path.st,v_i)))));
        }
        return vertices;
    }
}
// Obj class
    /**
    * A class for instances of the class Object.
    */
abstract class Obj extends Ent implements ifs.IObj{
    /**
    *
    * @return ifs.EGeomType
    */
    public getGeomType():ifs.EGeomType {
        return ifs.EGeomType.objs;
    }
    /**
    * TO BE COMPLETED
    * @return
    */
    public getObjType():ifs.EObjType {
        //Do not implement this method.
        throw new Error ("Method to be overridden by subclass.");
    }
    // Get the topo
    /**
    * TO BE COMPLETED
    * @return
    */
    public getWires():ifs.IWire[] {
        return Arr.makeSeq(this.numWires()).map((v,i)=>new Wire(this.geom, 
            new GeomPath(this.path.id, ifs.EGeomType.wires, v)));
    }
    /**
    * TO BE COMPLETED
    * @return
    */
    public getFaces():ifs.IFace[] {
        return Arr.makeSeq(this.numFaces()).map((v,i)=>new Face(this.geom, 
            new GeomPath(this.path.id, ifs.EGeomType.faces, v)));
    }
    /**
    * TO BE COMPLETED
    * @return
    */
    public numWires():number {
        return this.geom.getData(new GeomPath(this.path.id, ifs.EGeomType.wires)).length;
    }    
    /**
    * TO BE COMPLETED
    * @return
    */
    public numFaces():number {
        return this.geom.getData(new GeomPath(this.path.id, ifs.EGeomType.faces)).length;
    }
}
export class Polyline  extends Obj implements ifs.IPolyline{
    /**
    * TO BE COMPLETED
    * @return
    */
    public getObjType():ifs.EObjType {
        return ifs.EObjType.polyline;
    }
}
    /**
    * Class Polymesh
    */ 
export class Polymesh extends Obj implements ifs.IPolymesh{
    /**
    * TO BE COMPLETED
    * @return
    */
    public getObjType():ifs.EObjType {
        return ifs.EObjType.polymesh;
    }
}