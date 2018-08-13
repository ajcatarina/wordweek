'use strict'

const Word = use('App/Models/Word')
const { validate } = use('Validator')

class WordController {
    async index ({ view }) {
        const words = await Word.all()
        return view.render('main', { words: words.toJSON() })
    }

    async store ({ request, response, session }) {
        const validation = await validate(request.all(), {
            word: 'required|min:1|max:255'
        })

        if (validation.fails()) {
            session.withErrors(validation.messages())
                .flashAll()

            return response.redirect('back')
        }

        const word = new Word()
        word.word = request.input('word')
        await word.save()

        session.flash({ notification: 'Word added!' })

        return response.redirect('back')
    }

    async destroy ({ params, session, response }) {
        const word = await Word.find(params.id)
        await word.delete()
      
        session.flash({ notification: 'Word deleted!' })
      
        return response.redirect('back')
    }
}

module.exports = WordController

