// Different states of authorization: None set, authorized to enter, or unauthorized
export class AuthState {
    static Unknown = new AuthState("unknown");
    static Authorized = new AuthState("authorized");
    static Unauthorized = new AuthState("unauthorized");

    constructor(name) {
        this.name = name;
    }
};