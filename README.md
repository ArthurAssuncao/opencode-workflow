# Tray OpenCode Workflow

O Tray OpenCode Workflow é um conjunto de ferramentas frontend que agiliza a criação de layouts.

**Ferramentas configuradas:**
* CSS
  * SASS
  * LESS
  * STYLUS
* JS
  * Modularização de arquivos
  * Uglify
* BrowserSync
* Image minification

## Instalação
Pré-requisitos: NodeJS, NPM e Ruby 2.3.8.

Recomendamos utilizar *NVM* para NodeJS e NPM e *RVM* para Ruby. Sinta-se à vontade para instalá-los como você preferir.

### Instalação NodeJS e NPM com NVM
Para instalar e configurar o NVM e NodeJS faça como mostra na página do [NVM](https://github.com/nvm-sh/nvm#installing-and-updating):
1. `Seguir o processo de instalação em https://github.com/nvm-sh/nvm#installing-and-updating`
2. `nvm install v10.22.0`
3. `nvm use v10.22.0`


### Instalação Ruby 2.3.8 com RVM
Para instalar e configurar o RVM e Ruby faça como mostra na página do [RVM](https://rvm.io/rvm/install).
1. `Seguir a instalação em https://rvm.io/`
2. `rvm install ruby-2.3.8`
3. `rvm use ruby-2.3.8`

### Instalação do Tray Opencode Workflow
1. `git clone https://github.com/tray-tecnologia/opencode-workflow.git`
2. `cd opencode-workflow`
3. `npm install` ou `yarn install`

## Configuração/Uso

Configure a loja que você vai trabalhar:

1. `mkdir opencode.commercesuite.com.br`
2. `cd opencode.commercesuite.com.br`
3. `opencode configure API_KEY PASSWORD THEME_ID` (veja a Obs: logo abaixo)
4. `opencode download`

**Obs:** API_KEY e PASSWORD são chaves individuais que o desenvolvedor deve solicitar ao lojista.<br>
Essas chaves que estão na documentação são da loja de teste: https://opencode.commercesuite.com.br.<br>
Se quiser poderá utilizar essa loja com as seguintes credenciais:<br>
`opencode configure 20a699301d454509691f3ea02c1cba4b ea0727075e1639a42fd966a2f6e67abc 1`

Após baixar todos os arquivos, volte para a pasta que contém o gulpfile.js e rode esse comando:

`gulp --folder opencode.commercesuite.com.br`

Pronto, comece a editar seus arquivos e você verá o `gulp` e o `opencode` trabalhando por você!

Caso queira o template do tema padrão atualizado, utilize o https://github.com/tray-tecnologia/theme-template

## Estrutura de pastas

Para que o `gulp` funcione corretamente, precisará existir essa estrutura de pastas:

    opencode-workflow/
        opencode.commercesuite.com.br/
            css/
            js/
            img/
            layouts/
            pages/
            config.yml
        lojademo.commercesuite.com.br/
            css/
            js/
            img/
            layouts/
            pages/
            config.yml
        outraloja.com.br/
            css/
            js/
            img/
            layouts/
            pages/
            config.yml
        gulpfile.js
