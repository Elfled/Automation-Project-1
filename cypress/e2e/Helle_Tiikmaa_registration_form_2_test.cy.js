//Import necessary dependencies
import { faker } from '@faker-js/faker'

// Define the function for all mandatory fields + password (that should be mandatory, but is not)
function fillMandatoryFields(userName, email, firstName, lastName, phoneNumber, password) {
    cy.log('Filling mandatory fields with password:')
    cy.get('#username').type(userName); 
    cy.get('#email').type(email)
    cy.get('[data-cy="name"]').type(firstName)
    cy.get('[data-testid="lastNameTestId"]').type(lastName) 
    cy.get('[data-testid="phoneNumberTestId"]').clear().type(phoneNumber) 
    cy.get('#password').type(password) 
    cy.get('#confirm').type(password) 
}

// Define the function for mandatory fields without password (as mandatory fields are on the form now)
function fillMandatoryFieldsNoPassword(userName, email, firstName, lastName, phoneNumber) {
    cy.log('Filling mandatory fields without password:')
    cy.get('#username').type(userName) 
    cy.get('#email').type(email) 
    cy.get('[data-cy="name"]').type(firstName) 
    cy.get('[data-testid="lastNameTestId"]').type(lastName) 
    cy.get('[data-testid="phoneNumberTestId"]').clear().type(phoneNumber) 
}

//Variables data - random and static to be used in function as chosen
const randomUserName = faker.internet.userName()// e.g. "MaaliMaalt"
const randomEmail = faker.internet.email() // e.g., "maali.maalt@email.com"
const randomFirstName = faker.person.firstName()// e.g. "Maali"
const randomLastName = faker.person.lastName() // e.g. "Maalt"
const randomPhoneNumber = faker.phone.number() // e.g., "87654321"
const staticUserName = 'HTtest'
const staticEmail = 'something@something.com'
const staticFirstName = 'Helle'
const staticLastName = 'Tiikmaa'
const staticPhoneNumber = '12345678'
const randomPassword = faker.internet.password()
let staticPassword = 'wordPass321'

