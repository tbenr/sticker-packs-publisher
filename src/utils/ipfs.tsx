async function ipfsAdd(content: string | Blob) {
    const formData = new FormData();
    formData.append("", content);
    const response = await fetch("https://ipfs.infura.io:5001/api/v0/add", {
    method: 'post',
    body: formData
    });
    if (response.status === 200) {
        return response.json().then((json) => {return Promise.resolve(json.Hash)})
    }
    return Promise.reject();
}

export { ipfsAdd }
  