const { generateKeyPairSync } = require('crypto')
const fs = require('fs')
const path = require('path')

// Private helpers
const generate = () => {
    return generateKeyPairSync('rsa', {
        modulusLength: 2048,
        publicKeyEncoding: {
            type: 'spki',
            format: 'pem'
        },
        privateKeyEncoding: {
            type: 'pkcs8',
            format: 'pem'
        }
    })
}

// Exports
module.exports = {
    _keyPub: '',
    _keyPrv: '',
    init() {
        // Generate certificates folder if not exists
        const certsPath = path.join(__dirname, 'certificates')
        const certificatesExist = fs.existsSync(certsPath)
        if (!certificatesExist) {
            console.log('[CERTS] Certificates folder not found, creating...')
            // Create certificates folder
            fs.mkdirSync(certsPath)
        }

        // Generate certificates if they don't exist
        if (!fs.existsSync(path.join(certsPath, 'public.pem')) || !fs.existsSync(path.join(certsPath, 'private.pem'))) {
            console.log('[CERTS] Generating Certificates...')
            const { publicKey, privateKey } = generate()
            this._keyPub = publicKey
            this._keyPrv = privateKey
            fs.writeFileSync(path.join(certsPath, 'public.pem'), publicKey)
            fs.writeFileSync(path.join(certsPath, 'private.pem'), privateKey)
            this._keyPrv = privateKey
            this._keyPub = publicKey
            return
        }

        // Read variables from certsPath
        this._keyPub = fs.readFileSync(path.join(certsPath, 'public.pem'), 'utf8')
        this._keyPrv = fs.readFileSync(path.join(certsPath, 'private.pem'), 'utf8')
    },
    get publicKey() {
        if (!this._keyPub) throw new Error('[CERT] public key not found!')
        return this._keyPub
    },
    get privateKey() {
        if (!this._keyPrv) throw new Error('[CERT] public key not found!')
        return this._keyPrv
    }
}
