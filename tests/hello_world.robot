*** Settings ***
Documentation     Simple example using SeleniumLibrary.
Library           SeleniumLibrary

*** Variables ***
${LOGIN URL}      http://localhost:3000
${BROWSER}        Chrome
${password}       azure
${username}       demo1
${email}          demo1@gmail.com

*** Test Cases ***
1. Open Website
    Open Browser    ${LOGIN URL}    ${BROWSER}
    #Maximize Browser Window
    Title Should Be    Pluie
    #Set Selenium Speed    0.3

# Check the 
2. Check Login Page
    Element Should Be Visible    id=login-h2
    Element Should Be Visible    id=login-input-email
    Element Should Be Visible    id=login-input-password
    Element Should Be Visible    id=login-btn-register
    Element Should Be Visible    id=login-btn-signin
    Element Should Be Visible    id=btn-google-login

3. Demo Register
   # Set Focus To Element    id=input-email
   # Set Selenium Timeout    1 second
    #Input Text    id=input-email    max@gmail.com
    #Input Text    id=input-password    ${password}
    Click Button    id=login-btn-register
    Get Text        id=register-h2
    Input Text      id=register-input-email       ${email}
    Input Text      id=register-input-username    ${username}
    Input Text      id=register-input-password    ${password}
    Click Button    id=register-btn-register
    Click Button    id=register-btn-login
  

4. Demo Login
    
    Input Text      id=login-input-email       ${email}
    Input Text      id=login-input-password    ${password}
    Click Button    id=login-btn-signin
#4. Close Window
#   Close Browser

5. Check Welcome Screen
    #Get WebElement    id=modal-modal-title
    Current Frame Should Contain    Pluie


*** Keywords ***
