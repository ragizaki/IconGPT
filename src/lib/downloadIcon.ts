export default async function downloadIcon(url: string, filename: string) {
  try {
    const res = await fetch(url, {
      headers: new Headers({
        Origin: location.origin,
      }),
      mode: "cors",
    });

    const blob = await res.blob();
    const blobURL = window.URL.createObjectURL(blob);
    download(blobURL, filename);
  } catch (error) {}
}

function download(blobURL: string, filename: string) {
  const a = document.createElement("a");
  a.download = filename;
  a.href = blobURL;
  document.body.appendChild(a);
  a.click();
  a.remove();
}
