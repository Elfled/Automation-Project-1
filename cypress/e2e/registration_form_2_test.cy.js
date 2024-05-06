beforeEach(() => {
    cy.visit('cypress/fixtures/registration_form_2.html')
})
//Import necessary dependencies
import { faker } from '@faker-js/faker';

// Define the function at the top level of the file
function fillMandatoryFields (email, phoneNumber, firstName, lastName, userName, password) {
    cy.log('Filling mandatory fields:')
    // Fill in the form fields using the provided variables
    cy.get('#email').type(email); // Fill in the email field
    cy.get('[data-testid="phoneNumberTestId"]').type(phoneNumber); // Fill in the phone number field
    cy.get('[data-cy="name"]').type(firstName); // Fill in the first name field
    cy.get('[data-testid="lastNameTestId"]').type(lastName); // Fill in the last name field
    cy.get('#username').type(userName); // Fill in the username field
    cy.get("input[name='password']").type(password); // Fill in the password field
    cy.get('[name="confirm"]').type(password); // Fill in the confirmation password field
}

//Variables data
const randomEmail = faker.internet.email() // e.g., "maali.maalt@email.com"
const randomPhoneNumber = faker.phone.number() // e.g., "87654321"
const randomFirstName = faker.person.firstName()// e.g. "Maali"
const randomLastName = faker.person.lastName() // e.g. "Maalt"
const randomUserName = faker.internet.userName()// e.g. "MaaliMaalt"
const staticEmail = 'something@something.com'
const staticPhoneNumber = '12345678'
const staticFirstName = 'Helle'
const staticLastName = 'Tiikmaa'
const staticUserName = 'HTtest'
let randomPassword = faker.internet.password()
let staticPassword = 'wordPass321'
/*
Assignement 4: add content to the following tests
*/
describe('Section 1: Functional tests', () => {

    it('User can use only same both first and validation passwords', () => {

    // Fill in only mandatory fields
        cy.get('#username').type(randomUserName)
        cy.get('#email').type(randomEmail)
        cy.get('[data-cy="name"]').type(randomFirstName)
        cy.get('#lastName').type(randomLastName)
        cy.get('[data-testid="phoneNumberTestId"]').type(randomPhoneNumber)
        cy.get("input[name='password']").type(staticPassword)
        cy.get('[name="confirm"]').type(staticPassword)

    // Type a different confirmation password to trigger an error
        cy.get('[name="confirm"]').clear().type(randomPassword)
        cy.get('h2').contains('Password').click()

    // Assert that submit button is disabled
        cy.get('.submit_button').should('be.disabled')

    // Assert that success message is not visible
        cy.get('#success_message').should('not.be.visible')

    // Assert that error message is visible and contains the expected text
        cy.get('#password_error_message').should('be.visible').and('contain', 'Passwords do not match!')

    // Correct the test so that the passwords match
        cy.get('[name="confirm"]').clear().type(staticPassword)
        cy.get('h2').contains('Password').click()

    // Assert error message is not visible anymore
        cy.get('#password_error_message').should('not.be.visible')

    // Assert submit button is enabled
        cy.get('.submit_button').should('be.enabled')
    })
    
    it('User can submit form with all fields added', ()=>{
        // Add test steps for filling in ALL fields
        cy.get('#username').type(staticUserName)
        cy.get('#email').type(staticEmail)
        cy.get('[data-cy="name"]').type(staticFirstName)
        cy.get('[data-testid="lastNameTestId"]').type(staticLastName)
        cy.get('[data-testid="phoneNumberTestId"]').type(staticPhoneNumber)
        cy.get('#javascriptFavLanguage').click()
        cy.get('#vehicle2').click().should('be.checked')
        cy.get('#cars').select('Volvo')
        cy.get('#animal').select('Hippo')
        cy.get("input[name='password']").type(staticPassword)
        cy.get('[name="confirm"]').type(staticPassword)
        cy.get('h2').contains('Password').click()

        // Assert that submit button is enabled
        cy.get('.submit_button').should('be.enabled')

        // Assert that after submitting the form system show successful message
        cy.get('.submit_button'). click()
        cy.get('#success_message').should('be.visible').and('contain', 'User successfully submitted registration')

    })
     
    it('User can submit form with all fields added 2', ()=>{
        // Add test steps for filling in ALL fields
       // Call the function to fill in the mandatory fields 
        fillMandatoryFields(staticEmail, staticPhoneNumber, staticFirstName, staticLastName, staticUserName, staticPassword)
        cy.get('#javascriptFavLanguage').click()
        cy.get('#vehicle2').click().should('be.checked')
        cy.get('#cars').select('Volvo')
        cy.get('#animal').select('Hippo')
        cy.get('h2').contains('Password').click()

        // Assert that submit button is enabled
        cy.get('.submit_button').should('be.enabled')

        // Assert that after submitting the form system show successful message
        cy.get('.submit_button'). click()
        cy.get('#success_message').should('be.visible').and('contain', 'User successfully submitted registration')

    })

    it('User can submit form with valid data and only mandatory fields added', ()=>{
        // Add test steps for filling in ONLY mandatory fields 
        // Call the function to fill in the mandatory fields
        fillMandatoryFields(staticEmail, staticPhoneNumber, staticFirstName, staticLastName, staticUserName, staticPassword)
        cy.get('h2').contains('Password').click()    

        // Assert that submit button is enabled
        cy.get('.submit_button').should('be.enabled')

        // Assert that after submitting the form system shows successful message
        cy.get('.submit_button'). click()
        cy.get('#success_message').should('be.visible').and('contain', 'User successfully submitted registration')

    })

   // Add at least 1 test for checking some mandatory field's absence
    it('User can not submit form with mandatory email field emtpy', ()=>{
        
        // Call the function to fill in the mandatory fields
        fillMandatoryFields(staticEmail, staticPhoneNumber, staticFirstName, staticLastName, staticUserName, staticPassword)
        cy.get('h2').contains('Password').click()

        // Clear email field
        cy.get('#email').scrollIntoView()
        cy.get('#email').clear()
        cy.get('h2').contains('Password').click()       

        // Assert that submit button is disabled
        cy.get('.submit_button').should('be.disabled')

        // Assert that successful message is not visible
        cy.get('#success_message').should('not.be.visible')

    })
    
    it('User can not submit form with mandatory phone number field emtpy', ()=>{
        
        // Call the function to fill in the mandatory fields
        fillMandatoryFields(staticEmail, staticPhoneNumber, staticFirstName, staticLastName, staticUserName, staticPassword)
        cy.get('h2').contains('Password').click()

        // Clear email field
        cy.get('[data-testid="phoneNumberTestId"]').scrollIntoView()
        cy.get('[data-testid="phoneNumberTestId"]').clear()
        cy.get('h2').contains('Password').click()       

        // Assert that submit button is disabled
        cy.get('.submit_button').should('be.disabled')

        // Assert that successful message is not visible
        cy.get('#success_message').should('not.be.visible')

    }) 

    it('User can not submit form with mandatory first name field emtpy', ()=>{
        
        // Call the function to fill in the mandatory fields
        fillMandatoryFields(staticEmail, staticPhoneNumber, staticFirstName, staticLastName, staticUserName, staticPassword)
        cy.get('h2').contains('Password').click()

        // Clear email field
        cy.get('[data-cy="name"]').scrollIntoView()
        cy.get('[data-cy="name"]').clear()
        cy.get('h2').contains('Password').click()       

        // Assert that submit button is disabled
        cy.get('.submit_button').should('be.disabled')

        // Assert that successful message is not visible
        cy.get('#success_message').should('not.be.visible')

    }) 

    it('User can not submit form with mandatory last name field emtpy', ()=>{
        
        // Call the function to fill in the mandatory fields
        fillMandatoryFields(staticEmail, staticPhoneNumber, staticFirstName, staticLastName, staticUserName, staticPassword)
        cy.get('h2').contains('Password').click()

        // Clear email field
        cy.get('#lastName').scrollIntoView()
        cy.get('#lastName').clear()
        cy.get('h2').contains('Password').click()       

        // Assert that submit button is disabled
        cy.get('.submit_button').should('be.disabled')

        // Assert that successful message is not visible
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
        // get element and check its parameter height
        // it should be less than 178 and greater than 100
        cy.get('img').invoke('height').should('be.lessThan', 178)
            .and('be.greaterThan', 100)   
    })

    it('My test for second picture', () => {
        // Create similar test for checking the second picture
        cy.log('Will check logo source and size')
        cy.get('[data-cy="cypress_logo"]').should('have.attr', 'src').should('include', 'cypress_logo')
        // get element and check its parameter height
        // it should be less than 178 and greater than 100
        cy.get('[data-cy="cypress_logo"]').invoke('height').should('be.lessThan', 178)
            .and('be.greaterThan', 80)
    });

    it('Check navigation part registration_form_1.html', () => {
        cy.get('nav').children().should('have.length', 2)

        // Get navigation element, find siblings that contains h1 and check if it has Registration form in string
        cy.get('nav').siblings('h1').should('have.text', 'Registration form number 2')
        
        // Get navigation element, find its first child, check the link content and click it
        cy.get('nav').children().eq(0).should('be.visible')
            .and('have.attr', 'href', 'registration_form_1.html')
            .click()
        
        // Check that currently opened URL is correct
        cy.url().should('contain', '/registration_form_1.html')
        
        // Go back to previous page
        cy.go('back')
        cy.log('Back again in registration form 2')
    })

    // Create similar test for checking the second link
    it('Check navigation part registration_form_3.html', () => {
        cy.get('nav').children().should('have.length', 2)

        // Get navigation element, find siblings that contains h1 and check if it has Registration form in string
        cy.get('nav').siblings('h1').should('have.text', 'Registration form number 2')
        
        // Get navigation element, find its first child, check the link content and click it
        cy.get('nav').children().eq(1).should('be.visible')
            .and('have.attr', 'href', 'registration_form_3.html')
            .click()
        
        // Check that currently opened URL is correct
        cy.url().should('contain', '/registration_form_3.html')
        
        // Go back to previous page
        cy.go('back')
        cy.log('Back again in registration form 2') 

    })    

    it('Check that radio button list is correct', () => {
        // Array of found elements with given selector has 4 elements in total
        cy.get('input[type="radio"]').should('have.length', 4)

        // Verify labels of the radio buttons
        cy.get('input[type="radio"]').next().eq(0).should('have.text','HTML')
        cy.get('input[type="radio"]').next().eq(1).should('have.text','CSS')
        cy.get('input[type="radio"]').next().eq(2).should('have.text','JavaScript')
        cy.get('input[type="radio"]').next().eq(3).should('have.text','PHP')

        //Verify default state of radio buttons
        cy.get('input[type="radio"]').eq(0).should('not.be.checked')
        cy.get('input[type="radio"]').eq(1).should('not.be.checked')
        cy.get('input[type="radio"]').eq(2).should('not.be.checked')
        cy.get('input[type="radio"]').eq(3).should('not.be.checked')

        // Selecting one will remove selection from the other radio button
        cy.get('input[type="radio"]').eq(0).check().should('be.checked')
        cy.get('input[type="radio"]').eq(1).check().should('be.checked')
        cy.get('input[type="radio"]').eq(0).should('not.be.checked')
    })

    // Create test similar to previous one verifying check boxes

    it('Car dropdown is correct', () => {
        // Here is just an example how to explicitely create screenshot from the code
        // Select second element and create screenshot for this area or full page
        cy.get('#cars').select(1).screenshot('Cars drop-down')
        cy.screenshot('Full page screenshot')

        // Here are given different solutions how to get the length of array of elements in Cars dropdown
        // Next 2 lines of code do exactly the same!
        cy.get('#cars').children().should('have.length', 4)
        cy.get('#cars').find('option').should('have.length', 4)
        
        // Check  that first element in the dropdown has text Volvo
        cy.get('#cars').find('option').eq(0).should('have.text', 'Volvo')
        
        // Advanced level how to check the content of the Cars dropdown
        cy.get('#cars').find('option').then(options => {
            const actual = [...options].map(option => option.value)
            expect(actual).to.deep.eq(['volvo', 'saab', 'opel', 'audi'])
        })
    })

    // Create test similar to previous one
    it('Favourite animal dropdown is correct', () => {
        // Here is just an example how to explicitely create screenshot from the code
        // Select second element and create screenshot for this area or full page
        cy.get('#animal').select(1).screenshot('Cars drop-down')
        cy.screenshot('Full page screenshot')

        // Here are given different solutions how to get the length of array of elements in Cars dropdown
        // Next 2 lines of code do exactly the same!
        cy.get('#cars').children().should('have.length', 4)
        cy.get('#cars').find('option').should('have.length', 4)
        
        // Check  that first element in the dropdown has text Volvo
        cy.get('#cars').find('option').eq(0).should('have.text', 'Volvo')
        
        // Advanced level how to check the content of the Cars dropdown
        cy.get('#cars').find('option').then(options => {
            const actual = [...options].map(option => option.value)
            expect(actual).to.deep.eq(['volvo', 'saab', 'opel', 'audi'])
        })
    })
})
// example, how to use function, which fills in all mandatory data
// in order to see the content of the function, scroll to the end of the file
//inputValidData('johnDoe')
function inputValidData(username) {
    cy.log('Username will be filled')
    cy.get('input[data-testid="user"]').type(username)
    cy.get('#email').type('validemail@yeap.com')
    cy.get('[data-cy="name"]').type('John')
    cy.get('#lastName').type('Doe')
    cy.get('[data-testid="phoneNumberTestId"]').type('10203040')
    cy.get('#password').type('MyPass')
    cy.get('#confirm').type('MyPass')
    cy.get('h2').contains('Password').click()
}