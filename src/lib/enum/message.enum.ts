export enum message {
  EMAIL_ALREADY_IN_USE = 'Este email está sendo usado por outra pessoa',
  USER_REGISTERED = 'Usuario Registrado com sucesso',
  VERIFY_EMAIL = 'Por favor verique o seu email',
  EMAIL_VERIFIED = 'Usuario com email verificado',
  PASSWORD_UPDATED = 'Senha atualizada com sucesso',
  ERROR_GENERIC = 'Houve um erro inesperável',
  NOT_FOUND_USER = 'Usuario não encontrado',
  UID_ALREADY_IN_USE = 'Este uid está sendo usado por outra pessoa',
  PROVIDERS_USER_IS_INVALID = 'O provedor é invalido',
  USER_UPDATED = 'Usuario Atualizado com sucesso',
  DELETED_SUCCESSFULLY = 'Execução deletado com sucesso',
  SUCCESSFULLY_FETCHED_USER_DATA = 'Successfully fetched user data',
  ERROR_FETCHING_USER_DATA = 'Error fetching user data',
  SUCCESSFULLY_CREATED_NEW_USER = 'Successfully created new user',
  ERROR_CREATING_NEW_USER = 'Error creating new user',
  SUCCESSFULLY_UPDATED_USER = 'Successfully updated user',
  ERROR_UPDATING_USER = 'Error updating user',
  SUCCESSFULLY_DELETED_USER = 'Successfully deleted user',
  ERROR_DELETING_USER = 'Error deleting user',
  TOKEN_INVALID = 'An invalid token was provided',
  TOKEN_IS_NULL = 'Você não passou nenhum token',
  NOT_BEARER = "Token não possui a palavra chave 'Bearer ' no inicio do token ",
  SMALL_TOKEN = 'O token é muito curto',
  TOKEN_MISSING_SPECIAL_CHARACTER = 'Toke esta faltando caracter especial',
  VALID_TOKEN = 'Toke esta valido',
  UID_VALID = 'uid validado',
  UID_INVALID = 'uid invalido',
  EMAIL_INVALID = 'email invalido',
  USER_FOUND = 'usuario encontrado',
  TOKEN_REVOKE_WITH_SUCCESS = 'The Firebase ID token has been revoked.',
  UID_INVALID_CONFLICT_TOKEN_DESCRIPTION = 'uid do token e uid informados não são iguais: -> verifica se o token passado pelo usuario é valido, se for, compara o uid do token com o do uid passado pelo paramentro',
  EMAIL_INVALID_CONFLICT_TOKEN_DESCRIPTION = 'email do token e email informados não são iguais: -> verifica se o token passado pelo usuario é valido, se for, compara o email do token com o do email passado pelo paramentro',
  PAGE_ALREADY_IN_USE = 'Nome da pagina já em uso por outro usuario',
  SUCCESSFULLY_CREATED = 'Criado com sucesso',
  SUCCESSFULLY_FOUND = 'Encontrado com sucesso',
  NOT_FOUND = 'Não encontrado',
  SUCCESSFULLY_UPDATED = 'Atualizado com sucesso',
  ALREADY_IN_USE = 'em uso',
  NO_REGISTRY = 'Sem registro',
  DATA_CONFLICT = 'houve um conflito de dados',
  SEND_WITH_SUCCESS = 'Send with success',
  BAD_REQUEST = 'Bad Request',
  QUERY_FAILED = 'Falha no processamento da expressão',
  TIMESTAMP_FAILED = 'Falha no processamento da expressão',
}
