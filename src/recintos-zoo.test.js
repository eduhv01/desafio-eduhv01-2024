import { RecintosZoo } from "./recintos-zoo.js";

describe('Recintos do Zoologico', () => {

    test('Deve rejeitar animal inválido', () => {
            const resultado = new RecintosZoo().analisaRecintos('UNICORNIO', 1);
            expect(resultado.erro).toBe("Animal inválido");
            expect(resultado.recintosViaveis).toBeFalsy();
        });

    test('Deve rejeitar quantidade inválida', () => {
            const resultado = new RecintosZoo().analisaRecintos('MACACO', 0);
            expect(resultado.erro).toBe("Quantidade inválida");
            expect(resultado.recintosViaveis).toBeFalsy();
    });

    test('Não deve encontrar recintos para 10 macacos', () => {
            const resultado = new RecintosZoo().analisaRecintos('MACACO', 10);
            expect(resultado.erro).toBe("Não há recinto viável");
            expect(resultado.recintosViaveis).toBeFalsy();
        });

    test('Deve encontrar recinto para 1 crocodilo', () => {
        const resultado = new RecintosZoo().analisaRecintos('CROCODILO', 1);
        expect(resultado.erro).toBeFalsy();
        expect(resultado.recintosViaveis[0]).toBe('Recinto 4 (espaço livre: 5 total: 8)');
        expect(resultado.recintosViaveis.length).toBe(1);
    });

    test('Deve encontrar recintos para 2 macacos', () => {

        const resultado = new RecintosZoo().analisaRecintos('MACACO', 2);
        expect(resultado.erro).toBeFalsy();
        expect(resultado.recintosViaveis[0]).toBe('Recinto 1 (espaço livre: 5 total: 10)');
        expect(resultado.recintosViaveis[1]).toBe('Recinto 2 (espaço livre: 3 total: 5)');
        expect(resultado.recintosViaveis[2]).toBe('Recinto 3 (espaço livre: 2 total: 7)');
        expect(resultado.recintosViaveis.length).toBe(3);
    });
    
    test('Não deve alocar 1 macaco em um recinto vazio', () => {
        const resultado = new RecintosZoo().analisaRecintos('macaco', 1);
        expect(resultado.erro).toBeFalsy();
        expect(resultado.recintosViaveis.some(r => r.includes('Recinto 2'))).toBeFalsy();
    });    

    test('Não deve alocar carnívoro com animais de espécie diferente', () => {
        const zoo = new RecintosZoo();
        const resultadoLeopardo = zoo.analisaRecintos('LEOPARDO', 1); 
    
        expect(resultadoLeopardo.erro).toBe("Não há recinto viável"); 
    });
    
    test('Não deve alocar hipopótamo em um recinto sem bioma de savana ou rio', () => {
        const zoo = new RecintosZoo();
        const resultado = zoo.analisaRecintos('hipopotamo', 1);

        expect(resultado.erro).toBeFalsy();
        expect(resultado.recintosViaveis.some(r => r.includes('Recinto 2'))).toBeFalsy();
    }); 

    test('Não deve separar lotes de animais nem trocar os animais já existentes nos recintos', () => {
        const resultado = new RecintosZoo().analisaRecintos('MACACO',12);
        expect(resultado.erro).toBe("Não há recinto viável");
        expect(resultado.recintosViaveis).toBeFalsy();
    });

    test('Deve considerar espaço extra ao alocar gazelas com outras espécies', () => {
        const zoo = new RecintosZoo();
        const resultado = zoo.analisaRecintos('gazela', 2);
        expect(resultado.erro).toBeFalsy();
        expect(resultado.recintosViaveis[0]).toBe('Recinto 1 (espaço livre: 2 total: 10)');
    });
})