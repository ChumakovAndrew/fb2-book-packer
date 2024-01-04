import mammoth from 'mammoth'
import * as cheerio from 'cheerio';
const docxParser = async () => {

    const documentPath = "document.docx"

    const options = {
        includeComments: true, // Включить комментарии
      };
      
    return await mammoth.convertToHtml({ path: documentPath }, options)
        .then(async result => {

            let resultObject = [];
            let sectionCounter = 0;
            const chee = cheerio.load(result.value);

            chee('*').each((index, element) => {
                const {name, next} = element

                if(name != 'h1' && next?.name == 'h1'){
                    sectionCounter = sectionCounter + 1
                }

                if(name == 'p' || name == 'h1') {
                    if(name == "h1"){
                        resultObject.push( {
                            section:{
                                title: {
                                    p: chee(element).text()
                                },
                                text: []
                            }
                        } 
                    ) 
                        
                    } else if ( name == 'p' && next?.name == 'h1') {
                        const {section} = resultObject[sectionCounter - 1]
                        section.text.push({[name]: chee(element).text()}) 
                    } else {
                        const {section} = resultObject[sectionCounter]
                        section.text.push({[name]: chee(element).text()})
                    }
                }
                
            });

            return resultObject
            
        })
        .catch(error => {
          console.error(error);
        });
}

export {docxParser}
