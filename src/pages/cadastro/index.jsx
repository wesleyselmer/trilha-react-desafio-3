import { MdEmail, MdLock, MdAccountBox } from 'react-icons/md'
import { Button } from '../../components/Button';
import { Header } from '../../components/Header';
import { Input } from '../../components/Input';
import { api } from '../../services/api';

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { Container, Title, Column, TitleLogin, SubtitleLogin, LinkText, SpanError, Row, Wrapper } from './styles';

const schema = yup
    .object({
        name: yup.string().required('Nome é obrigatório'),
        email: yup.string().email('Email não é válido').required('E-mail é obrigatório'),
        senha: yup.string().min(3, 'No mínimo 3 caracteres').required('Senha é obrigatória')
    })
    .required()

const Cadastro = () => {

    const { control, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
    });

    const onSubmit = async (formData) => {
        try{
            const {data} = await api.post(`/users`, {
                name: formData.name,
                email: formData.email,
                senha: formData.senha
            });
            
            if (data){
                console.log(data)
                alert("Usuário criado com sucesso!")
            } else {
                alert('Erro na criação do usuário.')
            }
        }catch(e){
            alert(`Ocorreu um erro durante a transação. Erro: ${e}`);
        }
    };

    return (<>
        <Header />
        <Container>
            <Column>
                <Title>A plataforma para você aprender com experts, dominar as principais tecnologias
                 e entrar mais rápido nas empresas mais desejadas.</Title>
            </Column>
            <Column>
                <Wrapper>
                <TitleLogin>Comece agora grátis</TitleLogin>
                <SubtitleLogin>Crie sua conta e make the change._</SubtitleLogin>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Input placeholder="Nome completo" leftIcon={<MdAccountBox />} name="name" control={control} />
                    {errors.name && <SpanError>Nome é obrigatório</SpanError>}
                    <Input placeholder="E-mail" leftIcon={<MdEmail />} name="email"  control={control} />
                    {errors.email && <SpanError>E-mail é obrigatório</SpanError>}
                    <Input type="password" placeholder="Senha" leftIcon={<MdLock />}  name="senha" control={control} />
                    {errors.senha && <SpanError>Senha é obrigatório</SpanError>}
                    <Button title="Criar minha conta" variant="secondary" type="submit"/>
                </form>
                <Row>
                    <LinkText href="/login">Já possui sua conta? Faça o login</LinkText>
                </Row>
                </Wrapper>
            </Column>
        </Container>
    </>)
}

export { Cadastro }