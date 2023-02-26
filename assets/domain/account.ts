export type Account = {
  firstname: String | null
  lastname: String | null
  email: String | null
  password: String | null
}

export class AccountService {
  account: Account

  constructor(
    account: Account,
  ) {
    this.account = account
  }

  createAccount() {
    console.log('Account created', this.account);


  }

}