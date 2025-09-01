// const fileInput = document.getElementById('fileInput');
// const fileName = document.getElementById('fileName');
// const fileInfo = document.getElementById('fileInfo');
// const fileDetails = document.getElementById('fileDetails');
// const checkButton = document.getElementById('checkButton');
// const uploadSection = document.getElementById('uploadSection');
// const loading = document.getElementById('loading');
// const loadingSteps = document.getElementById('loadingSteps');
// const analysisSection = document.getElementById('analysisSection');
// const analysisTitle = document.getElementById('analysisTitle');
// const analysisSubtitle = document.getElementById('analysisSubtitle');
// const analysisBody = document.getElementById('analysisBody');
// const detailsGrid = document.getElementById('detailsGrid');
// const checkAnotherBtn = document.getElementById('checkAnotherBtn');

// let selectedFile = null;

// const loadingMessages = [
//     "Initializing security scanner...",
//     "Extracting APK manifest...",
//     "Analyzing permissions structure...",
//     "Scanning for malicious patterns...",
//     "Validating certificates...",
//     "Checking threat databases...",
//     "Performing behavioral analysis...",
//     "Generating security report..."
// ];

// fileInput.addEventListener('change', function(e) {
//     const file = e.target.files[0];
//     if (file) {
//         if (file.name.toLowerCase().endsWith('.apk')) {
//             selectedFile = file;
//             fileName.textContent = file.name;
//             checkButton.disabled = false;
            
//             fileInfo.style.display = 'block';
//             fileDetails.innerHTML = `
//                 <div><strong>Filename:</strong> ${file.name}</div>
//                 <div><strong>Size:</strong> ${(file.size / (1024 * 1024)).toFixed(2)} MB</div>
//                 <div><strong>Type:</strong> Android Package (APK)</div>
//                 <div><strong>Status:</strong> Ready for analysis</div>
//             `;
            
//             uploadSection.classList.add('file-selected');
//         } else {
//             alert('Please select a valid APK file.');
//             resetFileInput();
//         }
//     } else {
//         resetFileInput();
//     }
// });

// function resetFileInput() {
//     selectedFile = null;
//     fileName.textContent = 'No file chosen';
//     checkButton.disabled = true;
//     fileInput.value = '';
//     fileInfo.style.display = 'none';
//     uploadSection.classList.remove('file-selected');
// }

// checkButton.addEventListener('click', function() {
//     if (!selectedFile) return;

//     uploadSection.style.display = 'none';
//     analysisSection.style.display = 'none';
//     loading.style.display = 'block';

//     let stepIndex = 0;
//     const stepInterval = setInterval(() => {
//         if (stepIndex < loadingMessages.length) {
//             loadingSteps.textContent = loadingMessages[stepIndex];
//             stepIndex++;
//         } else {
//             clearInterval(stepInterval);
//         }
//     }, 800);

//     setTimeout(() => {
//         clearInterval(stepInterval);
//         performAnalysis(selectedFile);
//     }, loadingMessages.length * 800 + 1000);
// });

// async function performAnalysis(file) {
//     const formData = new FormData();
//     formData.append('apk', file);

//     const response = await fetch('/analyze', {
//         method: 'POST',
//         body: formData
//     });
//     const analysis = await response.json();

//     analysisTitle.textContent = `Security Analysis: ${file.name}`;
//     analysisSubtitle.textContent = `Completed at ${new Date().toLocaleString()}`;

//     analysisBody.innerHTML = '';
//     detailsGrid.innerHTML = '';

//     const featureIcons = {
//         'Has Bank Keyword': '🏦',
//         'Permissions Count': '🔐',
//         'File Size (KB)': '📱',
//         'Has SMS Permission': '📱',
//         'Has Camera Permission': '📷',
//         'Certificate Valid': '📋',
//         'Code Obfuscation': '🔒',
//         'Network Connections': '🌐',
//         'Prediction': '🎯'
//     };

//     analysis.features.forEach(item => {
//         const row = document.createElement('tr');
//         const featureCell = document.createElement('td');
//         const valueCell = document.createElement('td');
        
