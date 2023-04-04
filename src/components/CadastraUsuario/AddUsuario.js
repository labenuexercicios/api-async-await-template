import axios from "axios";
import React, { useState } from "react";
import { InputCadastro, ContainerCadastro } from './style'

function AddUsuario(props) {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");


  //PRATICA GUIADA 3
  // criar função post novo usuario com async await

  const postNovoUsuario = async ()=>{

    const url=`https://us-central1-labenu-apis.cloudfunctions.net/labenusers/users`
    const body= {
          name: nome,
          email
        }
    const config = {headers:{Authorization:"humberto-oliveira-turmaBarbosaB"}}

    try{

      await axios.post(url, body, config)
      alert("usuario criado com sucesso")
      props.getUsuarios();
        setEmail("");
        setNome("");

    }catch(erro){
      console.log(erro);
    }
  }


  //código que veio na aula

  // const postNovoUsuario = () => {
  //   const body = {
  //     name: nome,
  //     email
  //   };
  //   axios
  //     .post(
  //       `https://us-central1-labenu-apis.cloudfunctions.net/labenusers/users`,
  //       body,
  //       {
  //         headers: {
  //           Authorization: "humberto-oliveira-turmaBarbosaB"
  //         }
  //       }
  //     )
  //     .then(() => {
  //       alert("usuario criado!");
  //       props.getUsuarios();
  //       setEmail("");
  //       setNome("");
  //     })
  //     .catch((err) => {
  //       console.log("erro add", err.response);
  //     });
  // };

  return (
    <ContainerCadastro>
      <h3>Cadastrar novo usuario</h3>
      <InputCadastro
        placeholder={"Nome"}
        value={nome}
        onChange={(e) => {
          setNome(e.target.value);
        }}
      />
      <InputCadastro
        type="email"
        placeholder={"E-mail"}
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
        }}
      />
      <button onClick={postNovoUsuario}>Enviar</button>
    </ContainerCadastro>
  );
}

export default AddUsuario;