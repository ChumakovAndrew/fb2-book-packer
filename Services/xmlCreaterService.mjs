import { create } from "xmlbuilder"

const xmlCrearerService = async (description, content, img) => {

console.log(content)

const {
  name,
  author,
  annotation,
  lang,
} = description

  const obj = {
    FictionBook: {
      description: {
        'title-info': {
          author: {
            'first-name': author,
            // 'last-name': 'Клир',
          },
          coverpage: {
            image: {
              '@l:href': `#cover.jpg`, // Embed base64-encoded image in XML
            },
          },
          'book-title': name,
          annotation: {
            p: annotation,
          },
          lang
        },
        'document-info': {
          author: {
            nickname: '',
          },
        },
      },
      body:{},
      binary: {
        '@id': 'cover.jpg',
        '@content-type': 'image/jpeg',
        '#text': img, // Add the base64-encoded image data as text content
      },
    
    },
    
  };
  
  const doc = create(obj)

  console.log(content)

  await content.forEach((element, idSection) => {
    const { title, text } = element.section;

    const section = doc.root().ele('body').ele('section', { 'id': `${idSection}` });

    section.ele("title").ele("p", title.p);

    text.forEach((elem, idParagrafs) => {
      section.ele("p", { 'id': `${idParagrafs}` }).text(elem.p);
    });
  });

  const xml = doc.end({ prettyPrint: true });
  return xml
}

export {xmlCrearerService}
