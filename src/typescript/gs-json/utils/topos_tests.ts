import * as gsj from "./gs-json";
import * as td from "./test_data";

export function test_Topo_constructor():boolean{
	return true;
}

export function test_Topo_getObjID():boolean{
	return true;
}

export function test_Topo_getGeom():boolean{
	return true;
}

export function test_Topo_getModel():boolean{
	return true;
}

// export function test_Topo_getGeomType():boolean{ //This method cannot be tested.
// 	return true;
// }

export function test_Topo_getAttribNames():boolean{
	return true;
}

export function test_Topo_getAttribValue():boolean{
	return true;
}

export function test_Topo_setAttribValue():boolean{
	return true;
}

export function test_Topo_getGroupNames():boolean{
	return true;
}


// Vertex
export function test_Vertex_getGeomType():boolean{
	let m:gsj.IModel = new gsj.Model();
	m.setData(td.box);
	let path:gsj.IGeomPath = new gsj.GeomPath(0, gsj.EGeomType.faces, 1, gsj.EGeomType.vertices, 1);
	let v:gsj.IVertex = new gsj.Vertex(m.getGeom(), path);
	if(v.getGeomType() != gsj.EGeomType.vertices) {return false;}
	return true;
}
export function test_Vertex_getPoint():boolean{
	let m:gsj.IModel = new gsj.Model();
	m.setData(td.box);
	let path:gsj.IGeomPath = new gsj.GeomPath(0, gsj.EGeomType.faces, 1, gsj.EGeomType.vertices, 1);
	let v:gsj.IVertex = new gsj.Vertex(m.getGeom(), path);
	if(v.getPoint().getID() != 6) {return false;}
	return true;
}
export function test_Vertex_next():boolean{
	let m:gsj.IModel = new gsj.Model();
	m.setData(td.box);
	let path:gsj.IGeomPath = new gsj.GeomPath(0, gsj.EGeomType.faces, 1, gsj.EGeomType.vertices, 1);
	let v:gsj.IVertex = new gsj.Vertex(m.getGeom(), path);
	if(v.next().getPoint().getID() != 5) {return false;}
	if(v.next().next().getPoint().getID() != 1) {return false;}
	if(v.next().next().next().getPoint().getID() != 2) {return false;}
	return true;
}
export function test_Vertex_previous():boolean{
	let m:gsj.IModel = new gsj.Model();
	m.setData(td.box);
	let path:gsj.IGeomPath = new gsj.GeomPath(0, gsj.EGeomType.faces, 1, gsj.EGeomType.vertices, 1);
	let v:gsj.IVertex = new gsj.Vertex(m.getGeom(), path);
	if(v.previous().getPoint().getID() != 2) {return false;}
	if(v.previous().previous().getPoint().getID() != 1) {return false;}
	return true;
}
export function test_Vertex_getEdge():boolean{
	let m:gsj.IModel = new gsj.Model();
	m.setData(td.box);
	let path:gsj.IGeomPath = new gsj.GeomPath(0, gsj.EGeomType.faces, 1, gsj.EGeomType.vertices, 1);
	let v:gsj.IVertex = new gsj.Vertex(m.getGeom(), path);
	let e:gsj.IEdge = v.getEdge();
	if (e.getObjID() != 0) {return false;}
	if (e.getGeomType() != gsj.EGeomType.edges) {return false;}
	return true;
}
export function test_Vertex_getParent():boolean{
	let m:gsj.IModel = new gsj.Model();
	m.setData(td.box);
	let path:gsj.IGeomPath = new gsj.GeomPath(0, gsj.EGeomType.faces, 1, gsj.EGeomType.vertices, 1);
	let v:gsj.IVertex = new gsj.Vertex(m.getGeom(), path);
	if (v.getParent().getObjID() != 0) {return false;}
	if (v.getParent().getGeomType() != gsj.EGeomType.faces) {return false;}
	return true;
}
export function test_Vertex_neighbours():boolean{
	let m:gsj.IModel = new gsj.Model();
	m.setData(td.box);
	let path:gsj.IGeomPath = new gsj.GeomPath(0, gsj.EGeomType.faces, 1, gsj.EGeomType.vertices, 1);
	let v:gsj.IVertex = new gsj.Vertex(m.getGeom(), path);
	let w_v:gsj.IVertex[];//vertices that belong to wires
	let f_v:gsj.IVertex[];//vertices that belong to faces
	[w_v, f_v] = v.neighbours();
	if (w_v.length != 0) {return false;}
	if (f_v.length != 3) {return false;}
	return true;
}


// Edge
export function test_Edge_getGeomType():boolean{
	return true;
}
export function test_Edge_getVertices():boolean{
	return true;
}
export function test_Edge_next():boolean{
	return true;
}
export function test_Edge_previous():boolean{
	return true;
}	
export function test_Edge_getParent():boolean{
	return true;
}
export function test_Edge_neighbours():boolean{
	return true;
}


// Wire
export function test_Wire_getGeomType():boolean{
	return true;
}
export function test_Wire_getVertices():boolean{
	return true;
}
export function test_Wire_getEdges():boolean{
	return true;
}
export function test_Wire_numVertices():boolean{
	return true;
}
export function test_Wire_numEdges():boolean{
	return true;
}
export function test_Wire_isClosed():boolean{
	return true;
}


// Face
export function test_Face_getGeomType():boolean{
	return true;
}
export function test_Face_getVertices():boolean{
	return true;
}
export function test_Face_getEdges():boolean{
	return true;
}
export function test_Face_numVertices():boolean{
	return true;
}
export function test_Face_numEdges():boolean{
	return true;
}
export function test_Face_isClosed():boolean{
	return true;
}
export function test_Face_neighbours():boolean{
	return true;
}
