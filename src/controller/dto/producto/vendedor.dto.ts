import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class IVendedorDTO {

    @IsNotEmpty()
    @IsString()
    @ApiProperty({ description: "Nombre del Vendedor"})
    readonly nombre: string;
    
    @IsNotEmpty()
    @IsString()
    @ApiProperty({ description: "Dirección del Vendedor"})
    readonly direccion: string;

    @IsNotEmpty()
    @IsString()
    @ApiProperty({ description: "Número de contacto del Vendedor"})
    readonly numeroContact: string;
    
    @IsNotEmpty()
    @IsString()
    @ApiProperty({ description: "Reputación del Vendedor"})
    readonly reputacion: string;

}