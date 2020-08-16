import { createContext } from "react";
import { observable, action, runInAction } from 'mobx';

import IAlert from "./models/interfaces/IAlert";

class AlertStore {
  @observable alerts: IAlert[] = [];

  @action addAlert = (alert : IAlert) => {
    this.alerts.push(alert);
    setTimeout(() => {
      runInAction(() => {
        this.removeAlert(alert.id)
      })
    }, alert.duration)
  }

  private removeAlert = (id: number) => {
    const index = this.alerts.findIndex(alert => alert.id === id);
    if(index === -1) return;
    this.alerts.splice(index, 1);
  }
}

export default createContext(new AlertStore());