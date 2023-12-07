import { IsInt,IsString, IsUUID, Length, IsBoolean, IsNotEmpty, ValidateIf, IsIn, IsOptional,IsEmail} from 'class-validator';

export class ValidatorCreateCode {

    // @IsNotEmpty()
    // @IsInt()
    // public id: number;

    @IsNotEmpty()
    @IsString()
    public code1: string;

    @IsNotEmpty()
    @IsString()
    public code2: string;

    @IsNotEmpty()
    @IsString()
    public code3: string;

    @IsNotEmpty()
    @IsString()
    public email_id: string;

    constructor(
        code1:string,
        code2:string,
        code3:string,
        email_id:string
    ){
        this.code1 = code1;
        this.code2 = code2;
        this.code3 = code3;
        this.email_id = email_id;
    }

}

export class ValidateCodeByEmail {
    @IsNotEmpty()
    @IsString()
    public email_id: string;

    constructor(
        email_id:string
    ){
        this.email_id = email_id;
    }
}