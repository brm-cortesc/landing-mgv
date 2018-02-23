"use strict"; 
class Cube {
   download(fileDownload, fileName) {

    var a = document.createElement('a');
    a.href = fileDownload;
    a.target = '_parent';
    // Use a.download if available, it prevents plugins from opening.
    if ('download' in a) {
    a.download = fileName;
    }
    // Add a to the doc for click to work.
    (document.body || document.documentElement).appendChild(a);
    if (a.click) {
    a.click(); // The click method is supported by most browsers.
    } else {
    $(a).click(); // Backup using jquery
    }
    // Delete the temporary link.
    a.parentNode.removeChild(a);
    return true;
  }; /* end download() */
}
export default Cube;