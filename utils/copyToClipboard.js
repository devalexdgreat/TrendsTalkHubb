import toast, { Toaster } from "react-hot-toast";

function copyToClipboard(text) {
    if (typeof window !== 'undefined' && window.navigator.clipboard) {
      window.navigator.clipboard.writeText(text)
        .then(() => {
          toast.success('Copied to clipboard', {
            position: "top-center"
          })
        })
        .catch((error) => {
          toast.error(`Error copying text to clipboard: ${error}`, {
            position: "top-center"
          })
        });
    } else {
      toast.error('Clipboard API not supported', {
        position: "top-center"
      })
    }
  }
  
  export default copyToClipboard;
  