import { Injectable } from "@nestjs/common";
import { ICategoriaUc } from "../categoria.uc";
import { ICategoria } from "src/core/entity/categoria/categoria.entity";
import Logging from "src/common/lib/logging";
import { ICategoriaProvider } from "src/data-provider/categoria.provider";
import { Etask } from "src/common/utils/enums/taks.enum";
import { ELevelsErros } from "src/common/utils/enums/logging.enum";
import { BusinessException } from "src/common/lib/business-exceptions";

@Injectable()
export class CategoriaUcimpl implements ICategoriaUc {

    private static cate: ICategoria[] = [];
    private readonly logger = new Logging(CategoriaUcimpl.name);

        constructor(
            public readonly _categoriaProvider: ICategoriaProvider,
        ) { }
    async getAll(page: number, limit: number): Promise<any> {
        return await this._categoriaProvider.getCategorias(1, 100, {});
    }
    async loadCategoria(): Promise<any> {
        let catego: ICategoria[] = [];
        try {
            catego = await this._categoriaProvider.getCategorias(1, 100, {});
        } catch (error) {
            this.logger.write(`Error cargando mensajes`, Etask.LOAD_MESSAGE, ELevelsErros.WARNING, error);
        } finally {
            // Actualizar variable estática
            CategoriaUcimpl.cate = catego;
        }
    }
    async update(categoria: ICategoria): Promise<ICategoria> {
        const result = await this._categoriaProvider.updateCategoria(categoria);
        if (result == null)
            throw new BusinessException(400, 'No existe la categoria con el código indicado', true);

        // Si se actualiza en bd, actualizar variable estática
        const categoPosition = CategoriaUcimpl.cate.findIndex(msg => msg.id === categoria.id);
        CategoriaUcimpl.cate[categoPosition] = categoria;

        return result;
    }

    async getById(idCategoria: string): Promise<ICategoria> {
        return this._categoriaProvider.getCategoria(idCategoria);
    }
    async create(categoria: ICategoria): Promise<ICategoria> {
        return this._categoriaProvider.create(categoria);
    }
    async remove(id: string): Promise<ICategoria> {
        return this._categoriaProvider.remove(id);
    }
}