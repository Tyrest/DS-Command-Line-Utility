// const information = document.getElementById('info')
// information.innerText = `This app is using Chrome (v${versions.chrome()}), Node.js (v${versions.node()}), and Electron (v${versions.electron()})`

const func = async () => {
    const response = await window.versions.ping()
    console.log(response)
}

const files_to_compile = []
const file_list = document.getElementById('file-list')
const compile_container = document.getElementById('compile-container')

document.addEventListener('drop', (event) => {
	event.preventDefault();
	event.stopPropagation();

    for (const f of event.dataTransfer.files) {
        file_name = f.path.replace(/^.*[\\\/]/, '')
        // Using the path attribute to get absolute file path
        console.log('File name of dragged file: ', file_name)
        files_to_compile.push(file_name)
        file_list.appendChild(document.createElement('li')).innerText = file_name
    }

    console.log(files_to_compile)
    
    // filter out only the cpp files
    cpp_files = files_to_compile.filter((file) => {
        return file.endsWith('.cpp')
    })

    compile_container.textContent = "g++ " + cpp_files.join(' ') + " -o output.out"
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

const clear_files_button = document.getElementById('clear-files-button')
const compile_button = document.getElementById('compile-button')
const run_button = document.getElementById('run-button')

clear_files_button.addEventListener('click', () => {
    files_to_compile.length = 0
    file_list.innerHTML = ""
    compile_container.textContent = "No .cpp files detected!"
})