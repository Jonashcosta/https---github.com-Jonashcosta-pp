class Profile {
  constructor() {
    this.avatar = undefined;
    this.login = undefined;
    this.reposUrl = undefined;
  }

  async init(userUrl) {
    const Profile = await fetch(userUrl, {
      mode: 'cors',
    }).then((res) => {
      return res.json();
    });

    this.avatar = Profile.avatar_url;
    this.login = Profile.login;
    this.reposUrl = Profile.repos_url;
  }
}

async function run() {
  const p = new Profile();

  await p.init('https://api.github.com/users/Jonashcosta');
  start(p.avatar, p.login);
  startrepos(p.reposUrl);
}
run();
function start(avatarsUrl, login) {
  const tagIMG = document.getElementById('avatarsUrl');
  tagIMG.src = avatarsUrl;
  tagIMG.alt = login;
  document.title = login;
}
async function startrepos(reposURL) {
  const repos = await fetch(reposURL, {
    mode: 'cors',
  }).then((res) => {
    return res.json();
  });

  for (const key in repos) {
    if (Object.hasOwnProperty.call(repos, key)) {
      const element = repos[key];

      // Buscar elemento pai
      let elemento_pai = document.getElementById('cards');

      // Criar elemento

      let tagDiv = document.createElement('div');
      let tagA = document.createElement('a');
      let tagH2 = document.createElement('h2');
      let tagH3 = document.createElement('h3');

      // inserir class
      tagDiv.classList.add('card');
      tagA.classList.add('link');

      tagA.href = element.html_url;
      tagA.target = '_blank';

      // Inserir (anexar) o elemento filho (titulo) ao elemento pai (body)

      tagH2.appendChild(document.createTextNode(element.name));
      tagH3.appendChild(document.createTextNode(element.description));
      tagA.appendChild(tagH2);

      tagDiv.appendChild(tagA);
      tagDiv.appendChild(tagH3);
      elemento_pai.appendChild(tagDiv);
    }
  }
}

//avatar avatar-user width-full border color-bg-default
