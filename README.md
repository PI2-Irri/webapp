# WebApp

Este é um dos serviços que compõe toda a arquitetura do sistema Irri. O WebApp é responsável por fornecer uma interface web para o usuário interagir com o sistema. É onde poderá cadastrar novas centrais, criar zonas e agendar as irrigações, além de fornecer funcionalidade para ligar/desligar o sistema quando achar necessário. Por fim, a aplicação disponibilizará todas as informações obtidas dos módulos medidores e dos atuadores respectivos de suas controladoras.

# Arquitetura do sistema

O webapp utiliza de requisições http para solicitar informações à API da Central de Controle.

![image](https://user-images.githubusercontent.com/26297247/67123529-ed62bb00-f1c6-11e9-856a-9a8aef5c0c0f.png)

# Subindo ambiente de desenvolvimento

Utilizamos de uma imagem Docker para padronizar todo o ambiente de desenvolvimento, para que não seja obrigatório a utilização de algum sistema em específico.

Caso seja a primeira vez que esteja trabalhando no projeto, clone o reposítório em algum diretório local do seu computador e entre na pasta onde estará o projeto:

```
git clone https://github.com/PI2-Irri/webapp.git
cd webapp
```

Agora basta rodar o seguinte comando no terminal para começar a desenvolver e ver as modificações já na página web:

```
sudo docker-compose up
```

O comando anterior irá subir todo o ambiente de desenvolvimento. Agora basta utilizar o editor de texto a seu gosto e editar ou acrescentar o código que deseja, que tudo será atualizado sem precisar gerar outra build da aplicação.

# Como Contribuir

Ficaremos muito felizes de receber e incorporar suas contribuições. Tem algumas informações adicionais sobre o estilo do código e a documentação.

Em geral o processo é bem simples:

- Crie uma issue descrevendo uma feature  que você queira trabalhar (ou olhe as issues com o label `help-wanted` e `good-first-issue`)
- Escreva seu código, testes e documentação
- Abra um pull request descrevendo as suas alterações propostas
- Seu pull request será revisado por um dos mantenedores, que pode levantar questões para você sobre eventuais mudanças necessárias ou questões.

Leia o [Guia de Contribuição](CONTRIBUTING.md) para melhores informações.


# Licença

Toda aplicação é desenvolvido sob a licença [GPL3](https://github.com/pi2-irri/webapp/blob/master/LICENSE)
