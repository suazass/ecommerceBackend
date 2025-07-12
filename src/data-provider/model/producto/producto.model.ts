import { Prop, SchemaFactory, Schema } from "@nestjs/mongoose";
import { Document } from 'mongoose';

@Schema({ versionKey: false })
export class ProductoModel extends Document{ 

    @Prop()
    nombre: string;

    @Prop()
    precio: number;  
    
    @Prop()
    cantidad: number;

    @Prop()
    categoria: string

}

export const ProductoSchema = SchemaFactory.createForClass(ProductoModel);