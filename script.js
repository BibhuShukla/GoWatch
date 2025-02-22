document.addEventListener("DOMContentLoaded", () => {
    const categories = document.querySelectorAll(".category");

    categories.forEach(category => {
        category.addEventListener("click", () => {
            alert(`You selected ${category.innerText} category!`);
        });
    });
});
