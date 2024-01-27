import Observable from '../framework/observable.js';
import { updateItem } from '../utils/common.js';

export default class EventPointsModel extends Observable {
  #service = null;
  #eventPoints = [];

  constructor(service) {
    super();
    this.#service = service;
    this.#eventPoints = service.getEventPoints();
  }

  get eventPoints() {
    return this.#eventPoints;
  }

  getById(id) {
    return (
      this.#eventPoints.find((eventPoint) => eventPoint.id === id) || null
    );
  }

  update(updateType, point) {
    const updatedPoint = this.#service.updatePoint(point);
    this.#eventPoints = updateItem(this.#eventPoints, updatedPoint);
    this._notify(updateType, updatedPoint);
  }

  add(updateType, point) {
    const addedPoint = this.#service.addPoint(point);
    this.#eventPoints = [
      ...this.#eventPoints,
      addedPoint
    ];
    this._notify(updateType, addedPoint);
  }

  delete(updateType, point) {
    this.#service.deletePoint(point);
    this.#eventPoints = this.#eventPoints.filter((eventPoint) => eventPoint.id !== point.id);
    this._notify(updateType);
  }
}
