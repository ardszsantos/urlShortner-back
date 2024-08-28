function shortenUrl() {
  const urlInput = document.getElementById("urlInput")
  const resultDiv = document.getElementById("resultDiv")

  const shortenedUrl = "teste"

  if (urlInput) {
    resultDiv.innerHTML = `Shortened URL: <a href="${shortenedUrl}" target="_blank">${shortenedUrl}<a/>`;
  } else {
    resultDiv.textContent = 'Please enter a valid url.'
  }
}