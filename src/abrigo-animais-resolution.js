class AbrigoAnimais {

  encontraPessoas(brinquedosPessoa1, brinquedosPessoa2, ordemAnimais) {
    const animais = {
      Rex: ['RATO', 'BOLA'],
      Mimi: ['BOLA', 'LASER'],
      Fofo: ['BOLA', 'RATO', 'LASER'],
      Zero: ['RATO', 'BOLA'],
      Bola: ['CAIXA', 'NOVELO'],
      Bebe: ['LASER', 'RATO', 'BOLA'],
      Loco: ['SKATE', 'RATO'],
    };

    const validarArray = (arr, tipo) => {
      if (!arr) return { erro: `${tipo} inválido` };
      const itens = arr.split(',').map(i => i.trim().toUpperCase());
      if (itens.length !== new Set(itens).size) return { erro: `${tipo} inválido` };
      return itens;
    };

    const podeAdotar = (brinquedosPessoa, brinquedosAnimal) => {
      let index = 0;
      for (const b of brinquedosPessoa) {
        if (b === brinquedosAnimal[index]) index++;
        if (index === brinquedosAnimal.length) break;
      }
      return index === brinquedosAnimal.length;
    };

    const pessoa1 = validarArray(brinquedosPessoa1, 'Brinquedo');
    if (pessoa1.erro) return pessoa1;

    const pessoa2 = validarArray(brinquedosPessoa2, 'Brinquedo');
    if (pessoa2.erro) return pessoa2;

    const ordem = validarArray(ordemAnimais, 'Animal');
    if (ordem.erro) return ordem;

    let cont1 = 0, cont2 = 0;
    const resultado = [];

    for (const nome of ordem) {
      const brinquedosAnimal = animais[nome];
      if (!brinquedosAnimal) return { erro: 'Animal inválido' };

      let adota1 = podeAdotar(pessoa1, brinquedosAnimal);
      let adota2 = podeAdotar(pessoa2, brinquedosAnimal);

      if (['Mimi', 'Fofo', 'Zero'].includes(nome)) {
        if (adota1 && adota2) resultado.push(`${nome} - abrigo`);
        else if (adota1 && cont1 < 3) { resultado.push(`${nome} - pessoa 1`); cont1++; }
        else if (adota2 && cont2 < 3) { resultado.push(`${nome} - pessoa 2`); cont2++; }
        else resultado.push(`${nome} - abrigo`);
      } else if (nome === 'Loco') {
        resultado.push(`${nome} - pessoa 1`); cont1++;
      } else {
        if (adota1 && cont1 < 3) { resultado.push(`${nome} - pessoa 1`); cont1++; }
        else if (adota2 && cont2 < 3) { resultado.push(`${nome} - pessoa 2`); cont2++; }
        else resultado.push(`${nome} - abrigo`);
      }
    }

    return { lista: resultado.sort((a, b) => a.localeCompare(b)) };
  }
}

export { AbrigoAnimais as AbrigoAnimais };


import { AbrigoAnimais } from './src/abrigo-animais-resolution.js';

const resultado = new AbrigoAnimais().encontraPessoas(
  'RATO,BOLA',
  'RATO,NOVELO',
  'Rex,Fofo'
);

console.log(resultado);


