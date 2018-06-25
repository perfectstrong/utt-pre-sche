import moment from "moment";

export default class UE {
  /**
   * 
   * @param {Object} data 
   * @param {String} data.codename in guide d'UE
   * @param {Array.<String>} data.type "CS", "TM", "EC", "ME", "CT", "TC", "GI", "GM", "HT", "ISI", "MST", "MTE", "RT"
   * @param {Array.<Class>} data.classes
   */
  constructor(data) {
    this.codename = data.codename;
    this.type = data.type;
    this.classes = data.classes.map(c => new Class(c, this.codename));
  }
}

class Class {
  /**
   * 
   * @param {Object} data 
   * @param {String} data.type "CM", "TD" or "TP"
   * @param {Number} data.group to distinguish among classes of same UE, for example, one UE can have multiple TD groups
   * @param {Number} data.onWeekday 2 to 7
   * @param {String} data.startTime 4 digits, HHmm
   * @param {String} data.endTime 4 digits, HHmm
   * @param {String} data.room 1 letter, 3 digits
   * @param {String} data.onWeek "A" or "B" or undefined
   * @param {String} codename of ue
   */
  constructor(data, codename) {
    this.group = data.group;
    this.type = data.type;
    this.onWeekday = data.onWeekday - 1;
    this.startTime = moment(data.startTime, "HHmm");
    this.startTime.day(this.onWeekday);
    this.endTime = moment(data.endTime, "HHmm");
    this.endTime.day(this.onWeekday);
    this.room = data.room;
    this.onWeek = data.onWeek;
    this.ue = codename;
  }
}