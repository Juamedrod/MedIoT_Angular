### Documentation for Mediot Project
## This is the main doc for the related project.

## Routes
App routing and permissions
# Public Routes
This are the routes for public access. No Auth required.
```Typescript
  { path: '', pathMatch: 'full', redirectTo: '/login' },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'aboutus', component: AboutUsComponent },
```
# Private Routes (Auth Routes)
```Typescript
  {
    path: 'dashboard', component: DashboardComponent, children: [
      { path: '', pathMatch: 'full', component: BlackboardComponent },
      { path: 'blackboard', component: BlackboardComponent },
      { path: 'profile', component: ProfileComponent },
    ]
  },
```

## Dependencies

## BlackBoard and chart component relationship.
Blackboard honor its name,there is a deep relationship with the chart component, because chart can morph into diferent kind of displays based on the nature of its associatted variable.
Blackboard feed chart with the attributes needed to display the variable realtime feed, and set the position within its neighboor components.




## Interfaces for every chart type
Created interfaces for an easier configuration set up, with blank charts ready to be filled under any of the types, just push the labels and data directly into the chart and update it for display. This allow for a Realtime representation of the data and an easier way to handle data with a high level of abstraction.
```typescript
export interface lineChartConfig {
    variableName: string;
    color: string;
    fillArea: boolean;
    tension: number
}

/**
 * BAR CHART
 */

export interface barChartConfig {
    variableName: string;
    color: string;
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
```
## Inputs for every Display Type

# Inputs for boolean-display
```Typescript
  @Input() variableId: string;
  @Input() variableState: boolean;
  @Input() variableNickname: string;
```
# Inputs for Switch
```Typescript
  @Input() variableId: string;
  @Input() variableState: boolean;
  @Input() variableNickname: string;
  @Output() switchState: EventEmitter<any>;
```

## Devices
Added devices capabilities to add and remove them easily. With a comprehensive UI that direct you easily to a fast to use configuration.

Devices component make use of devicesService to feed data into it and command the CRUD for devices.
