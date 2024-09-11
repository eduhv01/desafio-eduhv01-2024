class RecintosZoo {
    constructor() {
        this.recintos = [
            {numero: 1, bioma: ["savana"], tamanhoTotal: 10, animaisExistentes: ["macaco"], tamanhoDisponivel: 7},
            {numero: 2, bioma: ["floresta"], tamanhoTotal: 5, animaisExistentes: [], tamanhoDisponivel: 5},
            {numero: 3, bioma: ["savana", "rio"], tamanhoTotal: 7, animaisExistentes: ["gazela"], tamanhoDisponivel: 5},
            {numero: 4, bioma: ["rio"], tamanhoTotal: 8, animaisExistentes: [], tamanhoDisponivel: 8},
            {numero: 5, bioma: ["savana"], tamanhoTotal: 9, animaisExistentes: ["leao"], tamanhoDisponivel: 6},
        ];

        this.animals = [
            {especie: "leao", tamanho: 3, bioma: ["savana"], carnivoro: true},
            {especie: "leopardo", tamanho: 2, bioma: ["savana"], carnivoro: true},
            {especie: "crocodilo", tamanho: 3, bioma: ["rio"], carnivoro: true},
            {especie: "macaco", tamanho: 1, bioma: ["savana", "floresta"], carnivoro: false},
            {especie: "gazela", tamanho: 2, bioma: ["savana"], carnivoro: false},
            {especie: "hipopotamo", tamanho: 4, bioma: ["savana", "rio"], carnivoro: false},
        ];
    }

    validarAQ(animal, quantidade) {
        const animalEncontrado = this.animals.find(a => a.especie === animal.toLowerCase());

        if (!animalEncontrado) {
            return { erro: "Animal inválido" };
        }

        if (quantidade <= 0) {
            return { erro: "Quantidade inválida" };
        }

        return animalEncontrado; 
    }

    procurarInfos(animalInfos, quantidade) {
        const recintosViaveis = [];
        const espacoNecessario = animalInfos.tamanho * quantidade;
    
        for (const recinto of this.recintos) {
            const espacoDisponivelAtual = recinto.tamanhoDisponivel;
            const temBiomaAdequado = animalInfos.bioma.some(b => recinto.bioma.includes(b));
    
            if (!temBiomaAdequado) continue;
    
            const temEspacoParaAnimaisExistentes = recinto.animaisExistentes.every(existente => {
                const animalExistenteInfos = this.animals.find(a => a.especie === existente);
                
                if (!animalExistenteInfos) return false; 
                return animalInfos.carnivoro === animalExistenteInfos.carnivoro;
            });
    
            if (!temEspacoParaAnimaisExistentes) continue;
    
            if (animalInfos.carnivoro) {
                const temCarnivorosDeEspeciesDiferentes = recinto.animaisExistentes.some(existente => {
                    const animalExistenteInfos = this.animals.find(a => a.especie === existente);
                    if (!animalExistenteInfos) return false; 
                    return animalExistenteInfos.carnivoro && animalExistenteInfos.especie !== animalInfos.especie;
                });
    
                if (temCarnivorosDeEspeciesDiferentes) continue;
            }
    
            if (animalInfos.especie === "macaco" && quantidade === 1 && !recinto.animaisExistentes.length) continue;
    
            if (animalInfos.especie === "hipopotamo" && quantidade === 1 && (!recinto.bioma.includes("savana") || !recinto.bioma.includes("rio"))) {
                continue;
            }
    
            const espaçoExtra = (recinto.animaisExistentes.length > 0 && !recinto.animaisExistentes.includes(animalInfos.especie)) ? 1 : 0;
            const espacoLivreComExtra = espacoDisponivelAtual - espaçoExtra;
            const espacoLivreFinal = espacoLivreComExtra - espacoNecessario;
    
            if (espacoLivreFinal >= 0) {
                recintosViaveis.push({
                    nome: `Recinto ${recinto.numero}`,
                    espacoLivre: espacoLivreFinal,
                    espacoTotal: recinto.tamanhoTotal
                });
            }
        }
    
        return recintosViaveis;
    }
    
 analisaRecintos(animal, quantidade) {
        const animalInfos = this.validarAQ(animal, quantidade);

        if (animalInfos.erro) { 
            return animalInfos;
        }

        const recintosViaveis = this.procurarInfos(animalInfos, quantidade);

        if (!recintosViaveis.length) { 
            return { 
                erro: "Não há recinto viável" 
            };
        }

        return {
            recintosViaveis: recintosViaveis.map(recinto => 
                `${recinto.nome} (espaço livre: ${recinto.espacoLivre} total: ${recinto.espacoTotal})`)
        };
    }
}

export { RecintosZoo };
