// Import necessary dependencies
import { faker } from '@faker-js/faker'
import 'cypress-file-upload'

// Test setup: visit the page before each test
beforeEach(() => cy.visit('cypress/fixtures/registration_form_3.html'))
// Take a full-page screenshot at the end of all tests
afterEach(() => {
    cy.screenshot('Test3 result');
})

//Section 1. Visual tests for registration form 3
describe('Section 1: Tests to verify visual parts of the page', () => {

// 1. Check radio button list is correct and functions correctly
    it('Verify that radio button list is correct and functions correctly', () => {
        cy.get('input[type="radio"]').should('have.length', 4)
        cy.get('input[type="radio"]').eq(0).next().should('have.text', 'Daily')
        cy.get('input[type="radio"]').eq(1).next().should('have.text', 'Weekly')
        cy.get('input[type="radio"]').eq(2).next().should('have.text', 'Monthly')
        cy.get('input[type="radio"]').eq(3).next().should('have.text', 'Never')
        
        cy.get('input[type="radio"]').should('not.be.checked')
        cy.get('input[type="radio"]').eq(0).check().should('be.checked')
        cy.get('input[type="radio"]').eq(1).check().should('be.checked')
        cy.get('input[type="radio"]').eq(0).should('not.be.checked')
    })
    
// 2. Test enabling of the city dropdown and verifying cities available for each country'
    it('Verify that country dropdown is correct', () => {

    //Array of country dropdown
        cy.get('#country').children().should('have.length', 4)
       
    // Check  that second element on dropdown has value Spain
        cy.get('#country').find('option').eq(2).should('have.text', 'Estonia')
    
    // Advanced level how to check the content of the Cars dropdown
        cy.get('#country').find('option').then(options => {
            const actual = [...options].map(option => option.value)
            expect(actual).to.deep.eq(["",'object:3', 'object:4', 'object:5'])
        })
    })

    it('City dropdown is correct for each country', () => {
        const countries = [
            { name: 'Spain', expectedCities: ['Malaga', 'Madrid', 'Valencia', 'Corralejo'] },
            { name: 'Estonia', expectedCities: ['Tallinn', 'Haapsalu', 'Tartu'] },
            { name: 'Austria', expectedCities: ['Vienna', 'Salzburg', 'Innsbruck'] }
        ];
    
        // Iterate through each country in the list
        countries.forEach(({ name, expectedCities }) => {
            // Select the current country from the dropdown
            cy.get('#country').select(name)
            
            // Check that the city dropdown is enabled and has options
            cy.get('#city').should('not.be.disabled')
            
            // Map over the options in the city dropdown to get the city names
            cy.get('#city').find('option').then(options => {
                const actualCities = [...options].map(option => option.textContent.trim()).slice(1);
                
                // Compare the list of actual cities with the expected cities for the selected country
                expect(actualCities).to.deep.equal(expectedCities)
            })
        })
    })    

    it('Chosen city is unchosen, when country is changed', () => {
            // Select 'Spain' as the country
        cy.get('#country').select('Spain')
            
            // Verify the length of the city dropdown options
        cy.get('#city').children().should('have.length', 5) // Verify the dropdown has the correct number of options
        
            // Verify the city dropdown options
        cy.get('#city').find('option').then(options => {
            const actualCities = [...options].map(option => option.textContent.trim()).slice(1); // Skip the first option (placeholder)
                
            // Define expected cities for Spain
            const expectedCities = ['Malaga', 'Madrid', 'Valencia', 'Corralejo']
        
            // Assert the actual cities match the expected cities
            expect(actualCities).to.deep.equal(expectedCities)
            })
        
            // Verify specific city name (Malaga) exists at the correct index
        cy.get('#city').find('option').eq(1).should('have.text', 'Malaga')
    
            //Select another country (Estonia)
        cy.get('#country').select('Estonia')
    
            //Verify that city has no more value
        cy.get('#city').should('not.have.value')

    })

// 4. Verify checkboxes working, their content and link of the second
    it('Verify checkboxes working, their content and active link of the second', () => {
        cy.get('input[type="checkbox"]').should('have.length', 2)
        cy.get('input[type="checkbox"]').eq(0).parent().should('contain.text', 'Accept our privacy policy')
        cy.get('input[type="checkbox"]').eq(1).parent().should('contain.text', 'Accept our cookie policy')
            .find('a').should('contain.text', 'cookie policy').and('have.attr', 'href').should('include', 'cookiePolicy.html')
        cy.get('input[type="checkbox"]').each(checkbox => cy.wrap(checkbox).should('not.be.checked'))
    })

// 5. Verify valid email format validation
    it('Verify valid email format validation', () => {
        const emailInput = 'input[name="email"]'

        for (let i = 0; i < 5; i++) {
            const validEmail = faker.internet.email()
            cy.get(emailInput).clear().type(validEmail)
            cy.get(emailInput).blur()

            cy.get('#emailAlert').within(() => {
                cy.contains('Email is required.').should('not.be.visible')
                cy.contains('Invalid email address.').should('not.be.visible')
            })
        }
    })

// 6. Verify invalid email format not accepted
    it('Verify invalid email format not accepted', () => {
        const emailInput = 'input[name="email"]'

        const invalidEmails = [
            faker.lorem.word(),
            `@${faker.internet.domainName()}`,
            `${faker.lorem.word()}@`,
            `${faker.lorem.word()}@${faker.lorem.word()}`,
            `${faker.lorem.word()}@${faker.internet.domainName()}..com`
        ]
        
        invalidEmails.forEach(email => {
            cy.get(emailInput).clear().type(email)
            cy.get(emailInput).blur()
            
            cy.get('#emailAlert').within(() => cy.contains('Invalid email address.').should('exist'))
        })
    })
})

