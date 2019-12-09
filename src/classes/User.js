class User {

    constructor(email, firstname, lastname, role, moneyList, eventList) {
        this.email = email;
        this.firstname = firstname;
        this.lastname = lastname;
        this.role = role;
        this.moneyList = moneyList;
        this.eventList = eventList;
    }

    getEmail() {
        return this.email;
    }
    setEmail(email){
        this.email = email;
    }
    getFirstname() {
        return this.firstname;
    }
    setFirstname(firstname) {
        this.firstname = firstname;
    }
    getLastname() {
        return this.lastname;
    }
    setLastname(lastname) {
        this.lastname = lastname;
    }
    getRole() {
        return this.role;
    }
    setRole(role) {
        this.role = role;
    }
    getMoneyList() {
        return this.moneyList;
    }
    setMoneyList(moneyList){
        this.moneyList = moneyList;
    }
    getEventList() {
        return this.eventList;
    }
    setEventList(eventList) {
        this.eventList = eventList;
    }
    addEvent(event) {
        this.eventList.push(event);
    }
    removeEvent(event) {
        this.eventList.remove(event);
    }
}