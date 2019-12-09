class Organization {
    constructor(name, memberList) {
        this.name = name;
        this.memberList = memberList;
    }
    getName() {
        return name;
    }
    setName(name){
        this.name = name;
    }
    getMemberList(){
        return this.memberList;
    }
    setMemberList(memberList) {
        this.memberList = memberList;
    }
    addMember(member){
        this.memberList.push(member);
    }

}