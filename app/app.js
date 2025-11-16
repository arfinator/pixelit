//create pixelit object
const px = new pixelit({ from: document.getElementById("pixelitimg") });

//palette list
let paletteList = [
  [[7, 5, 5], [33, 25, 25], [82, 58, 42], [138, 107, 62], [193, 156, 77], [234, 219, 116], [160, 179, 53], [83, 124, 68], [66, 60, 86], [89, 111, 175], [107, 185, 182], [251, 250, 249], [184, 170, 176], [121, 112, 126], [148, 91, 40]],
  [[13, 43, 69], [32, 60, 86], [84, 78, 104], [141, 105, 122], [208, 129, 89], [255, 170, 94], [255, 212, 163], [255, 236, 214]],
  [[43, 15, 84], [171, 31, 101], [255, 79, 105], [255, 247, 248], [255, 129, 66], [255, 218, 69], [51, 104, 220], [73, 231, 236]],
  [[48, 0, 48], [96, 40, 120], [248, 144, 32], [248, 240, 136]],
  [[239, 26, 26], [172, 23, 23], [243, 216, 216], [177, 139, 139], [53, 52, 65], [27, 26, 29]],
  [[26, 28, 44], [93, 39, 93], [177, 62, 83], [239, 125, 87], [255, 205, 117], [167, 240, 112], [56, 183, 100], [37, 113, 121], [41, 54, 111], [59, 93, 201], [65, 166, 246], [115, 239, 247], [244, 244, 244], [148, 176, 194], [86, 108, 134], [51, 60, 87]],
  [[44, 33, 55], [118, 68, 98], [237, 180, 161], [169, 104, 104]],
  [[171, 97, 135], [235, 198, 134], [216, 232, 230], [101, 219, 115], [112, 157, 207], [90, 104, 125], [33, 30, 51]],
  [[140, 143, 174], [88, 69, 99], [62, 33, 55], [154, 99, 72], [215, 155, 125], [245, 237, 186], [192, 199, 65], [100, 125, 52], [228, 148, 58], [157, 48, 59], [210, 100, 113], [112, 55, 127], [126, 196, 193], [52, 133, 157], [23, 67, 75], [31, 14, 28]],
  [[94, 96, 110], [34, 52, 209], [12, 126, 69], [68, 170, 204], [138, 54, 34], [235, 138, 96], [0, 0, 0], [92, 46, 120], [226, 61, 105], [170, 92, 61], [255, 217, 63], [181, 181, 181], [255, 255, 255]],
  [[49, 31, 95], [22, 135, 167], [31, 213, 188], [237, 255, 177]],
  [[21, 25, 26], [138, 76, 88], [217, 98, 117], [230, 184, 193], [69, 107, 115], [75, 151, 166], [165, 189, 194], [255, 245, 247]]
];
let currentPalette = 0;

//*** Helper functions
const addPalette = (palette = []) => {
  let data = JSON.parse(localStorage.getItem("customPalettes")) || [];
  data.push(palette);
  localStorage.setItem("customPalettes", JSON.stringify(data));
};

const pullFromLocalStorage = () => {
  return JSON.parse(localStorage.getItem("customPalettes")) || [];
};

const rgbToInt = (rgb) => {
  let r = parseInt(rgb.substring(1, 3), 16);
  let g = parseInt(rgb.substring(3, 5), 16);
  let b = parseInt(rgb.substring(5, 7), 16);
  return [r, g, b];
};

const removeDuplicates = (arr) => {
  return [...new Set(arr)];
};

//*** Main pixelate function
const pixelit = () => {
  document.querySelector(".loader").classList.add("active");
  setTimeout(() => {
    document.querySelector(".loader").classList.remove("active");
  }, 800);

  px.setScale(blocksize.value)
    .setPalette(paletteList[currentPalette])
    .draw()
    .pixelate();

  greyscale.checked ? px.convertGrayscale() : null;
  palette.checked ? px.convertPalette() : null;
  maxheight.value ? px.setMaxHeight(maxheight.value).resizeImage() : null;
  maxwidth.value ? px.setMaxWidth(maxwidth.value).resizeImage() : null;
};

