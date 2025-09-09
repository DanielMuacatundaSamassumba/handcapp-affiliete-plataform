export class User {
    public id?: string
    public name?: string
    public phone: string
    public password?: string
    public createAt?: string
    public UpdateAt?: string

    constructor(
        props: User

    ) {
     this.name = props.name,
     this.phone = props.phone
     this.id = props.id
     this.createAt=props.createAt,
     this.UpdateAt =props.UpdateAt
    }
}