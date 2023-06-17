/* eslint-disable max-len */
import "jest";

import * as admin from "firebase-admin";
import * as func from "firebase-functions";

import {WrappedFunction, WrappedScheduledFunction} from "firebase-functions-test/lib/v1";

import {UserRecord} from "firebase-admin/auth";
import functions from "firebase-functions-test";
import {newUser} from "../src";

const testEnv = functions({
    projectId: "react-trello-clone-64906",
    storageBucket: "react-trello-clone-64906.appspot.com",
}, "functions/test/service-account.json");


describe("newRecord", () => {
    let wrapped: WrappedScheduledFunction | WrappedFunction<UserRecord>;

    jest.spyOn(func.logger, "log");
    jest.spyOn(func.logger, "error");

    beforeAll(() => {
        wrapped = testEnv.wrap(newUser);
    });


    afterAll(async () => {
        await admin.firestore().doc("users/seedUser").delete();
        testEnv.cleanup();
    });

    test("Creates a new user record in firestore with 4 lines of info", async () => {
        const user = testEnv.auth.makeUserRecord({uid: "seedUser", email: "seeduser@firebase.com", displayName: "Seed User"});
        await wrapped(user);

        const doc = await admin.firestore().doc(`users/${user.uid}`).get();

        expect(doc?.data()?.uid).toBe("seedUser");
        expect(doc?.data()?.email).toBe("seeduser@firebase.com");
        expect(doc?.data()?.name).toBe("Seed User");
        expect(doc?.data()?.boardNames).toEqual({});
        expect(func.logger.log).toHaveBeenCalledWith("Created new user", user.uid, ":", user.displayName);
    });

    test("Should return an error log", async () => {
        const user = testEnv.auth.makeUserRecord({uid: ""});
        await wrapped(user);
        expect(func.logger.error).toHaveBeenCalledWith("There has been an error");
    });
});
