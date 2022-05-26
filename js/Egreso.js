//Clase de Egreso que hereda los atributos de la clase padre Dato y ademas tiene un atributo idEgreso
class Egreso extends Dato{
    static contadorEgreso = 0;

    constructor(descripcion, valor){
        super(descripcion, valor);
        this._idEgreso = ++Egreso.contadorEgreso;

    }
    //Getter para obtener el id del egreso
    get idEgreso(){
        return this._idEgreso;
    }
}
