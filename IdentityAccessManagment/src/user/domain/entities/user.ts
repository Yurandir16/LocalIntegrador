

export class User {
    constructor(
    public uuid: string,
    public name: string,
    public email: string,
    public phone_number: string,
    public password: string,
    ){}
}

export class ResponseLogin {
    constructor(
    public uuid: string,
    public name: string,
    public email: string,
    public phone_number: string,
    public token: string
    ){}
}
