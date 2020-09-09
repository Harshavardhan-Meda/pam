template {
  source               = "env/prod-env.tpl"
  destination          = ".env"
  error_on_missing_key = true
}

template {
  source               = "env/cypress.env.prod.tpl"
  destination          = "cypress.env.json"
  error_on_missing_key = true
}

