export default class UE {
  /**
   * 
   * @param {Object} data 
   * @param {String} data.codename in guide d'UE
   * @param {String} data.type "CS", "TM", "EC", "ME", "CT" or "HP"
   * @param {Array.<Class>} data.classes
   */
  constructor(data) {
    this.codename = data.codename;
    this.type = data.type;
    this.classes = data.classes.map(c => new Class(c));
  }
}

class Class {
  /**
   * 
   * @param {Object} data 
   * @param {String} data.type "CM", "TD" or "TP"
   * @param {Number} data.group to distinguish among classes of same UE, for example, one UE can have multiple TD groups
   * @param {Number} data.onWeekday 1 to 7
   * @param {String} data.startTime 4 digits
   * @param {String} data.endTime 4 digits
   * @param {String} data.room 1 letter, 3 digits
   */
  constructor(data) {
    this.group = data.group;
    this.onWeekday = data.onWeekday;
    this.startTime = data.startTime;
    this.endTime = data.endTime;
    this.room = data.room;
  }
}