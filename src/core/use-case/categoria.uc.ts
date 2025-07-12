import { Injectable } from "@nestjs/common";
import { ICategoria } from "../entity/categoria/categoria.entity";

@Injectable()
export abstract class ICategoriaUc {
    /**
    * Función para cargar los mensajes en las variables estaticas
    */
    abstract loadCategoria(): Promise<any>;

    /**
    * Actualiza el mensaje
    * @param {ICategoria} categoria Objeto con información del mensaje
    */
    abstract update(categoria: ICategoria): Promise<ICategoria>;

    /** 
    * Consulta mensaje por Identificador
    * @param {string} idCategoria Identificador del mensaje
    */
    abstract getById(idCategoria: string): Promise<ICategoria>;

    abstract create(categoria: ICategoria): Promise<ICategoria>;

    abstract remove (id: string): Promise<ICategoria>;

    abstract getAll(page: number, limit: number): Promise<ICategoria[]>;

}