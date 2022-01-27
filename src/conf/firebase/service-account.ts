export const serviceAccount:any = {
  type: process.env.firebas_server_type,
  project_id: process.env.firebase_server_project_id,
  private_key_id: process.env.firebase_server_private_key_id,
  private_key: process.env.firebase_server_private_key,
  client_email: process.env.firebase_server_client_email,
  client_id: process.env.firebase_server_client_id,
  auth_uri: process.env.firebase_server_auth_uri,
  token_uri: process.env.firebase_server_token_uri,
  auth_provider_x509_cert_url: process.env.firebase_server_auth_provider_x509_cert_url,
  client_x509_cert_url: process.env.firebase_server_client_x509_cert_url,
}