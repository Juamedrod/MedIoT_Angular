import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DisplayConfig, displayType } from 'src/app/Interfaces/DisplayConfig.interface';
import { msgType } from 'src/app/Interfaces/message.interface';
import { MessagesSystemService } from 'src/app/Services/messages-system.service';
import { RealtimeService } from 'src/app/Services/realtime.service';

@Component({
  selector: 'switch',
  templateUrl: './switch.component.html',
  styleUrls: ['./switch.component.css']
})
export class SwitchComponent implements OnInit {
  @Input() displayConfig: DisplayConfig;
  variableState!: boolean;

  constructor(private realtimeService: RealtimeService, private messageService: MessagesSystemService) {
    this.displayConfig = {
      displayType: displayType.Switch,
      maxDataRepresentation: 10, //max number of inputs to display
      refreshInterval: 1000,
      variableId: 'testId',
      variableName: 'DefaultName',
      color: 'rgb(29, 140, 248)',//rba string for color representation
      backgroundColorRGBA: 'rgba(29, 140, 248, 0.1)',
      fillArea: true
    }
    // this.variableState = false;
  }

  async ngOnInit() {
    this.variableState = await this.realtimeService.getBooleanToggleState({ dId: this.displayConfig.dId!, varName: this.displayConfig.variableId });
  }

  changeState($event: any) {
    try {
      this.variableState = $event.target.checked
      const varState = {
        dId!: this.displayConfig.dId!,
        varName!: this.displayConfig.variableId,
        varValue!: this.variableState,
      }
      this.realtimeService.editBooleanToggle(varState);
      this.messageService.newMessage({ message: 'State changed successfully to: ' + this.variableState, messageType: msgType.success });
    } catch (error) {
      this.messageService.newMessage({ message: 'Error,Try again.', messageType: msgType.error });
    }
  }
}
