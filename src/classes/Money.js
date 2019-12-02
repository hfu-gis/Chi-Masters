class Money {
    constructor(value, description, date, payed) {
        this.value = value;
        this.description = description;
        this.date = date;
        this.payed = payed;
    }
    getValue(){
        return this.value;
    }
    setValue(value){
        this.value = value;
    }
    getDescription() {
        return this.description;
    }
    setDescription(description){
        this.description = description;
    }
    getDate() {
        return this.date;
    }
    setDate(date) {
        this.date = date;
    }
    getPayed() {
        return this.payed;
    }
    setPayed(payed){
        this.payed = payed;
    }

}