//Visit the page before each test
beforeEach(() => {
    cy.visit('cypress/fixtures/registration_form_2.html')
})
// Take a full-page screenshot at the end of all tests
afterEach(() => {
    cy.screenshot('Test result');
})
/*
Assignement 4: add content to the following tests

*/
describe('Section 1: Functional tests', () => {

    it('User can use only same both first and validation passwords', () => {
    
    fillMandatoryFieldsNoPassword(randomUserName, randomEmail, randomFirstName, randomLastName, randomPhoneNumber)

    // Type a different confirmation password to trigger an error
        cy.get("input[name='password']").type(staticPassword);
        cy.get('[name="confirm"]').clear().type(randomPassword);
        cy.get('h2').contains('Password').click();

        cy.get('.submit_button').should('be.disabled')
        cy.get('#success_message').should('not.be.visible')

        cy.get('#password_error_message').should('be.visible').and('contain', 'Passwords do not match!')

    // Correct the test so that the passwords match
        cy.get('[name="confirm"]').clear().type(staticPassword)
        cy.get('h2').contains('Password').click()
    
        cy.get('#password_error_message').should('not.be.visible')

        cy.get('.submit_button').should('be.enabled')
    })
             
    it('User can submit form with all fields added', ()=>{

    fillMandatoryFields(staticUserName, staticEmail, staticFirstName, staticLastName, staticPhoneNumber, staticPassword)
    // Fill in additional fields 
        cy.get('#javascriptFavLanguage').click()
        cy.get('#vehicle2').click().should('be.checked')
        cy.get('#cars').select('Volvo')
        cy.get('#animal').select('Hippo')
        cy.get('h2').contains('Password').click()

        cy.get('.submit_button').should('be.enabled')
        cy.get('.submit_button'). click()
        cy.get('#success_message').should('be.visible').and('contain', 'User successfully submitted registration')

    })

    it('User can submit form with valid data and only mandatory fields added', ()=>{
   
    fillMandatoryFieldsNoPassword(staticUserName, staticEmail, staticFirstName, staticLastName, staticPhoneNumber)
        cy.get('h2').contains('Password').click()    

        cy.get('.submit_button').should('be.enabled')

        cy.get('.submit_button'). click()
        cy.get('#success_message').should('be.visible').and('contain', 'User successfully submitted registration')

    })

   // Test for checking some mandatory field's absence (both functions can be used here and as example are used intermittently)
    it('User can not submit form with mandatory email field emtpy', ()=>{
        
    // Call the function to fill in the mandatory fields + passwords
        fillMandatoryFields(staticUserName, staticEmail, staticFirstName, staticLastName, staticPhoneNumber, staticPassword)
        cy.get('h2').contains('Password').click()

    // Clear email field
        cy.get('#email').scrollIntoView()
        cy.get('#email').clear()
        cy.get('h2').contains('Password').click()       

        cy.get('.submit_button').should('be.disabled')
        cy.get('#success_message').should('not.be.visible')

    })
    
    it('User can not submit form with mandatory phone number field emtpy', ()=>{
        
    // Call the function to fill in the mandatory fields + passwords
        fillMandatoryFields(randomUserName, randomEmail, randomFirstName, randomLastName, randomPhoneNumber, randomPassword)
        cy.get('h2').contains('Password').click()

    // Clear phone number field
        cy.get('[data-testid="phoneNumberTestId"]').scrollIntoView()
        cy.get('[data-testid="phoneNumberTestId"]').clear()
        cy.get('h2').contains('Password').click()       

        cy.get('.submit_button').should('be.disabled')
        cy.get('#success_message').should('not.be.visible')

    }) 

    it('User can not submit form with mandatory first name field emtpy', ()=>{
        
    // Call the function to fill in the mandatory fields + passwords
        fillMandatoryFieldsNoPassword(randomUserName, randomEmail, randomFirstName, randomLastName, randomPhoneNumber)
        cy.get('h2').contains('Password').click()

    // Clear first name field
        cy.get('input[name="name"]').scrollIntoView()
        cy.get('input[name="name"]').clear()
        cy.get('h2').contains('Password').click()       

        cy.get('.submit_button').should('be.disabled')
        cy.get('#success_message').should('not.be.visible')

    }) 

    it('User can not submit form with mandatory last name field emtpy', ()=>{
        
    // Call the function to fill in the mandatory fields
        fillMandatoryFieldsNoPassword(staticUserName, staticEmail, staticFirstName, staticLastName, staticPhoneNumber)
        cy.get('h2').contains('Password').click()

    // Clear last name field
        cy.get('#lastName').scrollIntoView()
        cy.get('#lastName').clear()
        cy.get('h2').contains('Password').click()       

        cy.get('.submit_button').should('be.disabled')
        cy.get('#success_message').should('not.be.visible')

    })     

    it('User can not submit form with mandatory username field emtpy', ()=>{
        
    // Call the function to fill in the mandatory fields
        fillMandatoryFieldsNoPassword(randomUserName, randomEmail, randomFirstName, randomLastName, randomPhoneNumber)
        cy.get('h2').contains('Password').click()

    // Clear username field
        cy.get('#username').scrollIntoView()
        cy.get('#username').clear()
        cy.get('h2').contains('Password').click()       

        cy.get('.submit_button').should('be.disabled')
        cy.get('#success_message').should('not.be.visible')

    })

})

/*
Assignement 5: create more visual tests
*/

