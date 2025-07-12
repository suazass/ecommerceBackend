import { Injectable } from "@nestjs/common";
import { IProducto } from "../entity/producto/producto.entity";

@Injectable()
export abstract class IProductoUc {
    /**
    * Función para cargar los mensajes en las variables estaticas
    */
    abstract loadProducto(): Promise<any>;

    /**
    * Actualiza el mensaje
    * @param {IProducto} producto Objeto con información del mensaje
    */
    abstract update(producto: IProducto): Promise<IProducto>;

    /** 
    * Consulta mensaje por Identificador
    * @param {string} idproducto Identificador del mensaje
    */
    abstract getById(idproducto: string): Promise<IProducto>;

    abstract create(producto: IProducto): Promise<IProducto>;

    abstract remove (id: string): Promise<IProducto>;

    abstract getAll(page: number, limit: number): Promise<IProducto[]>;

}