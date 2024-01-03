const url = "src.json";

fetch(url)
  .then((response) => response.json())
  .then((data) => {
    for (let item of data.apps) {
      const PackageID = item.PackageID;
      const repo = item.repo;

      const viewCountEl = document.createElement("h4");
      viewCountEl.textContent = "Loading...";

      async function getViewCount(packageId, viewCountEl) {
        if (repo) {
          try {
            const githubUrl = `https://api.github.com/repos/${repo}/releases/latest`;
            const githubResponse = await fetch(githubUrl);

            if (githubResponse.status === 403) {
              throw new Error("GitHub API Rate Limit Exceeded");
            }

            const githubData = await githubResponse.json();

            const downloadCount = githubData.assets.reduce(
              (total, asset) => total + asset.download_count,
              0
            );

            const url = `https://bootloopdb.c22code.repl.co/${PackageID}`;
            const response = await fetch(url);
            const data = await response.text();
            const viewsCount = parseInt(data, 10);
            const percentage = (viewsCount / downloadCount) * 100;

            viewCountEl.textContent = `Probability: ${percentage.toFixed(2)}%`;
          } catch (error) {
            const url = `https://bootloopdb.c22code.repl.co/${PackageID}`;
            const response = await fetch(url);
            const data = await response.text();
            const viewsCount = parseInt(data, 10);
            viewCountEl.textContent = `Bootloops: ${viewsCount}`;
          }
        } else {
          const url = `https://bootloopdb.c22code.repl.co/${PackageID}`;
          const response = await fetch(url);
          const data = await response.text();
          const viewsCount = parseInt(data, 10);
          viewCountEl.textContent = `Bootloops: ${viewsCount}`;
        }
      }

      getViewCount(PackageID, viewCountEl);
      const box = document.createElement("div");
      box.classList.add("box");

      const img = document.createElement("img");
      img.setAttribute("src", item.Icon);

      const title = document.createElement("h3");
      title.textContent = item.Name;

      const spacer = document.createElement("br");

      const downloadLink = item.Releases[item.Releases.length - 1].Package;
      const downloadBtn = document.createElement("a");
      downloadBtn.setAttribute("href", downloadLink);
      downloadBtn.textContent = "GET";

      box.appendChild(img);
      box.appendChild(title);
      box.appendChild(spacer);
      box.appendChild(viewCountEl);
      box.appendChild(downloadBtn);

      document.getElementById("boxes").appendChild(box);
    }
  })
  .catch((error) => console.error(error));
