import { ofetch } from "ofetch";

document.getElementById('home').addEventListener('click', function (event) {
  event.preventDefault();
  showSection('homeSection');
});

document.getElementById('allProjects').addEventListener('click', function (event) {
  event.preventDefault();
  showSection('projectSection');
  loadProjects();
});

document.getElementById('newProject').addEventListener('click', function (event) {
  event.preventDefault();
  showSection('newProjectSection');
});

function showSection(sectionId) {
  document.getElementById('homeSection').style.display = 'none';
  document.getElementById('projectSection').style.display = 'none';
  document.getElementById('newProjectSection').style.display = 'none';
  
  document.getElementById(sectionId).style.display = 'block';
}

function loadProjects() {
  ofetch('http://localhost:3000/projects')
    .then((response) => {
      console.log('Projects data:', response);
      const projectSection = document.getElementById('projectSection');
      projectSection.innerHTML = '';

      response?.forEach(project => {
        const projectArticle = document.createElement('article');
        projectArticle.classList.add('project');

        projectArticle.innerHTML = `
          <h2>${project.name}</h2>
          <p>Beskrivelse: ${project.description}</p>
          <p>Startdato: ${project.started}</p>
          <p>Sluttdato: ${project.finished}</p>
          <a href="${project.link}">Se prosjekt</a>
        `;

        projectSection.appendChild(projectArticle);
      });
    })
}


document.getElementById('newProjectForm').addEventListener('submit', function(event) {
  event.preventDefault();

  const projectName = document.getElementById('projectName').value;
  const projectDescription = document.getElementById('projectDescription').value;
  const startMonth = document.getElementById('startMonth').value;
  const startYear = document.getElementById('startYear').value;
  const endMonth = document.getElementById('endMonth').value;
  const endYear = document.getElementById('endYear').value;

  const newProject = {
    name: projectName,
    description: projectDescription,
    startDate: `${startYear}-${startMonth}`, 
    endDate: `${endYear}-${endMonth}`
  };

  fetch('http://localhost:3000/projects/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newProject)
  })
});
