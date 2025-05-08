function calcularRendimento() {
  const valor = parseFloat(document.getElementById("valor").value);
  const porcentagem = parseFloat(document.getElementById("porcentagem").value);
  const cdiAnual = parseFloat(document.getElementById("cdi").value);
  const prazoDias = parseInt(document.getElementById("prazo").value);

  if (isNaN(valor) || isNaN(porcentagem) || isNaN(cdiAnual) || isNaN(prazoDias)) {
    alert("Por favor, preencha todos os campos corretamente.");
    return;
  }

  const cdiUsado = (cdiAnual / 100) * (porcentagem / 100);
  const cdiDiario = Math.pow(1 + cdiUsado, 1 / 252) - 1;

  const montanteBruto = valor * Math.pow(1 + cdiDiario, prazoDias);
  const rendimentoBruto = montanteBruto - valor;

  let aliquotaIR = 0.225;
  if (prazoDias > 180 && prazoDias <= 360) aliquotaIR = 0.20;
  else if (prazoDias > 360 && prazoDias <= 720) aliquotaIR = 0.175;
  else if (prazoDias > 720) aliquotaIR = 0.15;

  const imposto = rendimentoBruto * aliquotaIR;
  const rendimentoLiquido = rendimentoBruto - imposto;
  const montanteLiquido = valor + rendimentoLiquido;

  document.getElementById("resultado").style.display = "block";
  document.getElementById("resultado").innerHTML = `
    <h3>Resultado:</h3>
    <p><strong>Rendimento Bruto:</strong> R$ ${rendimentoBruto.toFixed(2)}</p>
    <p><strong>IR (${(aliquotaIR * 100).toFixed(1)}%):</strong> R$ ${imposto.toFixed(2)}</p>
    <p><strong>Rendimento Líquido:</strong> R$ ${rendimentoLiquido.toFixed(2)}</p>
    <p><strong>Montante Final:</strong> R$ ${montanteLiquido.toFixed(2)}</p>
  `;
}

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('./service-worker.js')
    .then(() => console.log('Service Worker registrado com sucesso.'))
    .catch(error => console.log('Falha ao registrar o Service Worker:', error));
}
