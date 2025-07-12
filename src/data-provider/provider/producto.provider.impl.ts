import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { IProductoProvider } from "../producto.provider";
import { IProducto } from "src/core/entity/producto/producto.entity";
import { BusinessException } from "src/common/lib/business-exceptions";
import { CategoriaUcimpl } from "src/core/use-case/impl/categoria.uc.impl";
import { ICategoriaProvider } from "../categoria.provider";

const fs = require('fs');
const path = require('path');


@Injectable()
export class ProductoProvider implements IProductoProvider {

     constructor(
                public readonly _categoriaProvider: ICategoriaProvider,
    ) { }
    async getProductos(): Promise<IProducto[]> {
        
        const rutaArchivo = path.join(process.cwd(), 'productodb.json');
        let productos = [];

        try {
            
            if (fs.existsSync(rutaArchivo)) {
                // Si el archivo existe, leemos su contenido.
                const datosCrudos = fs.readFileSync(rutaArchivo, 'utf-8');
                // Si el archivo no está vacío, lo convertimos a un objeto JavaScript.
                if (datosCrudos) {
                productos = JSON.parse(datosCrudos);
                }
            }


        } catch (error) {
        console.error('❌ Error al procesar el archivo:', error);
        }

        return productos
    }
    async loadProducto(page: number, limit: number, filter: any, projection: any = {}): Promise<IProducto[]> {
        const result = await this.getProductos();
        return result;
    }
    async getProducto(id: string): Promise<IProducto> {
        const rutaArchivo = path.join(process.cwd(), 'productodb.json');
        let productos = [];

        try {
            
            if (fs.existsSync(rutaArchivo)) {
                // Si el archivo existe, leemos su contenido.
                const datosCrudos = fs.readFileSync(rutaArchivo, 'utf-8');
                // Si el archivo no está vacío, lo convertimos a un objeto JavaScript.
                if (datosCrudos) {
                productos = JSON.parse(datosCrudos);
                }
            }

            for (const produc of productos) {
                if (produc.sku == id) {
                    return produc
                }
            }

            return null;

        } catch (error) {
        console.error('❌ Error al procesar el archivo:', error);
        }

        return null;
    }
    async updateProducto(produc: IProducto): Promise<IProducto> {
        const rutaArchivo = path.join(process.cwd(), 'productodb.json');
        let productActualizado
        try {
            
            let productos = [];

            if (fs.existsSync(rutaArchivo)) {
                // Si el archivo existe, leemos su contenido.
                const datosCrudos = fs.readFileSync(rutaArchivo, 'utf-8');
                // Si el archivo no está vacío, lo convertimos a un objeto JavaScript.
                if (datosCrudos) {
                productos = JSON.parse(datosCrudos);
                }
            }

            for (const prod of productos) {

                if (prod.sku == produc.sku) {
                    prod.titulo = produc.titulo
                    prod.descripcion = produc.descripcion
                    prod.precio = produc.precio
                    prod.metodos_pago = produc.metodos_pago
                    prod.cantidadDisaponible = produc.cantidadDisaponible
                    prod.categoria = produc.categoria
                    prod.info_vendedor = produc.info_vendedor
                    productActualizado = prod
                }
            }

            // Convertimos el array completo de productos de nuevo a un string JSON formateado.
            const datosParaGuardar = JSON.stringify(productos, null, 2);

            // Escribimos el string actualizado de vuelta al archivo, sobrescribiendo el contenido anterior.
            fs.writeFileSync(rutaArchivo, datosParaGuardar, 'utf-8');

            console.log(`✅ Producto actualizado exitosamente a: ${rutaArchivo}`);

        } catch (error) {
        // Capturamos y mostramos cualquier error que pueda ocurrir durante el proceso.
        console.error('❌ Error al procesar el archivo:', error);
        }

        return productActualizado
    }
    async create(producto: IProducto): Promise<IProducto> {       

        const rutaArchivo = path.join(process.cwd(), 'productodb.json');
         const isExist = await this.getProducto(producto.sku);

         if (isExist) {
            throw new BusinessException(400, 'El sku del producto ya se encuentra registrado', true);            
         }

         const isCategoria = await this._categoriaProvider.getCategoria(producto.categoria)
         if (!isCategoria) {
            producto.categoria = '' 
         }
         
        try {
            
            let productos = [];

            if (fs.existsSync(rutaArchivo)) {
                // Si el archivo existe, leemos su contenido.
                const datosCrudos = fs.readFileSync(rutaArchivo, 'utf-8');
                // Si el archivo no está vacío, lo convertimos a un objeto JavaScript.
                if (datosCrudos) {
                productos = JSON.parse(datosCrudos);
                }
            }

            productos.push(producto);

            // Convertimos el array completo de productos de nuevo a un string JSON formateado.
            const datosParaGuardar = JSON.stringify(productos, null, 2);

            // Escribimos el string actualizado de vuelta al archivo, sobrescribiendo el contenido anterior.
            fs.writeFileSync(rutaArchivo, datosParaGuardar, 'utf-8');

            console.log(`✅ Producto agregado exitosamente a: ${rutaArchivo}`);

        } catch (error) {
            // Capturamos y mostramos cualquier error que pueda ocurrir durante el proceso.
            console.error('❌ Error al procesar el archivo:', error);
        }

        return producto
    
    }

    async remove(id: string): Promise<IProducto> {
        const rutaArchivo = path.join(process.cwd(), 'productodb.json');
        let productos = [];
        let productoEliminado
        let isExist = false

        try {
            
            if (fs.existsSync(rutaArchivo)) {
                // Si el archivo existe, leemos su contenido.
                const datosCrudos = fs.readFileSync(rutaArchivo, 'utf-8');
                // Si el archivo no está vacío, lo convertimos a un objeto JavaScript.
                if (datosCrudos) {
                productos = JSON.parse(datosCrudos);
                }
            }

            for (const produc of productos) {
                if (produc.sku == id) {
                    productoEliminado = produc
                    isExist = true 
                }
            }

            if (isExist) {
                const productosActualizados = productos.filter( product => product.sku !== id)

                const datosParaGuardar = JSON.stringify(productosActualizados, null, 2);

                fs.writeFileSync(rutaArchivo, datosParaGuardar, 'utf-8');
            }else{
                return null
            }
            return productoEliminado;

        } catch (error) {
            console.error('❌ Error al procesar el archivo:', error);
        }
    }
}