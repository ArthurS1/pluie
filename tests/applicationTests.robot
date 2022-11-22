*** Settings ***
Documentation     Testing file for Pluie cloud application
Library           SeleniumLibrary    screenshot_root_directory=../tests//SeleniumScreenshots
Library           FakerLibrary    locale=de_DE  


*** Variables ***
${LOGIN URL}          http://localhost:3000
${BROWSER}            Chrome
${INVALID_EMAIL}      invalidMail.com
${USERNAME_IN_USE}    demo123
${PASSWORD}           azure
${EMAIL_IN_USE}       demo@gmail.com


*** Test Cases ***
1. Open Website
    Open Browser    ${LOGIN URL}    ${BROWSER}
    Title Should Be    Pluie
    Set Selenium Speed    0.3


2. Check Elements of Login Page
    Element Should Be Visible    id=login-h2
    Element Should Be Visible    id=login-input-email
    Element Should Be Visible    id=login-input-password
    Element Should Be Visible    id=login-btn-register
    Element Should Be Visible    id=login-btn-signin
    Element Should Be Visible    class=ButtonGoogle


3 Check Invalid Login Data
    Input Text      id=login-input-email       ${INVALID_EMAIL}
    Input Text      id=login-input-password    ${PASSWORD}
    Click Button    id=login-btn-signin
    Set Selenium Timeout    2 second
    Page Should Contain    Invalid information !


4. Register With Email Already In Use
    Click Button    id=login-btn-register
    Get Text        id=register-h2
    Input Text      id=register-input-email       ${EMAIL_IN_USE}
    ${RANDOM_NAME}=    FakerLibrary.Name 
    Input Text      id=register-input-username    ${RANDOM_NAME}
    Input Text      id=register-input-password    ${PASSWORD}
    Click Button    id=register-btn-register
    Set Selenium Timeout    2 second
    Page Should Contain    Mail already use !
    Click Button    id=register-btn-login


5. Register With Username Already In Use
    Click Button    id=login-btn-register
    Get Text        id=register-h2
    ${RANDOM_EMAIL}=    FakerLibrary.Email 
    Input Text      id=register-input-email       ${RANDOM_EMAIL}
    Input Text      id=register-input-username    ${USERNAME_IN_USE}
    Input Text      id=register-input-password    ${PASSWORD}
    Click Button    id=register-btn-register
    Set Selenium Timeout    2 second
    Page Should Contain    Username already use !
    Click Button    id=register-btn-login


6. Register With New Credentials
    Click Button    id=login-btn-register
    Get Text        id=register-h2
    ${RANDOM_EMAIL}=    FakerLibrary.Email 
    ${RANDOM_NAME}=    FakerLibrary.Name 
    Input Text      id=register-input-email       ${RANDOM_EMAIL}
    Input Text      id=register-input-username    ${RANDOM_NAME}
    Input Text      id=register-input-password    ${PASSWORD}
    Click Button    id=register-btn-register
    Set Selenium Timeout    2 second
    Page Should Contain    Account created !
    Click Button    id=register-btn-login


7. Demo Login
    Input Text      id=login-input-email       ${EMAIL_IN_USE}
    Input Text      id=login-input-password    ${PASSWORD}
    Click Button    id=login-btn-signin
    Location Should Be    http://localhost:3000/home
    
    