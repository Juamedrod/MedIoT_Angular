export enum displayType { LineChart, BarChart, PieChart, Switch, BooleanDisplay };
export const sizes = new Map([['small', 'col-md-3'], ['medium', 'col-md-6'], ['large', 'col-md-12']]);

export interface DisplayConfig {
    displayType: displayType,
    displaySize?: string,
    maxDataRepresentation: number, //max number of inputs to display
    refreshInterval: number,
    variableId: string,
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





}