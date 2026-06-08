function doPost(e) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var dataHora = new Date();

  var nome = e.parameter.nome || "";
  var whatsapp = e.parameter.whatsapp || "";
  var cnh = e.parameter.cnh || "";
  var idade = e.parameter.idade || "";
  var ficha = e.parameter.ficha || "";
  var cidade = e.parameter.cidade || "";
  var garagem = e.parameter.garagem || "";
  var finalidade = e.parameter.finalidade || "";
  var consciencia = e.parameter.consciencia || "";
  var pagamento = e.parameter.pagamento || "";
  var justificativa = e.parameter.justificativa || "";

  var event_id = e.parameter.event_id || "";
  var fbp = e.parameter._fbp || "";
  var fbc = e.parameter._fbc || "";
  var user_agent = e.parameter.user_agent || "";

  sheet.appendRow([
    dataHora, nome, whatsapp, cnh, idade, ficha, cidade,
    garagem, finalidade, consciencia, pagamento, justificativa
  ]);

  try {
    var pixel_id = "1330774552435981";
    var access_token = "EAAQvCX3x8g8BRk066Q6BF1uXINACJcE26wZCO9YZBf8OMUsDpx7imhB2PT7MAAF1ZAST75mRk81LyjzcNEeNTeBZArOjjsVuxbuTJyXtstP37aLtVVKh3yYZCPiiN7CWazYDz44R5mp1VMLecZAE2ZAWVnoMCbUVb0e8nrEx6EaiNX2KTQ371xxYTeMKxtxoAZDZD";

    function hashSHA256(text) {
      if (!text) return "";
      var signature = Utilities.computeDigest(Utilities.DigestAlgorithm.SHA_256, text.trim().toLowerCase(), Utilities.Charset.UTF_8);
      var hexString = '';
      for (var i = 0; i < signature.length; i++) {
        var byte = signature[i];
        if (byte < 0) byte += 256;
        var hexStr = byte.toString(16);
        if (hexStr.length == 1) hexStr = '0' + hexStr;
        hexString += hexStr;
      }
      return hexString;
    }

    var cleanPhone = whatsapp.replace(/\D/g, '');
    if (cleanPhone && !cleanPhone.startsWith('55')) {
      cleanPhone = '55' + cleanPhone;
    }

    var primeiroNome = (nome.split(' ')[0] || "").toLowerCase();

    var user_data = {
      "ph": hashSHA256(cleanPhone),
      "fn": hashSHA256(primeiroNome)
    };

    if (user_agent) user_data.client_user_agent = user_agent;

    if (fbp) user_data.fbp = fbp;
    if (fbc) user_data.fbc = fbc;

    var payload = {
      "data": [
        {
          "event_name": "Lead",
          "event_time": Math.floor(dataHora.getTime() / 1000),
          "action_source": "website",
          "event_id": event_id,
          "user_data": user_data,
          "custom_data": {
            "currency": "BRL",
            "value": 1.00
          }
        }
      ]
    };

    var options = {
      "method": "post",
      "contentType": "application/json",
      "payload": JSON.stringify(payload),
      "muteHttpExceptions": true
    };

    var url = "https://graph.facebook.com/v22.0/" + pixel_id + "/events?access_token=" + access_token;
    var response = UrlFetchApp.fetch(url, options);

    Logger.log("CAPI response: " + response.getContentText());

  } catch (erro) {
    Logger.log("Erro no envio do CAPI: " + erro);
  }

  return ContentService.createTextOutput("Sucesso");
}
