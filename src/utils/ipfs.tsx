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
    return Promise.reject(`[${response.status}] ${response.statusText}`);
}

async function ipfsFetch(hash: string) {
    return fetch(`https://ipfs.io/ipfs/${hash}`)
    .then((resp: any) => resp.text())
}

export { ipfsAdd, ipfsFetch }
  