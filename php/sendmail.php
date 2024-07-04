<?php

// Função para sanitizar dados
function sanitize($data) {
  return htmlspecialchars(stripslashes(trim($data)));
}

// Extrair e sanitizar dados do formulário
$nome = sanitize($_POST['nome']);
$email = filter_var($_POST['email'], FILTER_SANITIZE_EMAIL);
$telefone = sanitize($_POST['telefone']);
$assunto = sanitize($_POST['assunto']);
$mensagem = sanitize($_POST['mensagem']);
$tipoServico = sanitize($_POST['tipo_servico']);
$documentos = $_FILES['documentos'];

// Validar e-mail
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
  die("E-mail inválido.");
}

// Configurar o e-mail de destino
$emailDestino = "alceno@pwdesigner.com.br";

// Criar o corpo da mensagem
$corpoMensagem = "**Nome:** $nome\n";
$corpoMensagem .= "**E-mail:** $email\n";
$corpoMensagem .= "**Telefone:** $telefone\n";
$corpoMensagem .= "**Assunto:** $assunto\n";
$corpoMensagem .= "**Mensagem:** $mensagem\n";
$corpoMensagem .= "**Tipo de Serviço:** $tipoServico\n";

// Configurar o cabeçalho do e-mail
$cabecalho = "From: $email\r\n";
$cabecalho .= "Reply-To: $email\r\n";
$cabecalho .= "MIME-Version: 1.0\r\n";
$cabecalho .= "Content-Type: text/plain; charset=UTF-8\r\n";

// Enviar o e-mail
if (mail($emailDestino, $assunto, $corpoMensagem, $cabecalho)) {
  echo "E-mail enviado com sucesso!";
} else {
  echo "Falha ao enviar o e-mail.";
}

// Lidar com os documentos enviados (opcional)
// ... (código para processar os arquivos enviados) ...

?>
