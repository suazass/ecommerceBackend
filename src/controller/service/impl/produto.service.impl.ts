import { Injectable } from "@nestjs/common";
import { IProductoService } from "../producto.service";
import { IProductoUc } from "src/core/use-case/producto.uc";
import { EmessageMapping } from "src/common/utils/enums/message.enum";
import { ResponseService } from "src/controller/dto/response-service.dto";
import { ResponsePaginator } from "src/controller/dto/response-paginator.dto";
import { IProducto } from "src/core/entity/producto/producto.entity";

@Injectable()
export class ProductoService implements IProductoService {

    constructor(private readonly _prodcutoUC: IProductoUc  ) { }
    async findAll(page: number, limit: number) {
        const documents = await this._prodcutoUC.getAll(1,100)
        return new ResponseService(true, EmessageMapping.DEFAULT, 200, new ResponsePaginator(documents, page, limit)); 
    }
    
    async create(createproduct: IProducto): Promise<ResponseService> {
        const result = await this._prodcutoUC.create(createproduct);
        if (result.categoria === '') {
            return new ResponseService(
            true,
            'Producto creada correctamente pero No se le asigno nínguna categoria valida, igualmente la puedes actualizar más adelante.',
            200,
            result,
          );
        }
        return new ResponseService(
            true,
            'Producto creado correctamente y categoria asignada.',
            200,
            result,
          );
    }

    async update(propducto: IProducto): Promise<ResponseService> {
        const result = await this._prodcutoUC.update(propducto);
        return new ResponseService(
          true,
          'Producto actualizado correctamente.',
          200,
          result,
        );
    }
    async getById(idproduct: string): Promise<ResponseService> {
        const result: IProducto = await this._prodcutoUC.getById(idproduct);
        return new ResponseService(
            true,
            result != null
            ? 'Consulta ejecutada correctamente.'
            : 'No se encontró el producto configurado con el Id ' + idproduct + '.',
            200,
            result,
        );
    }
    async remove(id: string): Promise<ResponseService> {
        const result: IProducto = await this._prodcutoUC.remove(id);
        if (result !==null) {
            return new ResponseService(
            true,
            'Producto eliminado correctamente.',
            200,
            result,
          );
        }
        return new ResponseService(
            true,
            'Id del producto no encontrado.',
            404,
            result,
          );
    }
    
    
}