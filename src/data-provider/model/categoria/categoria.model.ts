import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({versionKey: false})
export class CategoriaModel extends Document{ 

    @Prop()
    id: string;

    @Prop()
    description: string;

    @Prop()
    name: string

}

export const CategoriaSchema = SchemaFactory.createForClass(CategoriaModel);
