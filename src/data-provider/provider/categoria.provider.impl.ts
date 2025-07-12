import { Injectable } from "@nestjs/common";
import { ICategoriaProvider } from "../categoria.provider";
import { ICategoria } from "src/core/entity/categoria/categoria.entity";
import { InjectModel } from "@nestjs/mongoose";
import { CategoriaModel } from "../model/categoria/categoria.model";
import { Model } from "mongoose";
import { BusinessException } from "src/common/lib/business-exceptions";

const fs = require('fs');
const path = require('path');
@Injectable()
export class CategoriaProvider implements ICategoriaProvider {

    constructor(
        @InjectModel(CategoriaModel.name) private readonly categoriaModel: Model<CategoriaModel>
    ) { }

    async remove(id: string): Promise<ICategoria> {
       const rutaArchivo = path.join(process.cwd(), 'categoriasdb.json');
        let categorias = [];
        let categoriaEliminada
        let isExist = false

        try {
            
            if (fs.existsSync(rutaArchivo)) {
                // Si el archivo existe, leemos su contenido.
                const datosCrudos = fs.readFileSync(rutaArchivo, 'utf-8');
                // Si el archivo no está vacío, lo convertimos a un objeto JavaScript.
                if (datosCrudos) {
                categorias = JSON.parse(datosCrudos);
                }
            }

            for (const cate of categorias) {
                if (cate.id == id) {
                    categoriaEliminada = cate
                    isExist = true 
                }
            }

            if (isExist) {
                const productosActualizados = categorias.filter( catego => catego.id !== id)

                const datosParaGuardar = JSON.stringify(productosActualizados, null, 2);

                fs.writeFileSync(rutaArchivo, datosParaGuardar, 'utf-8');
            }else{
                return null
            }
            return categoriaEliminada;

        } catch (error) {
            console.error('❌ Error al procesar el archivo:', error);
        }
    }
        
    async getCategorias(page: number, limit: number, filter: any, projection: any = {}): Promise<ICategoria[]> {
        const rutaArchivo = path.join(process.cwd(), 'categoriasdb.json');
        let categoorias = [];

        try {
            
            if (fs.existsSync(rutaArchivo)) {
                // Si el archivo existe, leemos su contenido.
                const datosCrudos = fs.readFileSync(rutaArchivo, 'utf-8');
                // Si el archivo no está vacío, lo convertimos a un objeto JavaScript.
                if (datosCrudos) {
                categoorias = JSON.parse(datosCrudos);
                }
            }


        } catch (error) {
        console.error('❌ Error al procesar el archivo:', error);
        }

        return categoorias
    }
    async loadCategorias(page: number, limit: number, filter: any,  projection: any = {}): Promise<ICategoria[]> {
        const result = await this.getCategorias(page, limit, filter, projection );
        return result;
    }
    async getCategoria(id: string): Promise<ICategoria> {
        const rutaArchivo = path.join(process.cwd(), 'categoriasdb.json');
        let categorias = [];

        try {
            
            if (fs.existsSync(rutaArchivo)) {
                // Si el archivo existe, leemos su contenido.
                const datosCrudos = fs.readFileSync(rutaArchivo, 'utf-8');
                // Si el archivo no está vacío, lo convertimos a un objeto JavaScript.
                if (datosCrudos) {
                categorias = JSON.parse(datosCrudos);
                }
            }

            for (const catego of categorias) {
                if (catego.id == id) {
                    return catego
                }
            }

            return null;

        } catch (error) {
        console.error('❌ Error al procesar el archivo:', error);
        }

        return null;
    }
    async updateCategoria(categoria: ICategoria): Promise<ICategoria> {
        const rutaArchivo = path.join(process.cwd(), 'categoriasdb.json');
        let categoriaActualizada
        try {
            
            let categorias = [];

            if (fs.existsSync(rutaArchivo)) {
                // Si el archivo existe, leemos su contenido.
                const datosCrudos = fs.readFileSync(rutaArchivo, 'utf-8');
                // Si el archivo no está vacío, lo convertimos a un objeto JavaScript.
                if (datosCrudos) {
                categorias = JSON.parse(datosCrudos);
                }
            }

            for (const prod of categorias) {

                if (prod.id == categoria.id) {
                    prod.name = categoria.name
                    prod.description = categoria.description
                    categoriaActualizada = prod
                }
            }

            // Convertimos el array completo de productos de nuevo a un string JSON formateado.
            const datosParaGuardar = JSON.stringify(categorias, null, 2);

            // Escribimos el string actualizado de vuelta al archivo, sobrescribiendo el contenido anterior.
            fs.writeFileSync(rutaArchivo, datosParaGuardar, 'utf-8');

            console.log(`✅ Categoria actualizada exitosamente a: ${rutaArchivo}`);

        } catch (error) {
        // Capturamos y mostramos cualquier error que pueda ocurrir durante el proceso.
        console.error('❌ Error al procesar el archivo:', error);
        }

        return categoriaActualizada
    }
    async create(categoria: ICategoria): Promise<ICategoria> {

         const rutaArchivo = path.join(process.cwd(), 'categoriasdb.json');
         const isExist = await this.getCategoria(categoria.id);
         if (isExist) {
            throw new BusinessException(400, 'El id de la categoria ya se encuentra registrado', true);            
         }

        try {
            
            let categorias = [];

            if (fs.existsSync(rutaArchivo)) {
                // Si el archivo existe, leemos su contenido.
                const datosCrudos = fs.readFileSync(rutaArchivo, 'utf-8');
                // Si el archivo no está vacío, lo convertimos a un objeto JavaScript.
                if (datosCrudos) {
                categorias = JSON.parse(datosCrudos);
                }
            }

            categorias.push(categoria);

            // Convertimos el array completo de productos de nuevo a un string JSON formateado.
            const datosParaGuardar = JSON.stringify(categorias, null, 2);

            // Escribimos el string actualizado de vuelta al archivo, sobrescribiendo el contenido anterior.
            fs.writeFileSync(rutaArchivo, datosParaGuardar, 'utf-8');

            console.log(`✅ Categoria agregado exitosamente a: ${rutaArchivo}`);

        } catch (error) {
        // Capturamos y mostramos cualquier error que pueda ocurrir durante el proceso.
        console.error('❌ Error al procesar el archivo:', error);
        }

        return categoria
    }

}
