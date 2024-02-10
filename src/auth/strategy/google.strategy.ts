import { PassportStrategy } from "@nestjs/passport";

import { Strategy , Profile, VerifyCallback } from "passport-google-oauth20";

import { Inject, Injectable } from "@nestjs/common";
import { AuthService } from "../auth.service";
import { UserService } from '../../user/user.service';


@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy){

    constructor(
        @Inject('AUTH_SERVICE') private readonly authService: AuthService,
    ){
        super({
            clientID: "57307569355-eqomd49h2q0ebequ1qqdpivu56hjnj8k.apps.googleusercontent.com",
            clientSecret: "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",            
            //consumerKey:  "57307569355-eqomd49h2q0ebequ1qqdpivu56hjnj8k.apps.googleusercontent.com",
            //consumerSecret:  "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",
            callbackURL:'http://localhost:3333/auth/google/redirect',
            scope:['profile','email'] 
        })
    }

    async validate(accessToken: string, refreshToken: string, profile:Profile) {
        console.log(accessToken);
        console.log(refreshToken);
        console.log(profile);
        const user = await this.authService.validateUser({
          email: profile.emails[0].value,
          displayName: profile.displayName,
        });
        console.log('Validate');
        console.log(user);
        return user || null; 
      }
}