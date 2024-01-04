import { create } from "xmlbuilder"

const xmlCrearerService = async (description, content) => {
  const obj = {
    FictionBook: {
      description: {
        'title-info': {
          author: {
            'first-name': description,
            'last-name': 'Клир',
          },
          date: {
            '@value': '2018-01-01',
            _: '2018',
          },
          coverpage: {
            image: {
              '@l:href': '#cover.jpg',
            },
          },
          'book-title': 'Атомные привычки. Как приобрести хорошие привычки и избавиться от плохих',
          annotation: {
            p: 'Может ли одна монетка сделать человека богатым? ...',
          },
          lang: 'ru'
        },
        'document-info': {
          author: {
            nickname: '',
          },
          'program-used': '2.6.6'
        },
      },
      body:{}
    },
    
  };
  
  const doc = create(obj)

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
