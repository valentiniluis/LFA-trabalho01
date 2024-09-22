function validarComandos(comandos, comandosValidos) {
    for (let comando of comandos) {
        if (!comandosValidos.includes(comando)) {
            return false;
        }
    }
    return true;
}

module.exports = { validarComandos };