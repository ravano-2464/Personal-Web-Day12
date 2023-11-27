let dataBlog = [];

function submitData(event) {
    event.preventDefault();
    const projectName = document.getElementById("inputMyProject");
    const startDate = document.getElementById("startDate");
    const endDate = document.getElementById("endDate");
    const description = document.getElementById("inputContent");
    const technologies = document.querySelectorAll("input[type=checkbox]:checked");
    const image = document.getElementById("inputImage");

    if (projectName && startDate && endDate && description && technologies && image && image.files.length > 0) {
        const projectNameValue = projectName.value;
        const startDateValue = startDate.value;
        const endDateValue = endDate.value;
        const descriptionValue = description.value;
        const technologiesValue = Array.from(technologies).map((tech) => tech.value);
        const imageValue = image.files[0];

        if (imageValue) {
            const imageUrl = URL.createObjectURL(imageValue);

            console.log(projectNameValue, startDateValue, endDateValue, descriptionValue, technologiesValue, imageUrl);

            const blog = {
                title: projectNameValue, 
                content: descriptionValue,
                technologies: technologiesValue,
                image: imageUrl,
                postAt: "09 November 2023",
                author: "Ravano Akbar Widodo"
            }

            dataBlog.push(blog);
            renderBlog();
        }
    }
}

function renderBlog() {
    const contentsElement = document.getElementById("contents");
    contentsElement.innerHTML = '';

    for (let index = 0; index < dataBlog.length; index++) {
        contentsElement.innerHTML += `
        <div class="blog-list-item">
            <div class="blog-image">
                <img src="${dataBlog[index].image}" alt="" />
            </div>
            <div class="blog-content">
                <div class="btn-group">
                    <button class="btn-edit">Edit Post</button>
                    <button class="btn-post">Delete Post</button>
                </div>
                <h1>
                    <a href="My-Project-detail.html" target="_blank">${dataBlog[index].title}</a>
                </h1>
                <div class="detail-blog-content">
                    ${dataBlog[index].postAt} | ${dataBlog[index].author}
                </div>
                <p>
                   ${dataBlog[index].content}
                </p>
                <div class="technologies">
                    <label>Technologies:</label>
                    <ul>
                        ${dataBlog[index].technologies.map((tech) => `<li>${tech}</li>`).join('')}
                    </ul>
                </div>
            </div>
        </div>`;
    }
}