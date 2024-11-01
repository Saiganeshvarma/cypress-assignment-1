describe('Login functionality',()=>{

    beforeEach(()=>{
        cy.visit('https://www.saucedemo.com/v1/')
    })

    it('TC_01 Verify the login functionality with valid credentials ',()=>{

        
        cy.get('[data-test="username"]').type('standard_user')
        cy.get('[data-test="password"]').type('secret_sauce')
        cy.get('#login-button').click()
        
        //Assertions
        cy.url().should('eql','https://www.saucedemo.com/v1/inventory.html')
        cy.go('back')
        cy.url().should('not.equal','https://www.saucedemo.com/v1/inventory.html')
        cy.go('forward')
        cy.get('.app_logo').should('be.visible')
        
    })

    it('TC_02 Verify the login functionality with Invalid credentials ',()=>{

        cy.get('[data-test="username"]').type('standard_user0123?@@""')
        cy.get('[data-test="password"]').type('_@01')
        cy.get('#login-button').click()

        //Assertions
        cy.url().should('eql','https://www.saucedemo.com/v1/')
        cy.get('[data-test="error"]').should('have.text','Epic sadface: Username and password do not match any user in this service')
        cy.get('.bot_column').should('be.visible')
    })

    it('TC_03 Verify the login functionality with Empty credentials ',()=>{

    
        cy.get('#login-button').click()

        //Assertions
        cy.url().should('eql','https://www.saucedemo.com/v1/')
        cy.get('[data-test="error"]').should('have.text','Epic sadface: Username is required','be.visible')
        cy.get('.bot_column').should('be.visible')
    })

})