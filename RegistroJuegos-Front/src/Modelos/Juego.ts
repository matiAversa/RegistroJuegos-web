class Juego {
    private id: number;
    private nombre: string;
    private calificacion: string;
    
    constructor(id: number, nombre: string, calificacion?: string) {
        this.id = id;
        this.nombre = nombre;
        this.calificacion = calificacion || "";
    }

    public getId() {
        return this.id;
    }
    
    public getNombre() {
        return this.nombre;
    }
    
    public getCalificacion() {
        return this.calificacion;
    }
}

export default Juego;