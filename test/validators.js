const { validateEmail, validateName, validatePassword } = require('../utils/validators');

const expect = require("chai").expect;

describe("Testing Validators", function () {
    it("Should return true for a valid name", function () {
        expect(validateName("Soumyanil")).to.equal(true);
    });

    it("Should return false for a invalid name", function () {
        expect(validateName("Soumyanil09")).to.equal(false);
    });

    it("Should return true for a valid email", function () {
        expect(validateEmail("soumyanil@gmail.com")).to.equal(true);
    });

    it("Should return false for a invalid email", function () {
        expect(validateEmail("soumyanilgmail.com")).to.equal(false);
    });
})