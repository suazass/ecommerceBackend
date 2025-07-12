import { IVendedor } from "./vendedor.entity";

export interface IProducto {
    sku: string;
    titulo: string;
    descripcion: string;
    precio: number;
    imagenes: string[];
    metodos_pago: string[];
    cantidadDisaponible: number;
    categoria: string;
    info_vendedor: IVendedor
}