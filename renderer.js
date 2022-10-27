// const information = document.getElementById('info')
// information.innerText = `This app is using Chrome (v${versions.chrome()}), Node.js (v${versions.node()}), and Electron (v${versions.electron()})`

const func = async () => {
    const response = await window.versions.ping()
    console.log(response)
}

const files_to_compile = []
const file_list = document.getElementById('file-list')

document.addEventListener('drop', (event) => {
	event.preventDefault();
	event.stopPropagation();

    for (const f of event.dataTransfer.files) {
        // Using the path attribute to get absolute file path
        console.log('File Path of dragged files: ', f.path)
        files_to_compile.push(f.path)
        file_list.appendChild(document.createElement('li')).innerText = f.path
    }

    console.log(files_to_compile)
});

document.addEventListener('dragover', (e) => {
	e.preventDefault();
	e.stopPropagation();
});

document.addEventListener('dragenter', (event) => {
	console.log('File is in the Drop Space');
});

document.addEventListener('dragleave', (event) => {
	console.log('File has left the Drop Space');
});
