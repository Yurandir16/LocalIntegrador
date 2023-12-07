import { IsInt,IsString, IsUUID, Length, IsBoolean, IsNotEmpty, ValidateIf, IsIn, IsOptional,IsEmail} from 'class-validator';

export class ValidatorCreateRestaurant {

    @IsNotEmpty()
    @IsString()
    public name_local: string

    @IsNotEmpty()
    @IsString()
    public description: string;

    @IsNotEmpty()
    @IsString()
    public gender:string;

    @IsNotEmpty()
    @IsString()
    public image:string;

    @IsNotEmpty()
    @IsString()
    public address:string;

    @IsNotEmpty()
    @IsString()
    public coordinate:string;

    @IsNotEmpty()
    @IsBoolean()
    public status:boolean;

    @IsNotEmpty()
    @IsString()
    public user_id:string;

    constructor(
        name_local: string,
        description: string,
        gender:string,
        image: string,
        address: string,
        coordinate:string,
        status:boolean,
        user_id: string
    ){  
        this.name_local = name_local;
        this.description = description;
        this.gender = gender;
        this.image = image;
        this.address = address;
        this.coordinate = coordinate;
        this.status = status;
        this.user_id = user_id;
    }

}

export class ValidatorUpdateRestaurant {
    @IsNotEmpty()
    @IsString()
    public name_local: string

    @IsNotEmpty()
    @IsString()
    public description: string;

    @IsNotEmpty()
    @IsString()
    public gender:string;

    @IsNotEmpty()
    @IsString()
    public image:string;

    @IsNotEmpty()
    @IsString()
    public address:string;

    @IsNotEmpty()
    @IsString()
    public coordinate:string;

    @IsNotEmpty()
    @IsBoolean()
    public status:boolean;

    @IsOptional()
    @IsNotEmpty()
    @IsString()
    public user_id?:string;

    constructor(
        name_local: string,
        description: string,
        gender:string,
        image: string,
        address: string,
        coordinate:string,
        status:boolean,
        user_id?:string
    ){
        this.name_local = name_local;
        this.description = description;
        this.gender = gender;
        this.image = image;
        this.address = address;
        this.coordinate = coordinate;
        this.status = status;
        this.user_id=user_id;
    }

}

export class ValidationLocationGet{
    @IsNotEmpty()
    @IsString()
    public address:string;

    constructor(
        address:string
    ){
        this.address = address;
    }
}

export class ValidationInactive{
    @IsInt()
    public id:number;

    @IsBoolean()
    public status:boolean;

    constructor(
        id:number,
        status:boolean
    ){
        this.id = id;
        this.status = status;
    }
}

export class ValidationUserGet{
    @IsString()
    public user_id:string;

    constructor(
        user_id:string
    ){
        this.user_id = user_id;
    }
}

export class ValidationIdGet{
    @IsNotEmpty()
    @IsInt()
    public id:number;

    constructor(
        id:number
    ){
        this.id = id;
    }
}


