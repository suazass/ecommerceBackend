import { Injectable } from "@nestjs/common";
import { ICategoryDTO } from "../dto/categoria/categoria.dto";
import { ResponseService } from "../dto/response-service.dto";

@Injectable()
export abstract class ICategoriaService {

  /**  
    * Crear una categoria 
    * @param {ICategoryDTO} createCategoriaDto arreglo con información de categoria
    */
  abstract create(createCategoriaDto: ICategoryDTO): Promise<ResponseService>;

    /** 
     * Actualiza un catategoria
     * @param {ICategoryDTO} categoria Información asociada a la categoria
     */
    abstract update(categoria: ICategoryDTO): Promise<ResponseService>;

    /**
     * Consulta categoria por Id
     * @param {string} idCatego Identificador del mensaje
     */
    abstract getById(idCatego: string): Promise<ResponseService>;

    /**
    * Elimina una categoria por Id
    * @param {number} id Identificador de la categoria
    */
    abstract remove(id: string): Promise<ResponseService>;

  /**
    * Consulta todos las categoria segun el filtro
    * @param {number} page Cantidad de registros por página
    * @param {number} limit Número de página a consultar
    */
  abstract findAll(page: number, limit: number);
}