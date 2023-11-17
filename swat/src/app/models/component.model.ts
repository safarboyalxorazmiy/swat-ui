export interface IComponent {
    id?:number;
    code?:string,
    name?:string,
    checkpoint_id?:number,
    checkpoint?:string
    unit?:string,
    specs?:string,
    weight?:number;
    photo?: string,
    time?:string,
    type?:string,
    type_id?:number,
    available?: number
    component_id?: number
    quantity?:number
    inner_code?: string

}

export interface IGPComponent{
    id?: number
    code?: string
    name?: string
    specs?: string
}