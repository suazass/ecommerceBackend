import { Injectable } from "@nestjs/common";
import { IProducto } from "src/core/entity/producto/producto.entity";

@Injectable()
export abstract class IProductoProvider {

    /**
    * Operación para consultar mensajes según filtro
    * @param {Number} page Número de página a consultar
    * @param {Number} limit Cantidad de registros por página
    * @param {Object} filter arreglo de campos a consultar
    */
    abstract getProductos(): Promise<IProducto[]>;

    /**
    * Operación para consultar mensajes según filtro
    * @param {Number} page Número de página a consultar
    * @param {Number} limit Cantidad de registros por página
    * @param {Object} filter arreglo de campos a consultar
    */
    abstract loadProducto(page: number, limit: number, filter: any): Promise<IProducto[]>;

    /**
    * Operación para consultar un mensaje por su identificador
    * @param {String} id identificador de mensaje
    */
    abstract getProducto(id: string): Promise<IProducto>;

    /**
    * Operación de actualización de un mensaje
    * @param {IProducto} categoria arreglo con información del mensaje
    */
    abstract updateProducto(categoria: IProducto): Promise<IProducto>;

    /**
    * Operación de actualización de un mensaje
    * @param {IProducto} categoria arreglo con información del mensaje
    */
    abstract create(categoria: IProducto): Promise<IProducto>;

    abstract remove(id: string): Promise<IProducto>;

}