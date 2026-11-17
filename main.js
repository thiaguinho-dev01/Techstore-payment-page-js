/**
 * Retorna a taxa de desconto de acordo com a forma de pagamento.
 * @param {string} formaPagamento - "pix", "boleto", "cartao-vista" ou "cartao-parcelado".
 * @returns {number} Taxa de desconto em decimal (ex.: 0.15 para 15%).
 */
function calcularDescontoPagamento(formaPagamento) {
  switch (formaPagamento) {
    case "pix":
      return 0.15;
    case "boleto":
      return 0.10;
    case "cartao-vista":
      return 0.05;
    case "cartao-parcelado":
      return 0;
    default:
      return 0;
  }
}

/**
 * Retorna o valor do frete de acordo com o tipo de entrega.
 * @param {string} tipoEntrega - "retirada", "padrao", "expressa" ou "super-expressa".
 * @returns {number} Valor do frete em reais.
 */
function calcularValorEntrega(tipoEntrega) {
  switch (tipoEntrega) {
    case "retirada":
      return 0;
    case "padrao":
      return 12;
    case "expressa":
      return 25;
    case "super-expressa":
      return 45;
    default:
      return 0;
  }
}

/**
 * Formata um número como moeda brasileira (R$).
 * @param {number} valor - Valor numérico a ser formatado.
 * @returns {string} Valor formatado, por exemplo "R$ 1.234,56".
 */
function formatarMoeda(valor) {
  return valor.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

const form = document.getElementById("form-orcamento");
const painelResultado = document.getElementById("resultado");

form.addEventListener("submit", function (event) {
  event.preventDefault();

  const valorProduto = parseFloat(document.getElementById("valor-produto").value);
  const formaPagamento = document.getElementById("forma-pagamento").value;
  const tipoEntrega = document.getElementById("tipo-entrega").value;

  if (isNaN(valorProduto) || valorProduto < 0) {
    return;
  }

  const taxa = calcularDescontoPagamento(formaPagamento);
  const desconto = valorProduto * taxa;
  const frete = calcularValorEntrega(tipoEntrega);
  const total = valorProduto - desconto + frete;

  document.getElementById("res-produto").textContent = formatarMoeda(valorProduto);
  document.getElementById("res-desconto").textContent = "- " + formatarMoeda(desconto);
  document.getElementById("res-frete").textContent = formatarMoeda(frete);
  document.getElementById("res-total").textContent = formatarMoeda(total);

  painelResultado.classList.remove("hidden");
});
