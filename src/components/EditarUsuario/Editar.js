import React, { useEffect, useState } from "react";
import axios from "axios";
import { ButtonNome, DeleteButton, ButtonContainer, MainContainer, InputContainer, SaveButton, CloseButton } from './style'
import {AiOutlineConsoleSql, AiOutlineDelete} from 'react-icons/ai'
import { Input } from "../../Appstyle";

export const EditarUsuario = (props) => {
  const [usuario, setUsuario] = useState({});
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [editar, setEditar] = useState(false)

  

  //requisição de pegar dados de usuario com then catch que veio no template, abaixo dela a com async await

  // const getDadosUsuario = () => {
  //   axios
  //     .get(
  //       `https://us-central1-labenu-apis.cloudfunctions.net/labenusers/users/${props.id}`,
  //       {
  //         headers: {
  //           Authorization: "humberto-oliveira-turmaBarbosaB",
  //         },
  //       }
  //     )
  //     .then((res) => {
  //       setUsuario(res.data);
  //       setEmail(res.data.email);
  //       setName(res.data.name);
  //     })
  //     .catch((err) => {
  //       console.log(err.response);
  //     });
  // };


    const getDadosUsuario = async ()=>{
      try{
        const resposta = await axios.get(`https://us-central1-labenu-apis.cloudfunctions.net/labenusers/users/${props.id}
        `, {headers:{Authorization:"humberto-oliveira-turmaBarbosaB"}})

        console.log("resposta", resposta)
        setUsuario(resposta.data)
        setEmail(resposta.data.email)
        setName(resposta.name)

      }catch(erro){

      }

    }

  useEffect(() => {
    getDadosUsuario();
  }, []);


  //PRATICA GUAIDA 3
  // codigo editausuario com async await

  const editaUsuario = async ()=>{
    const url = `https://us-central1-labenu-apis.cloudfunctions.net/labenusers/users/${usuario.id}`
    const config = {headers:{Authorization:"humberto-oliveira-turmaBarbosaB"}
    }
    const body = {

      name,
      email

    }
    try{ 
      // como não to fazendo nada com a respota, poderia deletar e deixar só o await...
      const resposta = await axios.put(url, body, config)
      alert("uuario editado")
      getDadosUsuario()
      setEditar(!editar)
    }catch(erro){
    console.log(erro);
    }


  }


  //Código que veio na aula

  // const editaUsuario = () => {
  //   const body = {
  //       name,
  //       email
  //     };
  //     axios
  //       .put(
  //         `https://us-central1-labenu-apis.cloudfunctions.net/labenusers/users/${usuario.id}`,
  //         body,
  //         {
  //           headers: {
  //             Authorization: "humberto-oliveira-turmaBarbosaB"
  //           }
  //         }
  //       )
  //       .then(() => {
  //         getDadosUsuario();
  //         setEditar(!editar)
  //       });
  // }


  //PRATICA GUIADA 3
  // função deletar ususario com async await

  const deletarUsuario = async () =>{

    const url = `https://us-central1-labenu-apis.cloudfunctions.net/labenusers/users/${usuario.id}`
    const config = {headers:{Authorization:"humberto-oliveira-turmaBarbosaB"}}

    try{

      await axios.delete(url, config)
      alert("usuario deletado")
      //cahma de novo o get ususarios para atualizar a lista
      props.getUsuarios()
    }catch(erro){
      console.log(erro)
    }
  }

  //código que veio na aula

  // const deletarUsuario = () => {
  //   axios
  //     .delete(
  //       `https://us-central1-labenu-apis.cloudfunctions.net/labenusers/users/${usuario.id}`,
  //       {
  //         headers: {
  //           Authorization: "humberto-oliveira-turmaBarbosaB"
  //         }
  //       }
  //     )
  //     .then(() => {
  //       alert("usuario removido");
  //       // chama de novo o get usuarios pra atualizar a lista
  //       props.getUsuarios();
  //     })
  //     .catch((err) => {
  //       console.log(err.response);
  //     });
  // };


  return (
    <MainContainer>

      {editar ? (
        <InputContainer>
        <Input placeholder="Nome" value={name} onChange={(e) => setName(e.target.value)} />
        <Input placeholder="E-mail" value={email} onChange={(e) => setEmail(e.target.value)} />
        <SaveButton onClick={editaUsuario}>Salvar</SaveButton>
        <CloseButton onClick={() => setEditar(!editar)}>Fechar</CloseButton>
        </InputContainer>
      ) : (
        <ButtonContainer>
          <ButtonNome onClick={() => setEditar(!editar)}>{usuario.name}</ButtonNome>
          <DeleteButton onClick={deletarUsuario}><AiOutlineDelete/></DeleteButton>
        </ButtonContainer>
      )}
    </MainContainer>
  );
};
