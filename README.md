<img src='https://ik.imagekit.io/b5di91ako/rickyandmorty.png?updatedAt=1680559146876' alt='banner'/>

<br>
<br>

### Tópicos

- [Descrição do Projeto:](#descrição-do-projeto)
- [Funcionalidades:](#funcionalidades)
- [Acesso ao Projeto:](#acesso-ao-projeto)
- [Tecnologias utilizadas:](#tecnologias-utilizadas)

# RD95 Logistic

### Descrição do Projeto:

**Um site que oferece serviços logísticos. Com CRUD completo de 4 entidades.**

### Funcionalidades:

- CRUD completo de 4 entidads (veículos, clientes, condutores e deslocamentos);
- No momento não implementei autenticação mas, há um botão para ativar e desativar o modo usuário;
- Tabela para apresentação das entidades, com filtro e função de copiar dados;
- Uso da feature "server actions" do Next13, permitindo a "atualização" da página quando alguma ação é feita no banco de dados.

### Páginas:

- Para cada entidade (clientes, por exemplo) há uma página mostrando uma tabela com todos cadastrados, incluindo paginação e filtro.
- Para cada documento (cada cliente, por exemplo) há uma página com todas suas informações e opções para editar e excluir.

### Acesso ao Projeto:

[🔗 RD95 Logistic](https://rd95-rick-morty-api.vercel.app/)

### Como executar

- Clone o projeto: `git clone https://github.com/RafaDev95/rickyAndMortyApi-nextjs-layout.git`

- Após clonado `yarn` ou `npm install` para baixar as dependências necessárias;
- E por fim, use o comando `yarn dev` para iniciar o projeto.

### Tecnologias utilizadas:

- [NextJS](https://nextjs.org/)
- [Material Ui](https://mui.com/)
- [Zustand](https://zustand-demo.pmnd.rs/)
- [React Hot Toast](https://react-hot-toast.com/)
- [MUI Icons](https://mui.com/material-ui/material-icons/)
- [TypeScript](https://www.typescriptlang.org/)
- [ReactHookForm](https://react-hook-form.com/)
- [Zod](https://zod.dev/)

### Considerações

- Poderia usar Axios ou qualquer outra ferramenta fazer requisições, mas como o Next13 deixou super fácil e intuitivo de administrar o cache usando o fetch api, dei preferência.
