import React, { useEffect, useState } from "react";
import axios from "axios";
import { EditarUsuario } from "./components/EditarUsuario/Editar";
import AddUsuario from "./components/CadastraUsuario/AddUsuario";
import { Header } from "./components/Header/Header";
import {
  ContainerPrincipal,
  ContainerBarra,
  ButtonCadastro,
  BoxCadastro,
} from "./Appstyle";
import { AiFillCodeSandboxCircle } from "react-icons/ai";


// AULA 15 INTEGRAÇÃO API 2 - ASYNC E AWAIT
//      PRATICA GUIADA 1
// No exercicio, usaremos a api Labenusers (https://documenter.getpostman.com/view/7549981/SzfCT5G2#intro)
// vamos usar os ednpoint : receber lista de usuarios; pesquisar usuarios especifico; editar usuario, criar usuario
// usaremos o template da aula anterior para  aprender a adicionar o async e await e  o try catch
//1.1 ir ate a requisição que pega todos os usuarios e para garantir um desempenho melhor da aplicação faremos algumas trocas
//1.2 abra a api e  verifique onde esta a requsição que pesquisa pro aluno por nome ou email exatos. ela não esta feita, vamos faze-la. nalaise sua aplicação react e verifique o melhor lugar para 

//      PRATICA GUIADA 2
//2.1 fazer uma pesquisa de ususarios

//      PRATICA GUIADA 3
// editar ususarios com asyn await

