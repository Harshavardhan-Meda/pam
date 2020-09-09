template {
  source               = "env/dev-env.tpl"
  destination          = ".env"
  error_on_missing_key = true
}

template {
  source               = "env/cypress.env.dev.tpl"
  destination          = "cypress.env.json"
  error_on_missing_key = true
}

