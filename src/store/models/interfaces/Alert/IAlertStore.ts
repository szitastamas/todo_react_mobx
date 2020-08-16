import IAlert from "./IAlert";

export default interface IAlertStore{
  alerts: IAlert[],
  addAlert: (alert: IAlert) => void,
}