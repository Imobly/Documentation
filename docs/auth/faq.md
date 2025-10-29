# FAQ

Q: Como validar um token em outro serviço?

A: Os serviços consumidores só precisam da `SECRET_KEY` e do algoritmo (HS256). Use a mesma biblioteca (python-jose) ou qualquer biblioteca JWT compatível para decodificar e validar `exp` e `sub`.

Q: Posso usar refresh tokens?

A: Sim — a implementação atual usa apenas access tokens curtos; para uma implantação com refresh tokens, crie endpoints para emitir e revogar refresh tokens e considere armazená-los (por exemplo, Redis).
