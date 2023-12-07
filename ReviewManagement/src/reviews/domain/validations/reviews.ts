import { IsInt,IsString, IsUUID, Length, IsBoolean, IsNotEmpty, ValidateIf, IsIn, IsOptional,IsEmail} from 'class-validator';

export class ValidatorCreateReview {
    // @IsNotEmpty()
    // @IsInt()
    // public id: number;

    @IsNotEmpty()
    @IsString()
    @Length(1, 100)
    public message: string

    @IsNotEmpty()
    @IsUUID()
    public userId: string;

    @IsNotEmpty()
    @IsInt()
    public restauratId: number;

    constructor(
        // id: number,
        message: string,
        userId: string,
        restauratId: number,
    ){
        // this.id = id;
        this.message = message;
        this.userId = userId;
        this.restauratId = restauratId;
    }

}

export class ValidationRestaurantGet {
    @IsNotEmpty()
    @IsInt()
    public restaurantId:number;

    constructor(
        restaurantId:number
    ){
        this.restaurantId = restaurantId;
    }
}