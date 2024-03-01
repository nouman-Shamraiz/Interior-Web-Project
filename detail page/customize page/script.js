const fileInput = document.querySelector(".file-input"),
    previewImg = document.querySelector(".preview-img img"),
    filterOptions = document.querySelectorAll(".filter button"),
    filterName = document.querySelector(".filter-info .name"),
    filterValue = document.querySelector(".filter-info .value"),
    filterSlider = document.querySelector(".slider input"),
    rotateOptions = document.querySelectorAll(".rotate button"),
    resetFilterBtn = document.querySelector(".reset-filter"),
    saveImgBtn = document.querySelector(".save-img"),
    chooseImgBtn = document.querySelector(".choose-img");


let xAxis = 0, yAxis = 0, zAxis = 0, zoom = 0;
applyTransformation = () => {
    previewImg.style.transform = `rotateX(${xAxis}deg) rotateY(${yAxis}deg) rotateZ(${zAxis}deg) scale(${1 + zoom / 100})`;
}

const loadImage = () => {
    let file = fileInput.files[0];
    if (!file) return;
    previewImg.src = URL.createObjectURL(file);
    previewImg.addEventListener("load", () => {
        resetFilterBtn.click();
        document.querySelector(".container").classList.remove("disable");
        document.querySelector("h2").innerHTML = "Image Have Been Chosen!";
    });
}

filterOptions.forEach(option => {
    option.addEventListener("click", () => {
        document.querySelector(".filter .active").classList.remove("active");
        option.classList.add("active");
        filterName.innerHTML = option.innerHTML;

        if (option.id === "Brightness") {
            filterSlider.max = "200";
            filterSlider.value = xAxis;
            filterValue.innerHTML = `${xAxis}°`;
        }
        else if (option.id === "Saturation") {
            filterSlider.max = "200";
            filterSlider.value = yAxis;
            filterValue.innerHTML = `${yAxis}°`;
        }
        else if (option.id === "Inversion") {
            filterSlider.max = "100";
            filterSlider.value = zAxis;
            filterValue.innerHTML = `${zAxis}°`;
        }
        else {
            filterSlider.max = "100";
            filterSlider.value = zoom;
            filterValue.innerHTML = `${zoom}%`;
        }
    });
});

updateFilters = () => {
    filterValue.innerHTML = `${filterSlider.value}%`;
    const selectedFilter = document.querySelector(".filter .active");
    if (selectedFilter.id === "Brightness") {
        xAxis = filterSlider.value;
    }
    else if (selectedFilter.id === "Saturation") {
        yAxis = filterSlider.value;
    }
    else if (selectedFilter.id === "Inversion") {
        zAxis = filterSlider.value;
    }
    else {
        zoom = filterSlider.value;
    }
    applyTransformation();
}

rotateOptions.forEach(option => {
    option.addEventListener("click", () => {
        if (option.id === "left") {
            xAxis -= 90;
        }
        else if (option.id === "right") {
            xAxis += 90;
        }
        else if (option.id === "horizontal") {
            yAxis = 0;
            zAxis += 180;
        }
        else {
            yAxis += 180;
            zAxis = 0;
        }
        applyTransformation();
    });
});

const resetFilter = () => {
    xAxis = 0, yAxis = 0, zAxis = 0, zoom = 0;
    filterOptions[0].click();
    document.querySelector("h2").innerHTML = "You Reset The Filters!";
    applyTransformation();
}

const saveImage = () => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    canvas.width = previewImg.naturalWidth;
    canvas.height = previewImg.naturalHeight;
    ctx.translate(canvas.width / 2, canvas.height / 2);
    ctx.scale(flipHorizontal, flipVertical);
    ctx.filter = `rotateX(${xAxis}deg) rotateY(${yAxis}deg) rotateZ(${zAxis}deg) scale(${1 + zoom / 100})`;
    ctx.drawImage(previewImg, -canvas.width / 2, -canvas.height / 2, canvas.width, canvas.height);

    const link = document.createElement("a");
    link.download = "image.jpg";
    link.href = canvas.toDataURL();
    link.click();
    document.querySelector("h2").innerHTML = "Image Saved; Made by Shayan with ❤";
}
// Your existing JavaScript code

// Add this part for height and width sliders



fileInput.addEventListener("change", loadImage);
filterSlider.addEventListener("input", updateFilters);
saveImgBtn.addEventListener("click", saveImage);
resetFilterBtn.addEventListener("click", resetFilter);
chooseImgBtn.addEventListener("click", () => fileInput.click());
