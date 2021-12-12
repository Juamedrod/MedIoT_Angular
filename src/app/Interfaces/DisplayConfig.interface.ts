export enum displayType { LineChart, BarChart, PieChart, Switch, BooleanDisplay, PolarArea };
export const UNITS: string[] = ['ºC', '%', 'K', 'Kg', 'g', 'mg', 'µg', 'm', 'cm', 'km', 'mol', 'lumen', 's', 'h', 'm', 'V', 'A', 'W', 'Wh', 'R', 'N', 'Pa', 'KPa', 'J', 'm*m', 'm*m*m'];

export interface DisplayConfig {
    _id?: string;
    dId?: string;
    displayType: displayType;
    displaySize?: string;
    maxDataRepresentation: number; //max number of inputs to display
    refreshInterval: number;
    variableId: string;//id the user assign at device creation
    variableName: string;//name avaliable for the display instead of Id
    color: string;//rba string for color representation
    backgroundColorRGBA: string;
    /**
     * Line specifics
     */
    chartName?: string;
    fillArea?: boolean;
    tension?: number;
    unit?: string;
    /**
     * Bar Type Specifics
     */
    borderWidth?: number;
    /**
     * Pie Specifics
     */
    colors?: string[];
    scaleWithHover?: number;
    /**
     * PolarArea
     */
    //Polar have only colors as attribute, share this setting with Pie

}