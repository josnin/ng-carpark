

    export interface Value {
        CarParkID: string;
        Area: string;
        Development: string;
        Location: string;
        AvailableLots: number;
        LotType: string;
        Agency: string;
    }

    export interface RootObject {
        "odata.metadata": string;
        value: Value[];
    }





