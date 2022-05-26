//Clase Ingreso que hereda los atributos de la clase padre Dato y ademas tiene un atributo idIngreso
class Ingreso extends Dato{
    static contadorIngreso = 0;

    constructor(descripcion,valor){
        super(descripcion, valor)
        this._idIngreso = ++Ingreso.contadorIngreso;
    }
    //Getter para obtener el id del ingreso
    get idIngreso(){
        return this._idIngreso;
    }
}
