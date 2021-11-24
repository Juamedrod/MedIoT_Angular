/**
 * LINE CHART
 */

export interface lineChartConfig {
    chartName?: string;
    variableName: string;
    color: string;
    backgroundColorRGBA: string;
    fillArea: boolean;
    tension: number
}

/**
 * BAR CHART
 */

export interface barChartConfig {
    variableName: string;
    color: string;
    backgroundColorRGBA: string;
    borderWidth: number
}

/**
 * PIE CHART
 */

export interface pieChartConfig {
    variableName: string;
    colors: string[];
    scaleWithHover: number
}