// Function to fill mandatory fields in the registration form
//Variables declared
const email = 'HTtest@email.com'     
const country = 'Estonia' 
const city = 'Tartu'

function fillMandatoryFields() {
    // Define static values for the form fields
    cy.get('input[name="email"]').clear().type(email)
    cy.get('#country').select(country)
    cy.get('#city').select(city)
    cy.get('input[type="checkbox"]').eq(0).check()
    
}
//Section 2. Functional tests for registration form 3
describe('Section 2: Tests for functional tests', () => {

//1. User can submit with all fields filled
    it('User can submit the form with all fields filled with valid data', () => {
    const today = new Date().toISOString().split('T')[0] 
           
    //Call the function to fill in only mandatory fields  
    fillMandatoryFields()

    // Add non-mandatodry fields
        cy.get('#name').clear().type('HelleT')    
        cy.get('input[type="date"]:not(#birthday)').type(today) //add registration date
        cy.get('#birthday').type('2001-12-08') //add birthday 
        cy.get('input[name="freq"][value="Never"]').check() //choose frequency
        cy.get('input[type="checkbox"]').eq(1).check() //Check the unchecked checkbox "Accept cookie policy"

    // Verify that the submit button is enabled
        cy.get('input[type="submit"]').should('not.be.disabled')

    // Submit the form
         cy.get('input[type="submit"]').click()
  
    // Verify that the URL has changed
        cy.url().should('not.eq', Cypress.config('baseUrl'))

    // Verify the success message
        cy.get('.w3-container > h1:nth-child(1)')
            .should('contain.text', 'Submission received')
    })

//2. User can submit with mandatory fields filled
    it('User can submit the form with only mandatory fields filled', () => {

    // Call the function to fill mandatory fields
    fillMandatoryFields()
        
    // Submit the form
        cy.get('input[type="submit"]')
            .should('be.enabled') // Assert that the submit button is enabled
            .click()

    // Verify that the URL has changed
        cy.url().should('not.eq', Cypress.config('baseUrl'))

    // Verify the success message
        cy.get('.w3-container > h1:nth-child(1)')
            .should('contain.text', 'Submission received')

    })

//3. User can not submit with mandatory email absent
    it('User can not submit form with mandatory email field emtpy', () => {

    // Call the function to fill mandatory fields
    fillMandatoryFields()
        
    // Clear username field
        cy.get('input[name="email"]').clear()      

    // Assert that submit button is disabled
        cy.get('input[type="submit"]').should('be.disabled')
    }) 

//4. User can not submit with mandatory country absent
    it('User can not submit form with mandatory country not chosen', () => {

    // Call the function to fill mandatory fields
    fillMandatoryFields()
        
    // Clear country field
        cy.get('#country').select('')      

    // Assert that submit button is disabled
        cy.get('input[type="submit"]').should('be.disabled')
    }) 
//5. User can not submit with mandatory city absent
    it('User can not submit form with mandatory city not chosen', () => {

    // Call the function to fill mandatory fields
    fillMandatoryFields()
        
    // Clear city field
        cy.get('#city').select('')      

    // Assert that submit button is disabled
        cy.get('input[type="submit"]').should('be.disabled')
    })
//6. User can not submit with mandatory checkbox "Accept our privacy policy" checked
    it('User can not submit form with mandatory acceptance not checked', () => {

    // Call the function to fill mandatory fields
    fillMandatoryFields()
        
    // Clear city field
        cy.get('input[type="checkbox"]').eq(0).uncheck()
        cy.get('input[type="checkbox"]').eq(0).should('not.be.checked')     

    // Assert that submit button is disabled
        cy.get('input[type="submit"]').should('be.disabled')
    })  

// 7.User can add a file'
    it('User can upload a file and recieve the success message', () => {
    // Specify the file name and path in the fixtures folder
    const fileName = 'upload_file.html'; // The name of the file to upload

    // Attach the file from the fixtures folder using the file input element
        cy.get('#myFile').attachFile(fileName)

    // If there's an upload button, you may need to click it (adjust selector as needed)
        cy.contains('button', 'Submit file').click()

    // Verify the URL redirects to the success page
        cy.url().should('include', '/upload_file.html')

    // Verify the success message on the page
        cy.get('.w3-container > h1').should('contain.text', 'Submission received')
    })
})




//Assignment 7

/*
BONUS TASK: add visual tests for registration form 3 - done
Task list:
* Create test suite for visual tests for registration form 3 (describe block)
* Create tests to verify visual parts of the page:
    * radio buttons and its content
    * dropdown and dependencies between 2 dropdowns:
        * list of cities changes depending on the choice of country
        * if city is already chosen and country is updated, then city choice should be removed
    * checkboxes, their content and links
    * email format
 */

/*
BONUS TASK: add functional tests for registration form 3 - done
Task list:
* Create second test suite for functional tests
* Create tests to verify logic of the page:
    * all fields are filled in + corresponding assertions
    * only mandatory fields are filled in + corresponding assertions
    * mandatory fields are absent + corresponding assertions (try using function)
    * add file functionlity (google yourself for solution!)
 */