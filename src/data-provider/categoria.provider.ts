import { Injectable } from "@nestjs/common";
import { ICategoria } from "src/core/entity/categoria/categoria.entity";

@Injectable()
export abstract class ICategoriaProvider {

    /**
    * Operación para consultar mensajes según filtro
    * @param {Number} page Número de página a consultar
    * @param {Number} limit Cantidad de registros por página
    * @param {Object} filter arreglo de campos a consultar
    */
    abstract getCategorias(page: number, limit: number, filter: any): Promise<ICategoria[]>;

    /**
    * Operación para consultar mensajes según filtro
    * @param {Number} page Número de página a consultar
    * @param {Number} limit Cantidad de registros por página
    * @param {Object} filter arreglo de campos a consultar
    */
    abstract loadCategorias(page: number, limit: number, filter: any): Promise<ICategoria[]>;

    /**
    * Operación para consultar un mensaje por su identificador
    * @param {String} id identificador de mensaje
    */
    abstract getCategoria(id: string): Promise<ICategoria>;

    /**
    * Operación de actualización de un mensaje
    * @param {ICategoria} categoria arreglo con información del mensaje
    */
    abstract updateCategoria(categoria: ICategoria): Promise<ICategoria>;

    /**
    * Operación de actualización de un mensaje
    * @param {ICategoria} categoria arreglo con información del mensaje
    */
    abstract create(categoria: ICategoria): Promise<ICategoria>;

    abstract remove(id: string): Promise<ICategoria>;

}