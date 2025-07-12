import { Injectable } from "@nestjs/common";
import { ICategoriaService } from "../categoria.service";
import { ICategoryDTO } from "src/controller/dto/categoria/categoria.dto";
import { ResponseService } from "src/controller/dto/response-service.dto";
import { ICategoriaUc } from "src/core/use-case/categoria.uc";
import { ICategoria } from "src/core/entity/categoria/categoria.entity";
import { EmessageMapping } from "src/common/utils/enums/message.enum";
import { ResponsePaginator } from "src/controller/dto/response-paginator.dto";

@Injectable()
export class CategoriaService implements ICategoriaService {

    constructor(private readonly _categoriaUC: ICategoriaUc  ) { }
    async findAll(page: number, limit: number) {
        const documents = await this._categoriaUC.getAll(1,100)
        return new ResponseService(true, EmessageMapping.DEFAULT, 200, new ResponsePaginator(documents, page, limit)); 
    }
    
    async create(createCategoriaDto: ICategoryDTO): Promise<ResponseService> {
        const result = await this._categoriaUC.create(createCategoriaDto);
        return new ResponseService(
            true,
            'Categoria creada correctamente.',
            200,
            result,
          );
    }

    async update(categoria: ICategoryDTO): Promise<ResponseService> {
        const result = await this._categoriaUC.update(categoria);
        return new ResponseService(
          true,
          'Categoria actualizada correctamente.',
          200,
          result,
        );
    }
    async getById(idCatego: string): Promise<ResponseService> {
        const result: ICategoria = await this._categoriaUC.getById(idCatego);
        return new ResponseService(
            true,
            result != null
            ? 'Consulta ejecutada correctamente.'
            : "No se encontró la categoria configurado con el Id "+ idCatego + ".",
            200,
            result,
        );
    }
    async remove(id: string): Promise<ResponseService> {
        const result: ICategoria = await this._categoriaUC.remove(id);
        return new ResponseService(
            true,
            'Categoria eliminada correctamente.',
            200,
            result,
          );
    }
    
    
}