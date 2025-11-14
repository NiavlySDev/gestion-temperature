import { Injectable } from "@angular/core";
import { User } from "./User";
import data from "../data/users.json";
import { UserType } from "./UserType";

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    Login : string = "";
    Password : string = "";

    Utilisateur : User | null = null;

    Logged : boolean = false;

    constructor() {
        const userJson = window.sessionStorage.getItem("user");
        if(userJson) {
            const userObj = JSON.parse(userJson);
            this.Utilisateur = new User(
                userObj.id,
                userObj.name,
                userObj.firstName,
                userObj.login,
                userObj.password,
                userObj.age
            );
            this.Login = userObj.login;
            this.Password = userObj.password;
            this.Logged = true;
        }
        else{
            this.Utilisateur = null;
            this.Logged = false;
            this.Login = "";
            this.Password = "";
        }
    }

    getUtilisateur(): User | null {
        return this.Utilisateur;
    }

    public getLogin(): string {
        return this.Login;
    }

    public setLogin(login: string) {
        this.Login = login;
    }

    public getPassword(): string {
        return this.Password;
    }

    public setPassword(password: string) {
        this.Password = password;
    }

    public isLogged(): boolean {
        return this.Logged;
    }

    public login(login: string, password: string) {
        if(login === "" || password === "") {
            return;
        }
        /* Recherche de l'utilisateur dans le json */

        const result = data.find(item => item.login === login);
        if(result && result.password === password) {
            this.Utilisateur = new User(
                result.id, 
                result.name, 
                result.firstName, 
                result.login, 
                result.password, 
                result.age, 
                result.ismasculin ? 1 : 0, 
                result.type === "Administrator" ? UserType.Administrator : UserType.Agent
            );
            this.Logged = true;
            this.setLogin(login);
            this.setPassword(password);
            window.sessionStorage.setItem("user", JSON.stringify(result));
        }   
        else {
            this.Utilisateur = null;
            this.Logged = false;
        }
        console.log(this.Utilisateur);
    }

    public signin(firstName: string, lastName: string, age: number, gender: number, password: string) {
        const newUser = new User(
            Date.now(), // Mock ID
            lastName,
            firstName,
            firstName.toLowerCase() + "." + lastName.toLowerCase(), // Mock login
            password,
            age,
            gender
        );
        console.log("User signed up:", newUser);
    }

    public logout() {
        this.Login = "";
        this.Password = "";
        this.Utilisateur = null;
        this.Logged = false;
    }

    public save(){
        if(this.Utilisateur){
            const index = data.findIndex(item => item.id === this.Utilisateur?.id);
            if(index !== -1) {
                data[index] = {
                    id: this.Utilisateur.id,
                    name: this.Utilisateur.name,
                    firstName: this.Utilisateur.firstName,
                    login: this.Utilisateur.login,
                    password: this.Utilisateur.password,
                    age: this.Utilisateur.age,
                    ismasculin: this.Utilisateur.masculin === 1,
                    type: this.Utilisateur.userType === UserType.Administrator ? "Administrator" : "Agent"
                };
                window.sessionStorage.setItem("user", JSON.stringify(data[index]));
                console.log("User data saved:", data[index]);
            }
        }
    }
}