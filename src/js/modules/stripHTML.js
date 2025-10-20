const stripHTML = (html) => {
  if (!html || typeof html !== "string") {
    return "";
  }
  const tmp = document.createElement("template");
  const spacedHtml = html
    .replace(/<\/?(div|p|br|h[1-6]|li|tr|td|th)[^>]*>/gi, " $& ")
    .replace(/<\/a>/gi, " </a>");

  tmp.innerHTML = spacedHtml.trim();
  return tmp.content.textContent.replace(/\s+/g, " ").trim();
};

export default stripHTML;
