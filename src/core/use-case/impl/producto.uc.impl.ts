import { Injectable } from "@nestjs/common";
import { IProductoUc } from "../producto.uc";
import { IProducto } from "src/core/entity/producto/producto.entity";
import { Etask } from "src/common/utils/enums/taks.enum";
import { BusinessException } from "src/common/lib/business-exceptions";
import Logging from "src/common/lib/logging";
import { ELevelsErros } from "src/common/utils/enums/logging.enum";
import { CategoriaUcimpl } from "./categoria.uc.impl";
import { IProductoProvider } from "src/data-provider/producto.provider";

@Injectable()
export class ProductoUcimpl implements IProductoUc {

    private static producto: IProducto[] = [];
    private readonly logger = new Logging(CategoriaUcimpl.name);

        constructor(
            public readonly _productoProvider: IProductoProvider,
        ) { }
    async loadProducto(): Promise<any> {
        let product: IProducto[] = [];
        try {
            product = await this._productoProvider.getProductos();
        } catch (error) {
            this.logger.write(`Error cargando mensajes`, Etask.LOAD_MESSAGE, ELevelsErros.WARNING, error);
        } finally {
            // Actualizar variable estática
            ProductoUcimpl.producto = product;
        }
    }

    async getAll(page: number, limit: number): Promise<any> {
        return await this._productoProvider.getProductos();
    }

    async update(product: IProducto): Promise<IProducto> {
        const result = await this._productoProvider.updateProducto(product);
        if (result == null)
            throw new BusinessException(404, 'No existe el producto con el sku indicado', true);

        // Si se actualiza en bd, actualizar variable estática
        const prodtPosition = ProductoUcimpl.producto.findIndex(msg => msg.sku === product.sku);
        ProductoUcimpl.producto[prodtPosition] = product;

        return result;
    }

    async getById(idCategoria: string): Promise<IProducto> {
        return this._productoProvider.getProducto(idCategoria);
    }
    async create(categoria: IProducto): Promise<IProducto> {
        return this._productoProvider.create(categoria);
    }
    async remove(id: string): Promise<IProducto> {
        return this._productoProvider.remove(id);
    }
}