const contentContainers = document.querySelectorAll('.content');
const searchInput = document.getElementById('searchInput');
const searchResults = document.getElementById('searchResults');

function searchPackages(query) {
    searchResults.innerHTML = '';
    for (const url of jsonUrls) {
        fetch(url)
            .then(response => response.json())
            .then(data => {
                if (data.packages && Array.isArray(data.packages)) {
                    const matchingPackages = data.packages.filter(package => {
                        const packageName = package.name.toLowerCase();
                        return packageName.includes(query.toLowerCase());
                    });

                    if (matchingPackages.length > 0) {
                        const repoTitle = document.createElement('h2');
                        repoTitle.className = 'repo-title';
                        repoTitle.textContent = data.name || data.RepositoryName;
                        searchResults.appendChild(repoTitle);

                        matchingPackages.forEach(app => {
                            const appContainer = document.createElement('div');
                            appContainer.className = 'app-container';
                            const appIcon = document.createElement('img');
                            appIcon.className = 'app-icon';
                            appIcon.src = app.Icon ?? url.substring(0, url.lastIndexOf('/') + 1) + app.icon;
                            appContainer.appendChild(appIcon);
                            const appInfo = document.createElement('div');
                            const appTitle = document.createElement('p');
                            appTitle.className = 'app-title';
                            appTitle.textContent = app.name ?? app.Name;
                            appInfo.appendChild(appTitle);
                            const appDescription = document.createElement('p');
                            appDescription.className = 'app-description';
                            appDescription.textContent = app.description ?? app.Description;
                            appInfo.appendChild(appDescription);
                            appContainer.appendChild(appInfo);
                            appContainer.addEventListener('click', () => {
                                showPackageDetail(url, app);
                            });

                            searchResults.appendChild(appContainer);
                        });
                    }
                }
            })
            .catch(error => {
                console.error(`Error fetching data from ${url}:`, error);
            });
    }
}

searchInput.addEventListener('input', () => {
    const query = searchInput.value.trim();
    searchPackages(query);
});