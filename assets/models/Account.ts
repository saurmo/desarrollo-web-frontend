
export enum Role { "Student", "Admin" }

export class Account {
    firstname: string = ""
    lastname: string = ""
    email: string = ""
    pass: string = ""
    polity: string = ""
    id: string = ""
    role: Role = Role.Student
    create_date: Date = new Date();



    static createAccount(infoForm: any): Account {
        const myAccount = new Account()
        myAccount.id = infoForm["id"]
        myAccount.firstname = infoForm["firstname"]
        myAccount.lastname = infoForm["lastname"]
        myAccount.email = infoForm["email"]
        myAccount.pass = infoForm["pass"]
        myAccount.polity = infoForm["polity"]
        myAccount.role = Role.Student
        myAccount.create_date = new Date()
        return myAccount;
    }

    getPathAfterLogin(account: Account): string {
        const {id, firstname, lastname, email, role} = account
        localStorage.setItem("ACCOUNT", JSON.stringify({id, firstname, lastname, email, role}))
        if (account.role.toString() == Role.Student.toString()) {
            return "/students/home"
        } else {
            return "/home"
        }
    }

}