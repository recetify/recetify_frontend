export class userEntity {
    //constructor(id= '', username= '', email='', birthdate='', objective=null, password='') {
    //    this.id = id;
    //    this.username = username;
    //   this.email = email;
    //    this.birthdate = birthdate;
    //    this.objective=objective;
    //    this.password=password;
    //}

    constructor(id= '', username= '', password='', email='', description='', objective=null) {
        this.id = id;
        this.username = username;
        this.password=password;
        this.email = email;
        this.description = description;

    }
}