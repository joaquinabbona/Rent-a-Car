export interface Car {
    id : number;
    brand : string;
    model : string;
    price : number;
    year :  number;
    description : string;
    isForSale : boolean;
    available : boolean;
    imageUrl : string;
    // Agregarle sucursal al auto, que es donde se encuetra para asi en el form de  crear auto poder seleccionar la sucursal y en el 
    // select de acarreo ponerlo como selected esta sucursal y si lo deja en la misma que no cobre nada

}
