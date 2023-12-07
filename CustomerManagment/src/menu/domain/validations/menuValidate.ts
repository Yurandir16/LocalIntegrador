import { IsInt,IsString, IsUUID, Length, IsBoolean, IsNotEmpty, ValidateIf, IsIn, IsOptional,IsEmail} from 'class-validator';

export class ValidatorCreateMenu {

    @IsNotEmpty()
    @IsString()
    public pdf: string

    @IsNotEmpty()
    @IsInt()
    public restaurant_id: number;

    constructor(
        pdf: string,
        restaurant_id: number,
    ){
        this.pdf = pdf;
        this.restaurant_id = restaurant_id;
    }

}

export class ValidatorUpdateMenu {

    @IsNotEmpty()
    @IsString()
    public pdf: string

    @IsNotEmpty()
    @IsInt()
    public restaurant_id: number;

    constructor(
        pdf: string,
        restaurant_id: number,
    ){
        this.pdf = pdf;
        this.restaurant_id = restaurant_id;
    }

}

export class ValidationGetMenu{
 
    @IsNotEmpty()
    @IsInt()
    public restaurant_id: number;

    constructor(
        restaurant_id: number,
    ){
        this.restaurant_id = restaurant_id;
    }
}
