export enum displayType { LineChart, BarChart, PieChart, Switch, BooleanDisplay };

export interface DisplayConfig {
    dId?: string,
    displayType: displayType,
    displaySize?: string,
    maxDataRepresentation: number, //max number of inputs to display
    refreshInterval: number,
    variableId: string,//id the user assign at device creation
    variableName: string,//name avaliable for the display instead of Id
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