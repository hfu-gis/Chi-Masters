class Event {
    constructor(name, description, date, memberList) {
        this.name = name;
        this.description = description;
        this.date = date;
        this.memberList = memberList;
    }
    getName() {
        return this.name;
    }
    setName(name){
        this.name = name;
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
    setDate(date){
        this.date = date;
    }
    getMemberList() {
        return this.memberList;
    }
    setMemberList(memberList){
        this.memberList = memberList;
    }
}