//*** Image loading helper
const loadImageFromFile = (file) => {
  if (file && file.type.startsWith('image/')) {
    const img = new Image();
    img.src = URL.createObjectURL(file);
    img.onload = () => {
      px.setFromImgSource(img.src);
      pixelit();
    };
  }
};

//*** Initialize on DOM ready
document.addEventListener("DOMContentLoaded", function () {

  //*** Clipboard paste
  document.addEventListener('paste', (e) => {
    console.log('Paste event triggered!');
    e.preventDefault();
    const items = e.clipboardData?.items;
    console.log('Clipboard items:', items);

    if (!items) {
      console.log('No clipboard items found');
      return;
    }

    for (let i = 0; i < items.length; i++) {
      console.log('Item', i, 'type:', items[i].type);
      if (items[i].type.indexOf('image') !== -1) {
        console.log('Found image! Loading...');
        const file = items[i].getAsFile();
        loadImageFromFile(file);
        break;
      }
    }
  });

  //*** Drag and drop
  const dropZone = document.getElementById('pixelitcanvas');

  dropZone.addEventListener('dragover', (e) => {
    e.preventDefault();
    e.stopPropagation();
    dropZone.style.opacity = '0.5';
  });

  dropZone.addEventListener('dragleave', (e) => {
    e.preventDefault();
    e.stopPropagation();
    dropZone.style.opacity = '1';
  });

  dropZone.addEventListener('drop', (e) => {
    e.preventDefault();
    e.stopPropagation();
    dropZone.style.opacity = '1';

    const files = e.dataTransfer?.files;
    if (files && files.length > 0) {
      loadImageFromFile(files[0]);
    }
  });

  //*** File input
  document.getElementById("pixlInput").onchange = function (e) {
    if (this.files && this.files[0]) {
      loadImageFromFile(this.files[0]);
    }
  };

  //*** Populate palette selector
  const populatePalettes = () => {
    const customPalettes = pullFromLocalStorage();
    paletteList = [...paletteList, ...customPalettes];

    const selector = document.getElementById("paletteselector");
    selector.innerHTML = '';

    paletteList.forEach((palette, i) => {
      const option = document.createElement("option");
      option.value = i;
      option.textContent = `Palette ${i + 1} (${palette.length} colors)`;
      selector.appendChild(option);
    });
  };

  populatePalettes();

  //*** Palette selector
  document.getElementById("paletteselector").addEventListener("change", function(e) {
    currentPalette = parseInt(this.value);
    palette.checked = true;
    pixelit();
  });

  //*** Controls
  const blocksize = document.getElementById("blocksize");
  blocksize.addEventListener("input", function (e) {
    document.getElementById("blockvalue").innerText = this.value;
    pixelit();
  });

  const greyscale = document.getElementById("greyscale");
  greyscale.addEventListener("change", pixelit);

  const palette = document.getElementById("palette");
  palette.addEventListener("change", pixelit);

  const maxheight = document.getElementById("maxheight");
  maxheight.addEventListener("change", pixelit);

  const maxwidth = document.getElementById("maxwidth");
  maxwidth.addEventListener("change", pixelit);

  //*** Custom palette
  document.getElementById('addcustomcolor').addEventListener('click', () => {
    let color = document.getElementById('customcolor').value;
    const colorSpan = document.createElement('span');
    colorSpan.style.backgroundColor = color;
    colorSpan.dataset.color = rgbToInt(color).join(',');
    colorSpan.classList.add('colorblock');
    document.getElementById('currentpallete').appendChild(colorSpan);
  });

  document.getElementById('savecustompalette').addEventListener('click', () => {
    let palette = [];
    let colors = document.querySelectorAll('#currentpallete .colorblock');
    colors.forEach((color) => {
      palette.push(color.dataset.color);
    });

    palette = removeDuplicates(palette).map((color) => color.split(','));
    addPalette(palette);

    const currentPalette = document.getElementById('currentpallete');
    while (currentPalette.firstChild) {
      currentPalette.removeChild(currentPalette.firstChild);
    }

    populatePalettes();
  });

  document.getElementById('clearcustompalettes').addEventListener('click', () => {
    localStorage.setItem("customPalettes", JSON.stringify([]));
    location.reload();
  });

  //*** Download
  document.getElementById("downloadimage").addEventListener("click", function (e) {
    px.saveImage();
  });

  //*** Initial render
  pixelit();
});
