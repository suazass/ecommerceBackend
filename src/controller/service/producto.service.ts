import { Injectable } from "@nestjs/common";
import { ResponseService } from "../dto/response-service.dto";
import { IProductoDTO } from "../dto/producto/producto.dto";

@Injectable()
export abstract class IProductoService {

  /**  
    * Crear una producto 
    * @param {ICategoryDTO} createproductDto arreglo con información de producto
    */
  abstract create(createproductDto: IProductoDTO): Promise<ResponseService>;

    /** 
     * Actualiza un producto
     * @param {ICategoryDTO} product Información asociada al producto
     */
    abstract update(product: IProductoDTO): Promise<ResponseService>;

    /**
     * Consulta producto por nombre
     * @param {string} name Identificador del producto
     */
    abstract getById(name: string): Promise<ResponseService>;

    /**
    * Elimina un producto por Nombre
    * @param {number} name Identificador de un producto
    */
    abstract remove(name: string): Promise<ResponseService>;

  /**
    * Consulta todos los productos segun el filtro
    * @param {number} page Cantidad de registros por página
    * @param {number} limit Número de página a consultar
    */
  abstract findAll(page: number, limit: number);
}