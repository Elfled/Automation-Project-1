//Import necessary dependencies
import { faker } from '@faker-js/faker'

// Define the function for all mandatory fields + password (should be mandatory)   
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
// Define the function for mandatory fields
function fillMandatoryFieldsNoPassword (email, phoneNumber, firstName, lastName, userName) {
    cy.log('Filling mandatory fields:')
    // Fill in the form fields using the provided variables
    cy.get('#email').type(email); // Fill in the email field
    cy.get('[data-testid="phoneNumberTestId"]').type(phoneNumber); // Fill in the phone number field
    cy.get('[data-cy="name"]').type(firstName); // Fill in the first name field
    cy.get('[data-testid="lastNameTestId"]').type(lastName); // Fill in the last name field
    cy.get('#username').type(userName); // Fill in the username field

}
//Variables data - random and static
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

    // Fill in only mandatory fields - call function 'fillMandatoryFields'
    fillMandatoryFieldsNoPassword (randomEmail, randomPhoneNumber, randomFirstName, randomLastName, randomUserName)

    // Type a different confirmation password to trigger an error
        cy.get("input[name='password']").type(staticPassword);
        cy.get('[name="confirm"]').clear().type(randomPassword);
        cy.get('h2').contains('Password').click();

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

    // Call the function to fill in the mandatory fields + password
        fillMandatoryFields(staticEmail, staticPhoneNumber, staticFirstName, staticLastName, staticUserName, staticPassword)
    // Fill in additional fields 
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
   
    // Call the function to fill in the mandatory fields
        fillMandatoryFieldsNoPassword(staticEmail, staticPhoneNumber, staticFirstName, staticLastName, staticUserName)
        cy.get('h2').contains('Password').click()    

    // Assert that submit button is enabled
        cy.get('.submit_button').should('be.enabled')

    // Assert that after submitting the form system shows successful message
        cy.get('.submit_button'). click()
        cy.get('#success_message').should('be.visible').and('contain', 'User successfully submitted registration')

    })

   // Test for checking some mandatory field's absence (using different functions as password is not mandatory, but should be)
    it('User can not submit form with mandatory email field emtpy', ()=>{
        
    // Call the function to fill in the mandatory fields + passwords
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
        
    // Call the function to fill in the mandatory fields + passwords
        fillMandatoryFields(randomEmail, randomPhoneNumber, randomFirstName, randomLastName, randomUserName, randomPassword)
        cy.get('h2').contains('Password').click()

    // Clear phone number field
        cy.get('[data-testid="phoneNumberTestId"]').scrollIntoView()
        cy.get('[data-testid="phoneNumberTestId"]').clear()
        cy.get('h2').contains('Password').click()       

    // Assert that submit button is disabled
        cy.get('.submit_button').should('be.disabled')

    // Assert that successful message is not visible
        cy.get('#success_message').should('not.be.visible')

    }) 

    it('User can not submit form with mandatory first name field emtpy', ()=>{
        
    // Call the function to fill in the mandatory fields + passwords
        fillMandatoryFields(staticEmail, staticPhoneNumber, staticFirstName, staticLastName, staticUserName, staticPassword)
        cy.get('h2').contains('Password').click()

    // Clear first name field
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
        fillMandatoryFieldsNoPassword(randomEmail, randomPhoneNumber, randomFirstName, randomLastName, randomUserName)
        cy.get('h2').contains('Password').click()

    // Clear last name field
        cy.get('#lastName').scrollIntoView()
        cy.get('#lastName').clear()
        cy.get('h2').contains('Password').click()       

    // Assert that submit button is disabled
        cy.get('.submit_button').should('be.disabled')

    // Assert that successful message is not visible
        cy.get('#success_message').should('not.be.visible')

    })     

    it('User can not submit form with mandatory username field emtpy', ()=>{
        
    // Call the function to fill in the mandatory fields
        fillMandatoryFieldsNoPassword(staticEmail, staticPhoneNumber, staticFirstName, staticLastName, staticUserName)
        cy.get('h2').contains('Password').click()

    // Clear username field
        cy.get('#username').scrollIntoView()
        cy.get('#username').clear()
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

    // Test for checking the first logo
    it('Check that logo is correct and has correct size', () => {
        cy.log('Will check logo source and size')
        cy.get('img').should('have.attr', 'src').should('include', 'cerebrum_hub_logo')

    // get element and check its parameter height - it should be less than 178 and greater than 100
        cy.get('img').invoke('height').should('be.lessThan', 178)
            .and('be.greaterThan', 100)   
    })

    // Test for checking the second logo
    it('My test for second picture', () => {     
        cy.log('Will check logo source and size')
        cy.get('[data-cy="cypress_logo"]').should('have.attr', 'src').should('include', 'cypress_logo')

    // get element and check its parameter height - it should be less than 178 and greater than 70
        cy.get('[data-cy="cypress_logo"]').invoke('height').should('be.lessThan', 178)
            .and('be.greaterThan', 70)
    });

    //Test for checking the first  link registration_form_1.html
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

    //Test for checking the second link registration_form_3.html
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

    //Test checking radio buttons list
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

    // Create test similar to previous one verifying checkboxes
    it('Check that checkboxes list is correct', () => {

    // Array of found elements with given selector has 3 elements in total
        cy.get('input[type="checkbox"]').should('have.length', 3)

    // Verify labels of the checkboxes
        cy.get('input[type="checkbox"]').next().eq(0).should('have.text', 'I have a bike')
        cy.get('input[type="checkbox"]').next().eq(1).should('have.text', 'I have a car')
        cy.get('input[type="checkbox"]').next().eq(2).should('have.text', 'I have a boat')

    //Verify default state of the checkboxes buttons
        cy.get('input[type="checkbox"]').eq(0).should('not.be.checked')
        cy.get('input[type="checkbox"]').eq(1).should('not.be.checked')
        cy.get('input[type="checkbox"]').eq(2).should('not.be.checked')

    // Check and verify the checkboxes
        cy.get('input[type="checkbox"]').eq(0).check().should('be.checked')//First checkbox checked
        cy.get('input[type="checkbox"]').eq(1).check().should('be.checked')//Second checkbox checked 
        cy.get('input[type="checkbox"]').eq(0).should('be.checked')//First checkbox remianed checked

    })

    //Test cars dropdown list
    it('Car dropdown is correct', () => {
    // Get the length of array of elements in Cars dropdown
            cy.get('#cars').children().should('have.length', 4)
        
    // Check  that first element in the dropdown has text Volvo
        cy.get('#cars').find('option').eq(0).should('have.text', 'Volvo')
        
    // Advanced level how to check the content of the Cars dropdown
        cy.get('#cars').find('option').then(options => {
            const actual = [...options].map(option => option.value)
            expect(actual).to.deep.eq(['volvo', 'saab', 'opel', 'audi'])
        })
    })

    // Test favourite animal dropdown list
    it('Favourite animal dropdown is correct', () => {

    //Get the length of array of elements in Favourite animaldropdown
        cy.get('#animal').find('option').should('have.length', 6)

    // Check that all elements in the Favourite animal dropdown have correct text
        cy.get('#animal').find('option').eq(0).should('have.text', 'Dog')
        cy.get('#animal').find('option').eq(1).should('have.text', 'Cat')
        cy.get('#animal').find('option').eq(2).should('have.text', 'Snake')
        cy.get('#animal').find('option').eq(3).should('have.text', 'Hippo')
        cy.get('#animal').find('option').eq(4).should('have.text', 'Cow')
        cy.get('#animal').find('option').eq(5).should('have.text', 'Horse')
         
        
    // Advanced check the content of the Favourite animaldropdown
        cy.get('#animal').find('option').then(options => {
            const actual = [...options].map(option => option.value)
            expect(actual).to.deep.eq(['dog', 'cat', 'snake', 'hippo', 'cow', 'mouse'])
        })

    })
})