describe('Section 2: Visual tests', () => {

    it('Check that logo is correct and has correct size', () => {
        cy.log('Will check logo source and size')
        cy.get('img').should('have.attr', 'src').should('include', 'cerebrum_hub_logo')

        cy.get('img').invoke('height').should('be.lessThan', 178)
            .and('be.greaterThan', 100)   
    })

    it('My test for second picture', () => {     
        cy.log('Will check logo source and size')
        cy.get('[data-cy="cypress_logo"]').should('have.attr', 'src').should('include', 'cypress_logo')

        cy.get('[data-cy="cypress_logo"]').invoke('height').should('be.lessThan', 178)
            .and('be.greaterThan', 70)
    });

    
    it('Check navigation part registration_form_1.html', () => {
       
        cy.get('nav').children().should('have.length', 2)
        cy.get('nav').siblings('h1').should('have.text', 'Registration form number 2')
   
        cy.get('nav').children().eq(0).should('be.visible')
            .and('have.attr', 'href', 'registration_form_1.html')
            .click()

        cy.url().should('contain', '/registration_form_1.html')

        cy.go('back')
        cy.log('Back again in registration form 2')
    })

    it('Check navigation part registration_form_3.html', () => {
        cy.get('nav').children().should('have.length', 2)
        cy.get('nav').siblings('h1').should('have.text', 'Registration form number 2')
        
        cy.get('nav').children().eq(1).should('be.visible')
            .and('have.attr', 'href', 'registration_form_3.html')
            .click()
   
        cy.url().should('contain', '/registration_form_3.html')
    
        cy.go('back')
        cy.log('Back again in registration form 2') 

    })    

    it('Check that radio button list is correct', () => {

        cy.get('input[type="radio"]').should('have.length', 4)
        cy.get('input[type="radio"]').next().eq(0).should('have.text','HTML')
        cy.get('input[type="radio"]').next().eq(1).should('have.text','CSS')
        cy.get('input[type="radio"]').next().eq(2).should('have.text','JavaScript')
        cy.get('input[type="radio"]').next().eq(3).should('have.text','PHP')

        cy.get('input[type="radio"]').eq(0).should('not.be.checked')
        cy.get('input[type="radio"]').eq(1).should('not.be.checked')
        cy.get('input[type="radio"]').eq(2).should('not.be.checked')
        cy.get('input[type="radio"]').eq(3).should('not.be.checked')

        cy.get('input[type="radio"]').eq(0).check().should('be.checked')
        cy.get('input[type="radio"]').eq(1).check().should('be.checked')
        cy.get('input[type="radio"]').eq(0).should('not.be.checked')
    })

    it('Check that checkboxes list is correct', () => {

        cy.get('input[type="checkbox"]').should('have.length', 3)

        cy.get('input[type="checkbox"]').next().eq(0).should('have.text', 'I have a bike')
        cy.get('input[type="checkbox"]').next().eq(1).should('have.text', 'I have a car')
        cy.get('input[type="checkbox"]').next().eq(2).should('have.text', 'I have a boat')

        cy.get('input[type="checkbox"]').eq(0).should('not.be.checked')
        cy.get('input[type="checkbox"]').eq(1).should('not.be.checked')
        cy.get('input[type="checkbox"]').eq(2).should('not.be.checked')

        cy.get('input[type="checkbox"]').eq(0).check().should('be.checked') 
        cy.get('input[type="checkbox"]').eq(1).check().should('be.checked') 
        cy.get('input[type="checkbox"]').eq(0).should('be.checked')

    })

    it('Car dropdown is correct', () => {
    
        cy.get('#cars').children().should('have.length', 4)
        cy.get('#cars').find('option').eq(0).should('have.text', 'Volvo')
        cy.get('#cars').find('option').then(options => {
            const actual = [...options].map(option => option.value)
            expect(actual).to.deep.eq(['volvo', 'saab', 'opel', 'audi'])
        })
    })

    it('Favourite animal dropdown is correct', () => {

        cy.get('#animal').find('option').should('have.length', 6)
        cy.get('#animal').find('option').eq(0).should('have.text', 'Dog')
        cy.get('#animal').find('option').eq(1).should('have.text', 'Cat')
        cy.get('#animal').find('option').eq(2).should('have.text', 'Snake')
        cy.get('#animal').find('option').eq(3).should('have.text', 'Hippo')
        cy.get('#animal').find('option').eq(4).should('have.text', 'Cow')
        cy.get('#animal').find('option').eq(5).should('have.text', 'Horse')

        cy.get('#animal').find('option').then(options => {
            const actual = [...options].map(option => option.value)
            expect(actual).to.deep.eq(['dog', 'cat', 'snake', 'hippo', 'cow', 'mouse'])
        })

    })
})
