import React, {useState, useCallback, useEffect} from 'react'
import { FaGithub, FaPlus, FaSpinner, FaBars, FaTrash } from 'react-icons/fa'
import {Link} from'react-router-dom'

import {Container, Form,SubmitButton, List, DeleteButton} from './styles'

import api from '../../services/api'

export default function Home() {

    const [newRepo, setNewRepo ] = useState('');
    const [repositorios, setRepositorios ] = useState([]);
    const [ loading, setLoading] = useState(false)
    const [alerta , setAlerta] = useState(null)


    /// buscar informação

    useEffect(()=>{
        const respoStorege = localStorage.getItem('repos')
        if(respoStorege){
            setRepositorios(JSON.parse(respoStorege))
        }
    } ,[])

    /// Savlvar alteraçoes

    useEffect(()=>{
        localStorage.setItem('repos', JSON.stringify(repositorios))
    }, [repositorios])





   function handleinputChange(e){
        setNewRepo(e.target.value)
        setAlerta(null)
    }

   const  handleSubmit = useCallback((e) =>{
        e.preventDefault();
    async function submit(){
        setAlerta(null)
        // animação ativa
        setLoading(true)
        try {
            if(newRepo === ''){
                throw new Error('Você precisa inidicar um repositorio!')
            }

            const hasRepo = repositorios.find(repo => repo.name === newRepo)

            if(hasRepo){
                throw new Error('Repositorio duplicado')
                
            }
          
            const response = await api.get(`repos/${newRepo}`)

            const data ={
                name : response.data.full_name
            }
            setRepositorios([...repositorios, data])
            setNewRepo('')
        } catch (error) {
            setAlerta(true)
        }finally{
            setLoading(false)
        }
        
    }
    submit();
   }, [repositorios, newRepo])
     

   const  handleDelete = useCallback((name) =>{
        const find = repositorios.filter( r => r.name !== name)
        setRepositorios(find)
   },[repositorios])
    

    return (
       <Container>
           
           <h1>
               <FaGithub size={25}/>
               Meus Repositorios
           </h1>

            <Form onSubmit={handleSubmit} error={alerta}>
          
                <input type="text" value={newRepo} placeholder="Adicionar um Repositorios"
                    onChange={handleinputChange}
                />


                <SubmitButton loading={loading ? 1 : 0}>
                    
                    {loading ? (
                        // true
                        <FaSpinner color="#FFF" size={14}/>
                    ): (
                        //false
                        <FaPlus size={14} color="#fff"/>
                    )}
                    
                </SubmitButton>

            </Form>
            <List>
                {repositorios.map(repo =>(
                    <li key={repo.name}>
                        <span>
                        <DeleteButton onClick={()=> handleDelete(repo.name) }>
                            <FaTrash size={14}/>
                        </DeleteButton>
                            {repo.name}</span>
                        <Link to={`/repositorio/${encodeURIComponent(repo.name)}`}>
                            <FaBars size={20} />
                        </Link>
                    </li>
                ))}
            </List>

       </Container>
    )
}
