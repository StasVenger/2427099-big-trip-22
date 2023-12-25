export default class DestinationModel {
  #destinations = [];

  constructor(service) {
    this.#destinations = service.getDestinations();
  }

  get destinations() {
    return this.#destinations;
  }

  getById(id) {
    return (
      this.#destinations.find((destination) => destination.id === id)
    );
  }
}
