import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsNotEmpty, IsNumberString, IsOptional, IsString, ValidateNested } from "class-validator";
import { IVendedorDTO } from "./vendedor.dto";
import { Type } from "class-transformer";

export class IProductoDTO {

    @IsNotEmpty()
    @IsString()
    @ApiProperty({ description: "sku del producto"})
    readonly sku: string;

    @IsNotEmpty()
    @IsString()
    @ApiProperty({ description: "Título del producto"})
    readonly titulo: string;
    
    @IsNotEmpty()
    @IsString()
    @ApiProperty({ description: "Descripción del producto"})
    readonly descripcion: string;
    
    @IsNotEmpty()
    @IsNumberString()
    @ApiProperty({ description: "Precio del producto"})
    readonly precio: number;

    @IsNotEmpty()
    @IsArray()
    @ApiProperty({ description: "Método de pagos"})
    readonly metodos_pago: string [];

    @IsNotEmpty()
    @IsArray()
    @ApiProperty({ description: "Imagenes del producto"})
    readonly imagenes: string [];

    @IsNotEmpty()
    @IsString()
    @ApiProperty({ description: "Cantidad disponible del producto"})
    readonly cantidadDisaponible: number;

    @IsNotEmpty()
    @IsString()
    @ApiProperty({ description: "id de Categoria asignar del producto"})
    readonly categoria: string;

    @IsNotEmpty()
    @ApiProperty({ description: "información del vendedos"})
    @ValidateNested()
    @Type(() => IVendedorDTO)
    info_vendedor: IVendedorDTO;

   

}