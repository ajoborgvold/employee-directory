import employees from './employees.js'

const employeesHeading = document.getElementById('employees-heading')
const employeesContainer = document.getElementById('employees-container')
const selectMenu = document.getElementById('select-menu')
const searchField = document.getElementById('search-field')
let employeesHtml = ''


//----- Event listeners -----//
selectMenu.addEventListener('change', filterEmployeesByTeam)
searchField.addEventListener('input', filterEmployeesByName)


//----- Populate dropdown from js teams  -----//
let selectOptions = [...new Set(
    employees.map(employee => employee.team)
    )]
    
for (let i = 0; i < selectOptions.length; i++) {
    let option = document.createElement("option");
    option.value = selectOptions[i];
    option.text = selectOptions[i].charAt(0).toUpperCase() + selectOptions[i].slice(1);
    selectMenu.add(option);
}


//----- Display all employees when the page loads -----//
getEmployeesHtml(employees)


//----- Filter employees using select menu/search field -----//
let targetTeam = employees

function filterEmployeesByTeam() {
    searchField.value = ''
    employeesHtml = ''
    employeesContainer.innerHTML = ''
    const allTeams = employees.map(item => item.team)
    
    const selectedTeam = allTeams.filter(item => {
        return item === selectMenu.value
    })
    
    targetTeam = employees.filter(item => {
        if (item.team === selectedTeam[0]) {
            return item
        }
        else if (!selectedTeam.length) {
            return employees
        }
    })
    
    getEmployeesHtml(targetTeam)
}

function filterEmployeesByName() {
    employeesHtml = ''
    employeesContainer.innerHTML = ''
    const searchValue = searchField.value.toLowerCase()

    const targetEmployees = targetTeam.map(item => {
        if (item.name.toLowerCase().includes(searchValue)) {
            return item
        }
    }).filter(Boolean)
    
    getEmployeesHtml(targetEmployees)
}


//----- Get and render the html -----//

function getEmployeesHtml(teamMembers) {
    teamMembers.map(item => {   
        
        const socialHtml = item.social.map(social => {
            return `
                <a href="${social.link}" target="_blank"><img src="${social.icon}" class="social-icon" alt="${social.link}"></a>
            `
        }).join('') 
        
        employeesHtml += `
            <div class="employee-card">
                <img src="../images/photos/${item.image}" class="employee__img" alt="${item.name}">
                <h3 class="employee__name">${item.name}</h3>
                <h4 class="employee__title">${item.title}</h4>
                <p class="employee__bio">${item.bio}</p>
                <div class="employee__social-wrapper">${socialHtml}</div>
            </div>
        `
    })
    renderEmployees()
}


function renderEmployees() {
    console.log(selectMenu.value)
    employeesHeading.textContent = selectMenu.value ? 
        `Team: ${selectMenu.value.charAt(0).toUpperCase() + selectMenu.value.slice(1)}` : 'All employees'
    employeesContainer.innerHTML = employeesHtml
}


