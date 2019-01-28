import JSZip from 'jszip';

const readFile = (file, resolve) => {
  return new Promise((resolve) => {
    const reader = new FileReader();

    reader.onloadend = (event) => {
      if (event.target.readyState === FileReader.DONE) {
        resolve(event.target.result);
      }
    }

    reader.readAsBinaryString(file);
  })
}

export const generateZip = (files) => {
  const readFiles = this.state.files.map(file => {
    const { name } = file;
    const contentPromise = readFile(file);

    return { name, contentPromise };
  })

  const zip = new JSZip();

  readFiles.forEach(({ name, contentPromise }) => {
      zip.file(name, contentPromise);
  });

  return (
    zip.generateAsync({ type: 'blob' })
  )
}