//         featureCell.className = 'feature-name';
//         featureCell.innerHTML = `${featureIcons[item.feature] || '🔍'} ${item.feature}`;
        
//         valueCell.className = 'feature-value';
//         if (item.feature === 'Prediction') {
//             valueCell.className += item.value === 'fake' ? ' prediction-fake' : ' prediction-safe';
//             valueCell.innerHTML = `<span class="risk-indicator ${item.value === 'fake' ? 'risk-high' : 'risk-low'}">${item.value.toUpperCase()}</span>`;
//         } else {
//             valueCell.textContent = item.value;
//         }
        
//         row.appendChild(featureCell);
//         row.appendChild(valueCell);
//         analysisBody.appendChild(row);
//     });

//     analysis.details.forEach(detail => {
//         const card = document.createElement('div');
//         card.className = 'detail-card';
//         card.innerHTML = `<h4>${detail.title}</h4><p>${detail.description}</p>`;
//         detailsGrid.appendChild(card);
//     });

//     loading.style.display = 'none';
//     analysisSection.style.display = 'block';
//     analysisSection.scrollIntoView({ behavior: 'smooth' });
// }

// checkAnotherBtn.addEventListener('click', function(e) {
//     e.preventDefault();
//     resetFileInput();
//     uploadSection.style.display = 'block';
//     analysisSection.style.display = 'none';
// });












const fileInput = document.getElementById('fileInput');
const fileName = document.getElementById('fileName');
const fileInfo = document.getElementById('fileInfo');
const checkButton = document.getElementById('checkButton');
const uploadSection = document.getElementById('uploadSection');
const loading = document.getElementById('loading');
const loadingSteps = document.getElementById('loadingSteps');
const analysisSection = document.getElementById('analysisSection');
const analysisTitle = document.getElementById('analysisTitle');
const analysisSubtitle = document.getElementById('analysisSubtitle');
const analysisBody = document.getElementById('analysisBody');
const detailsGrid = document.getElementById('detailsGrid');

let selectedFile = null;

// File select
fileInput.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if(file && file.name.toLowerCase().endsWith('.apk')){
        selectedFile = file;
        fileName.textContent = file.name;
        checkButton.disabled = false;
        fileInfo.style.display = 'block';
        fileInfo.innerHTML = `<div>Filename: ${file.name}</div><div>Size: ${(file.size/1024).toFixed(2)} KB</div>`;
    } else {
        alert('Please select a valid APK file.');
        selectedFile = null;
        fileName.textContent = 'No file chosen';
        checkButton.disabled = true;
        fileInfo.style.display = 'none';
    }
});

// Analyze button
checkButton.addEventListener('click', () => {
    if(!selectedFile) return;

    uploadSection.style.display = 'none';
    analysisSection.style.display = 'none';
    loading.style.display = 'block';
    loadingSteps.textContent = "Uploading APK to server...";

    const formData = new FormData();
    formData.append('apk_file', selectedFile);

    fetch('/analyze', { method: 'POST', body: formData })
    .then(res => res.json())
    .then(data => {
        loading.style.display = 'none';
        analysisSection.style.display = 'block';
        analysisSection.scrollIntoView({behavior:'smooth'});

        analysisTitle.textContent = `Security Analysis: ${data.filename}`;
        analysisSubtitle.textContent = `Analysis completed at ${new Date().toLocaleString()}`;

        analysisBody.innerHTML = '';
        data.features.forEach(f => {
            const row = document.createElement('tr');
            row.innerHTML = `<td>${f.feature}</td><td>${f.value}</td>`;
            analysisBody.appendChild(row);
        });

        detailsGrid.innerHTML = '';
        data.details.forEach(d => {
            const card = document.createElement('div');
            card.innerHTML = `<h4>${d.title}</h4><p>${d.description}</p>`;
            detailsGrid.appendChild(card);
        });
    })
    .catch(err => {
        loading.style.display = 'none';
        alert("Error analyzing APK: " + err);
        uploadSection.style.display = 'block';
    });
});

// Make file-button clickable
document.querySelector('.file-button').addEventListener('click', () =>
