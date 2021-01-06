
import passport from "passport";
import passportLocal from "passport-local";
import bcrypt from "bcrypt";
import { UserTypes } from "src/@types/user";

const LocalStrategy = passportLocal.Strategy

export const initializePassport = (getUserByUsername: (username: string) => UserTypes, getUserById: (id: string) => any) => {
    const auth: passportLocal.VerifyFunction = async (username, password, done) => {
        const user = await getUserByUsername(username)
        if(user == null){
            console.log("Null")
            return done(null, false, {message: "No User"})
        }

        if(!await bcrypt.compare(password, user.password)){
            return done(null, false, {message: "Wrong Password"})
        }
        done(null, user)

    }

    passport.use(new LocalStrategy((auth)))
    passport.serializeUser((user: any, done) => done(null, user.id))
    passport.deserializeUser(async (id: string, done) => done(null, await getUserById(id)))
}



