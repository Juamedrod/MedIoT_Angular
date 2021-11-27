export enum displayType { LineChart, BarChart, PieChart, Switch, BooleanDisplay };

export interface DisplayConfig {
    displayType: displayType,
    maxDataRepresentation: number, //max number of inputs to display
    refreshInterval: number,
    variableName: string,
    color: string,//rba string for color representation
    backgroundColorRGBA: string,
    /**
     * Line specifics
     */
    chartName?: string,
    fillArea?: boolean,
    tension?: number,
    /**
     * Bar Type Specifics
     */
    borderWidth?: number
    /**
     * Pie Specifics
     */
    colors?: string[],
    scaleWithHover?: number,
    /**
     * Switch Specifics
     */




}