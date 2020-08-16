import { observable, action, runInAction } from 'mobx';

import IAlert from "./models/interfaces/Alert/IAlert";
import IAlertStore from "./models/interfaces/Alert/IAlertStore";

class AlertStore implements IAlertStore {
  @observable alerts: IAlert[] = [];

  @action addAlert = (alert : IAlert) => {
    this.alerts.push(alert);
    setTimeout(() => {
      runInAction(() => {
        this.removeAlert(alert.id)
      })
    }, alert.duration)
  }

  removeAlert = (id: number) => {
    const index = this.alerts.findIndex(alert => alert.id === id);
    if(index === -1) return;
    this.alerts.splice(index, 1);
  }
}

export default new AlertStore();