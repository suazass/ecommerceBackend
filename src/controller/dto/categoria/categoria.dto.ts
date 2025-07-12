import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class ICategoryDTO {

    @IsNotEmpty()
    @IsString()
    @ApiProperty({ description: "Message ID"})
    readonly id: string;
    
    @IsNotEmpty()
    @IsString()
    @ApiProperty({ description: "This is a description the cartegory"})
    readonly description: string;

    @IsNotEmpty()
    @IsString()
    @ApiProperty({ description: "This is mane"})
    readonly name: string;

}