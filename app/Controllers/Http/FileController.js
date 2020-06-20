'use strict'

const File = use('App/Models/File')
const Helpers = use('Helpers')

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with files
 */
class FileController {
  async show({ params, response }) {
    const file = await File.findOrFail(params.id)

    return response.download(Helpers.tmpPath(`uploads/${file.file}`))
  }
  /**
   * Create/save a new file.
   * POST files
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request, response }) {
    try {
      if (!request.file('file')) return

      const upload = request.file('file', { size: '10mb' })

      const fileName = `${(Math.random() * (999999 - 100000) + 100000).toFixed(0)}-${Date.now()}.${upload.subtype}`

      await upload.move(Helpers.tmpPath('uploads'), {
        name: fileName
      })

      if (!upload.moved()) throw upload.error()

      const size = `${(upload.size / 1024 / 1024).toFixed(1)}mb`

      const file = await File.create({
        file: fileName,
        name: upload.clientName,
        type: upload.type,
        subtype: upload.subtype,
        size
      })

      return file
    } catch (err) {
      return response
        .status(err.status)
        .send([{ field: 'file', message: 'File upload error' }])
    }
  }


}

module.exports = FileController
