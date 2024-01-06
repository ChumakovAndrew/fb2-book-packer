import mammoth from 'mammoth'
import * as cheerio from 'cheerio';
const docxParser = async (documentPath) => {

    const options = {
        includeComments: true, // Включить комментарии
      };
      
    return await mammoth.convertToHtml({ path: documentPath }, options)
        .then(async result => {

            const elements = cheerio.load(result.value);

            let resultObject = []
            let sectionCounter = 0;

            for (const element of elements('*')) {
                const { name, next } = element;

                if(name != 'h1' && next?.name == 'h1'){
                    sectionCounter = sectionCounter + 1
                }

                if(name == 'p' || name == 'h1') {
                    if(name == "h1"){
                        resultObject.push(
                            {
                                section:{
                                    title: {
                                        p: elements(element).text()
                                    },
                                    text: []
                                }
                            }
                        ) 
                    } 
                    else if ( name == 'p' && next?.name == 'h1') {
                        const {section} = resultObject[sectionCounter - 1]
                        section.text.push({[name]: elements(element).text()}) 
                    } 
                    else {
                        const {section} = resultObject[sectionCounter]
                        section.text.push({[name]: elements(element).text()})
                    }
                }
            }

            return resultObject
            
        })
        .catch(error => {
          console.error(error);
        });
}

export {docxParser}