function App() {
  const [usuarios, setUsuarios] = useState([]);
  const [pageFlow, setPageFlow] = useState(1);
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [pesquisa, setPesquisa] = useState({ nome: "", email: "" });

  console.log("pesquisa", pesquisa)

  useEffect(() => {
    getUsuarios();
  }, []);

  //1.1 codigo de requisição usando async await
  //primeira coisa apos o = vem o async, indicando que é uma função assincrona e depois a função não nomeada
  // depois uma variavel chamada response que guardara a nossa requisição e logo depois o await(espere o axios) seguido pro axios, que ira fazer a requisição;
  // tudo isso dentro do try
  const getUsuarios = async ()=>{
    
    try{

      const resposta = await axios.get("https://us-central1-labenu-apis.cloudfunctions.net/labenusers/users", {headers:{Authorization:"humberto-oliveira-turmaBarbosaB"}})
      //log pra ver se deu certo
      // console.log (resposta)
      setUsuarios(resposta.data)

    }catch(erro){
      
    }
    
  }


  // código abaixo é o que veio da aula fazendo a requisição usando then e catch

  // const getUsuarios = () => {
  //   axios
  //     .get(
  //       "https://us-central1-labenu-apis.cloudfunctions.net/labenusers/users",
  //       {
  //         headers: {
  //           Authorization: "humberto-oliveira-turmaBarbosaB",
  //         },
  //       }
  //     )
  //     .then((res) => {
  //       setUsuarios(res.data);
  //     })
  //     .catch((error) => {
  //       console.log(error.response);
  //     });
  // };

  //PRATICA GUIADA 2
  //2.1 existem diois inputs controlodados para caputra o nome e email da pesquisa, e uma função chamada enviarDados (2.1) chamada no onclick do botao pesquisar que seta o nome e email no estado pesquisa ao clicar no botao (ou seja, o estado pesquisar que antes era um objeto com a chave nome e email vazias, agora tem como valor o que o usuario inseriu)
  //recebemos o estado como parametro na função pesquisa usuario, e passamos suas chaves(lembre-se, pesquisa agora é um objeto com duas chaves, nome e email, coom valores do ususario) e colocamos como query na url da requisição
  // como o que esta renderizando os dados dos usuarios na tela é o estado usuarios,  no fim da requisição eu seto usuarios com a reposta.data, ou seja, a pesquisa é de um unico usuario, eu faco a requisição ele de devolve o usuario e eu seto ele em usuarios para renderizar na tela, usando um useeffect que recebe a função dentro com o paramentro pesquisa e com o estado pesquisa no array de dependencias;
  // tentando explicar o fluxo:
  // A- tenho dois inputs com nome e email para pesquisa mais o botao pesquisa e tenho dois estados nome, e email
  // B- tenho um estado chamado pesquisa que começa como um objeto com as chaves nome e email, ambas string vazias
  // C - controlo esses inputs para que o valor digitado pelo usuario  seja setado nos estados nome e email
  // D- crio uma função chamada enviarDados que sera chamada com onclick no botao de pesquisa: essa função tem uma const chamada nova pesquisa que é um objeto com os parametros nome e email que receberão como valor, respectivamente, os estados de mesmo nome (capturo os inputs nos estados, ao clicar passo os estados para as chaves dessa variavel dentro da função) e depois seto o estado pesquisa com essa nova variavel, ou seja, capturo o nome e email digitado, ao clicar na função passo estados ja com os valores do usuario para a variavel dentro da função e seto a pesquisa com esta nova variavel
  // D- antes, o estado pesquisa tinha nome e email vazio, apos a invocação da função enviardados no clicar do botao, eu seto a pesquisa com os estados com valores capturados
  //E- faço a função assincrona pesquisaUsuarios e passo a pesquisa como parametro fazendo a requisição  e dou um setUsuarios com a respota
  //F-um useeffect invocando a função para sua execução, passando pesquisa no parametro e o estaod pesquisa no array de dependencias
  //OBS: O CÓDIGO FOI REFATORADO
  // ao io inves de estados para nome, e email dos inputs de pesquisa, eu coloquei eles direto no estado pesquisa. os inputs recebem o pesquisa.nome e pesquisa.email, faco uma função de setar esses inputs fazendo uma copia do estado com o spread operator, e cada chave tendo como valor o e.target.value, e ao inves de chamar o enviar dados no botão, ja chamo direto a pesquisa ususario e passo como parametro a pesquisa. com isso não precias do use effect tbm
  const pesquisaUsuario = async(pesquisa) => {
    console.log("pesquisa dentro da funcao",pesquisa)
    try{
      const resposta = await axios.get(`https://us-central1-labenu-apis.cloudfunctions.net/labenusers/users/search?name=${pesquisa.nome}&email=${pesquisa.email}`, {headers:{Authorization:"humberto-oliveira-turmaBarbosaB"}})
      
      console.log(resposta)
      setUsuarios(resposta.data)
     
      
    }catch(erro){
      console.log(erro)
    }
   
  };

  // useEffect(() => {
  //   pesquisaUsuario(pesquisa);
  // }, [pesquisa]);

  

  // const onChangeName = (e) => {
  //   setNome(e.target.value);
  // };

  // const onChangeEmail = (e) => {
  //   setEmail(e.target.value);
  // };

  //2.1
  // const enviarDados = () => {
  //   const novaPesquisa = {
  //     nome,
  //     email,
  //   };
  //   setPesquisa(novaPesquisa);
   
  //   setNome("")
  //   setEmail("")
    
  // };

  const onClickVoltar = () => {
    getUsuarios();
    setPageFlow(1)
  }

 


  return (
    <div>
      <Header />
      <ContainerPrincipal>
        {pageFlow === 2 ? (
          <BoxCadastro>
            <button onClick={() => setPageFlow(1)}>Voltar</button>
            <AddUsuario getUsuarios={getUsuarios} />
          </BoxCadastro>
        ) : (
          <>
            <ContainerBarra>
              <div>
                <input
                  value={pesquisa.nome}
                  onChange={(e)=>setPesquisa({...pesquisa, nome:e.target.value})}
                  placeholder="Nome"
                />
                <input
                  value={pesquisa.email}
                  onChange={(e)=>setPesquisa({...pesquisa, email:e.target.value})}
                  placeholder="Email"
                />
                <button type="submit" onClick={()=>pesquisaUsuario(pesquisa)}>
                  Pesquisar
                </button>
              </div>
              {pageFlow === 3 ? (
                <ButtonCadastro onClick={onClickVoltar}>Voltar</ButtonCadastro>
              ) : (
                <ButtonCadastro onClick={() => setPageFlow(2)}>
                  Cadastrar
                </ButtonCadastro>
              )}
              
            </ContainerBarra>
            {usuarios.map((usuario) => {
              return (
                <EditarUsuario
                  key={usuario.id}
                  id={usuario.id}
                  getUsuarios={getUsuarios}
                  setPageFlow={setPageFlow}
                  pageFlow={pageFlow}
                />
              );
            })}
          </>
        )}
        
      </ContainerPrincipal>
    </div>
  );
}

export default App;
