var utils = (function() { 
  var _dataCache = {};

  var _getDataCache = function(dataRequest){
    return  _dataCache[dataRequest] || false;
  };

  var _setDataCache = function(key, value){
    _dataCache[key] = value;
  };

  var _arrayToObject = function(arrayContent, pk){
    var objectContent = {};
    arrayContent.forEach(function(content){
      objectContent[content[pk]] = content;
    });
    return objectContent;
  };

  var _fillCombo = function (idJQuery, value, description, arrayContent, avoidAutoSelect, avoidSelect, arrayJQueryData, selectTxt) {
    var selectText = selectTxt || "Seleccione";
    var htmlOption = "";
    var deshabilita = true;
    if(arrayContent){
      if(arrayContent.length != 1 || avoidAutoSelect){
        if(!avoidSelect)
          htmlOption+= '<option value="0" disabled>' +  selectText + '</option>';
        deshabilita = false;
      }

      for (var i = arrayContent.length - 1; i >= 0; i--) {
        htmlOption += '<option value="' + arrayContent[i][value] + '"';
        if(arrayJQueryData && arrayJQueryData.length){
          for (var j = 0; j < arrayJQueryData.length; j++) {
            htmlOption += ' data-' + arrayJQueryData[j].toLowerCase() + '="' + arrayContent[i][arrayJQueryData[j]] + '"';
          }
        }
        htmlOption += '>' + arrayContent[i][description];
        htmlOption += '</option>';
      }

      $(idJQuery).html(htmlOption);
      if(deshabilita){
        $(idJQuery).attr("disabled", "true");
        $(idJQuery).val($(idJQuery + " option")[0].value);
      }else{
        $(idJQuery).removeAttr("disabled");
        $(idJQuery).val($(idJQuery + " option")[0].value);
      }
    }
  };

  var _validateForm = function(){
    var validate = true;
    $(".red-text-validate").removeClass("red-text-validate");
    $(".red-border-validate").removeClass("red-border-validate");
    $.each($(".check-no-empty"), function(i, campo) {
      var $campoAct = $(campo);
      if($campoAct.val().length<1 && $campoAct.hasClass("mandatory")){
        validate = false;
        $($campoAct.parent().children()[0]).addClass("red-text-validate");
        $($campoAct.parent().children()[3]).addClass("red-text-validate");
      } 
    });
    $.each($(".check-select"), function(i, campo) {
      var $campoAct = $(campo);
      if((!$campoAct.val() || $campoAct.val() === "" || $campoAct.val() == "0") && $campoAct.hasClass("mandatory") ){
        validate = false;
        $($campoAct.parent().children()[0]).addClass("red-text-validate");
        $campoAct.parent().children().find(".select2-selection").addClass("red-border-validate").children().addClass("red-text-validate");
      } 
    });
    $.each($(".check-numeric"), function(i, campo) {
      var $campoAct = $(campo);
      if(isNaN($campoAct.val()) || ((!$campoAct.val() || $campoAct.val() === "") && $campoAct.hasClass("mandatory") && $campoAct.val()%1 === 0)){
        validate = false;
        $($campoAct.parent().children()[0]).addClass("red-text-validate");
        $($campoAct.parent().children()[3]).addClass("red-text-validate");
      } 
    });
    $.each($(".check-decimal"), function(i, campo) {
      var $campoAct = $(campo);
      if(isNaN($campoAct.val()) || ((!$campoAct.val() || $campoAct.val() === "") && $campoAct.hasClass("mandatory"))){
        validate = false;
        $($campoAct.parent().children()[0]).addClass("red-text-validate");
        $($campoAct.parent().children()[3]).addClass("red-text-validate");
      } 
    });
    $.each($(".check-alfanumeric"), function(i, campo) {
      var $campoAct = $(campo);
      var alfanumRegex = /^[a-z 0-9áéíóúÁÉÍÓÚ]+$/i;
      if((!alfanumRegex.test($campoAct.val()) && $campoAct.val()) || ((!$campoAct.val() || $campoAct.val() === "") && $campoAct.hasClass("mandatory"))){
        validate = false;
        $($campoAct.parent().children()[0]).addClass("red-text-validate");
        $($campoAct.parent().children()[3]).addClass("red-text-validate");
      } 
    });
    $.each($(".check-date"), function(i, campo) {
      var $campoAct = $(campo);
      var textoInput = "";
      if($campoAct.val().split("/").length == 3){
        textoInput = $campoAct.val().split("/")[1] + "/" + $campoAct.val().split("/")[0] + "/" + $campoAct.val().split("/")[2];
      }
      if(!moment(textoInput).isValid() || ((!$campoAct.val() || $campoAct.val() === "") && $campoAct.hasClass("mandatory"))){
        validate = false;
        $($campoAct.parent().children()[0]).addClass("red-text-validate");
        $($campoAct.parent().children()[3]).addClass("red-text-validate");
      }
    });
    return validate;
  };

  var _validateDivForm = function(jQuerySelector){
    var validate = true;
    $(".red-text-validate").removeClass("red-text-validate");
    $(".red-border-validate").removeClass("red-border-validate");
    $.each($(jQuerySelector).find(".check-no-empty"), function(i, campo) {
      var $campoAct = $(campo);
      if($campoAct.val().length<1 && $campoAct.hasClass("mandatory")){
        validate = false;
        $($campoAct.parent().children()[0]).addClass("red-text-validate");
        $($campoAct.parent().children()[3]).addClass("red-text-validate");
      } 
    });
    $.each($(jQuerySelector).find(".check-select"), function(i, campo) {
      var $campoAct = $(campo);
      if((!$campoAct.val() || $campoAct.val() === "" || $campoAct.val() == "0") && $campoAct.hasClass("mandatory") ){
        validate = false;
        $($campoAct.parent().children()[0]).addClass("red-text-validate");
        $campoAct.parent().children().find(".select2-selection").addClass("red-border-validate").children().addClass("red-text-validate");
      } 
    });
    $.each($(jQuerySelector).find(".check-numeric"), function(i, campo) {
      var $campoAct = $(campo);
      if(isNaN($campoAct.val()) || ((!$campoAct.val() || $campoAct.val() === "") && $campoAct.hasClass("mandatory") && $campoAct.val()%1 === 0)){
        validate = false;
        $($campoAct.parent().children()[0]).addClass("red-text-validate");
        $($campoAct.parent().children()[3]).addClass("red-text-validate");
      } 
    });
    $.each($(jQuerySelector).find(".check-decimal"), function(i, campo) {
      var $campoAct = $(campo);
      if(isNaN($campoAct.val()) || ((!$campoAct.val() || $campoAct.val() === "") && $campoAct.hasClass("mandatory"))){
        validate = false;
        $($campoAct.parent().children()[0]).addClass("red-text-validate");
        $($campoAct.parent().children()[3]).addClass("red-text-validate");
      } 
    });
    $.each($(jQuerySelector).find(".check-alfanumeric"), function(i, campo) {
      var $campoAct = $(campo);
      var alfanumRegex = /^[a-z 0-9áéíóúÁÉÍÓÚ]+$/i;
      if((!alfanumRegex.test($campoAct.val()) && $campoAct.val()) || ((!$campoAct.val() || $campoAct.val() === "") && $campoAct.hasClass("mandatory"))){
        validate = false;
        $($campoAct.parent().children()[0]).addClass("red-text-validate");
        $($campoAct.parent().children()[3]).addClass("red-text-validate");
      } 
    });
    $.each($(jQuerySelector).find(".check-date"), function(i, campo) {
      var $campoAct = $(campo);
      var textoInput = "";
      if($campoAct.val().split("/").length == 3){
        textoInput = $campoAct.val().split("/")[1] + "/" + $campoAct.val().split("/")[0] + "/" + $campoAct.val().split("/")[2];
      }
      if(!moment(textoInput).isValid() || ((!$campoAct.val() || $campoAct.val() === "") && $campoAct.hasClass("mandatory"))){
        validate = false;
        $($campoAct.parent().children()[0]).addClass("red-text-validate");
        $($campoAct.parent().children()[3]).addClass("red-text-validate");
      }
    });
    return validate;
  };

  var _getFormData = function(divCont, search){
    var divDatos = divCont && search ? divCont.find("[class*=save]") : divCont ? divCont : $("[class*=save]");
    var returnedData = {};
    $.each(divDatos, function(i, campo) {
      var $campo = $(campo);
      if($campo.hasClass("save-input")) {
        returnedData[$campo.attr("name")] = $campo.val();
      }else if($campo.hasClass("save-textarea")) {
        returnedData[$campo.attr("name")] = $campo.val();
      }else if($campo.hasClass("save-select")) {
        returnedData[$campo.attr("name")] = $campo.val();
      }
    });
    return returnedData;
  };

  var _getDataFromServer = function(phpFile, data){
    var d = $.Deferred();
    $.post("../back/" + phpFile + ".php", data, function(response) {
        d.resolve(JSON.parse(response));
    });
    return d.promise();
  };

  var _nowToSql = function(){
    var date = new Date();
    date =  date.getUTCFullYear() + '-' +
            ('00' + (date.getUTCMonth() + 1)).slice(-2) + '-' +
            ('00' + date.getUTCDate()).slice(-2) + ' ' +
            ('00' + date.getUTCHours()).slice(-2) + ':' +
            ('00' + date.getUTCMinutes()).slice(-2) + ':' +
            ('00' + date.getUTCSeconds()).slice(-2); 
    return date;
  };

  var _exportarCsv = function(data, nombreArchivo){
    var exportCsv = [];
    exportCsv = data;
    if(exportCsv && exportCsv.length>0){
      function convertArrayOfObjectsToCSV(args) {  
        var result, ctr, keys, columnDelimiter, lineDelimiter, data;

        data = args.data || null;
        if (data === null || !data.length) {
            return null;
        }

        columnDelimiter = args.columnDelimiter || ';';
        lineDelimiter = args.lineDelimiter || '\n';

        keys = Object.keys(data[0]);

        result = '';
        result += keys.join(columnDelimiter);
        result += lineDelimiter;

        data.forEach(function(item) {
            ctr = 0;
            keys.forEach(function(key) {
                if (ctr > 0) result += columnDelimiter;

                result += item[key];
                ctr++;
            });
            result += lineDelimiter;
        });

        return result;
      }
      function downloadCSV(args) {  
          var data, filename, link;
          var csv = convertArrayOfObjectsToCSV({
              data: exportCsv
          });
          if (csv === null) return;
  
          filename = args.filename || 'export.csv';
  
          if (!csv.match(/^data:text\/csv/i)) {
              csv = 'data:text/csv;charset=utf-8,' + csv;
          }
          data = encodeURI(csv);
  
          link = document.createElement('a');
          link.setAttribute('href', data);
          link.setAttribute('download', filename);
          link.click();
      }
      downloadCSV({ filename: nombreArchivo + ".csv" });
    }else{
      alert("No hay datos que mostrar");
    }
  };


  return{ 
    fillCombo : _fillCombo,
    validateForm : _validateForm,
    validateDivForm : _validateDivForm,
    getFormData : _getFormData,
    getDataFromServer : _getDataFromServer,
    nowToSql : _nowToSql,
    getDataCache : _getDataCache,
    setDataCache : _setDataCache,
    arrayToObject : _arrayToObject,
    exportarCsv : _exportarCsv
  };

  
}());