import mammoth from 'mammoth'
import { printError } from './logService.mjs';
const docxParser = async (documentPath) => {

    const options = {
            styleMap: [
                "p[style-name='Heading 1'] => section:fresh > title > p:fresh",
                "p => section > p:fresh"
            ]
      };
      
    return await mammoth.convertToHtml({ path: documentPath }, options)
        .then(async result => {
            return result.value            
        })
        .catch(error => {
            printError(error);
            return
        });
}

export {docxParser}
