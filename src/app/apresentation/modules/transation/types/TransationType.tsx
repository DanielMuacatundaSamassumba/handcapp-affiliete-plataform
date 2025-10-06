export enum transationCodeEnum {
    UNDER_ANALYSIS = '7',
    PENDING = '8',
    PROCESSED = '9',
    FAILED = '10',
    CANCELED = '11',
    SUCCESS = '12',
  }
  
 export  function handleTranstionEnum(code: transationCodeEnum) {
    switch (code) {
      case transationCodeEnum.UNDER_ANALYSIS:
        return "Em análise";
  
      case transationCodeEnum.PENDING:
        return "Pendente";
  
      case transationCodeEnum.PROCESSED:
        return "Processado";
  
      case transationCodeEnum.FAILED:
        return "Falhou";
  
      case transationCodeEnum.CANCELED:
        return "Cancelado";
  
      case transationCodeEnum.SUCCESS:
        return "Sucesso";
  
      default:
        return "Status desconhecido";
    }
  }
  

  